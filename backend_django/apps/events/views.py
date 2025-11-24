from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from datetime import date
from .models import Event, EventRegistration
from .serializers import (
    EventSerializer, EventListSerializer, EventRegistrationSerializer
)


class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type', 'category', 'is_online', 'organizer']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['date', 'time', 'price', 'registered_count', 'created_at']
    ordering = ['date', 'time']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return EventListSerializer
        return EventSerializer
    
    def get_queryset(self):
        queryset = Event.objects.select_related('organizer').all()
        
        # Filter published events for non-staff users
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_published=True, is_cancelled=False)
        
        # Filter by date range if provided
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        
        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        if date_to:
            queryset = queryset.filter(date__lte=date_to)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events"""
        today = date.today()
        events = self.get_queryset().filter(date__gte=today)[:20]
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_events(self, request):
        """Get events organized by the current user"""
        events = self.get_queryset().filter(organizer=request.user)
        page = self.paginate_queryset(events)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def registered(self, request):
        """Get events the current user is registered for"""
        event_ids = EventRegistration.objects.filter(
            user=request.user,
            status='registered'
        ).values_list('event_id', flat=True)
        
        events = self.get_queryset().filter(id__in=event_ids)
        page = self.paginate_queryset(events)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def register(self, request, pk=None):
        """Register for an event"""
        event = self.get_object()
        
        # Check if already registered
        existing = EventRegistration.objects.filter(
            event=event,
            user=request.user
        ).first()
        
        if existing:
            if existing.status == 'registered':
                return Response(
                    {'error': 'You are already registered for this event'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Reactivate cancelled registration
            existing.status = 'registered'
            existing.save(update_fields=['status', 'updated_at'])
            event.registered_count += 1
            event.save(update_fields=['registered_count'])
            return Response(EventRegistrationSerializer(existing).data)
        
        # Check if event can accept registrations
        if not event.can_register():
            return Response(
                {'error': 'This event is full or cancelled'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create registration
        registration = EventRegistration.objects.create(
            event=event,
            user=request.user,
            payment_status='completed' if event.price == 0 else 'pending'
        )
        
        event.registered_count += 1
        event.save(update_fields=['registered_count'])
        
        return Response(
            EventRegistrationSerializer(registration).data,
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unregister(self, request, pk=None):
        """Unregister from an event"""
        event = self.get_object()
        
        try:
            registration = EventRegistration.objects.get(
                event=event,
                user=request.user,
                status='registered'
            )
            registration.status = 'cancelled'
            registration.save(update_fields=['status', 'updated_at'])
            
            event.registered_count = max(0, event.registered_count - 1)
            event.save(update_fields=['registered_count'])
            
            return Response({'message': 'Successfully unregistered from event'})
        except EventRegistration.DoesNotExist:
            return Response(
                {'error': 'You are not registered for this event'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['get'])
    def attendees(self, request, pk=None):
        """Get list of attendees for an event"""
        event = self.get_object()
        registrations = event.registrations.filter(status='registered').select_related('user')
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)


class EventRegistrationViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing event registrations"""
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['event', 'status', 'payment_status']
    ordering = ['-registered_at']
    
    def get_queryset(self):
        # Users can see their own registrations or registrations for events they organize
        user_event_ids = Event.objects.filter(organizer=self.request.user).values_list('id', flat=True)
        
        return EventRegistration.objects.filter(
            models.Q(user=self.request.user) |
            models.Q(event_id__in=user_event_ids)
        ).select_related('event', 'user')


# Import models at the end
from django.db import models
