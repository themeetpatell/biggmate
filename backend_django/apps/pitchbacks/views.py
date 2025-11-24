from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.utils import timezone
from .models import PitchBack
from .serializers import PitchBackSerializer, PitchBackListSerializer


class PitchBackViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'role', 'pitch']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PitchBackListSerializer
        return PitchBackSerializer
    
    def get_queryset(self):
        # Users can see pitchbacks they sent or received
        return PitchBack.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user)
        ).select_related('pitch', 'sender', 'receiver').order_by('-created_at')
    
    @action(detail=False, methods=['get'])
    def sent(self, request):
        """Get pitchbacks sent by the current user"""
        pitchbacks = self.get_queryset().filter(sender=request.user)
        page = self.paginate_queryset(pitchbacks)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(pitchbacks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def received(self, request):
        """Get pitchbacks received by the current user"""
        pitchbacks = self.get_queryset().filter(receiver=request.user)
        page = self.paginate_queryset(pitchbacks)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(pitchbacks, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        """Accept a pitchback (only by receiver)"""
        pitchback = self.get_object()
        
        if pitchback.receiver != request.user:
            return Response(
                {'error': 'Only the pitch author can accept pitchbacks'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if pitchback.status != 'pending':
            return Response(
                {'error': f'Cannot accept a pitchback with status: {pitchback.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pitchback.status = 'accepted'
        pitchback.responded_at = timezone.now()
        pitchback.save(update_fields=['status', 'responded_at', 'updated_at'])
        
        serializer = self.get_serializer(pitchback)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        """Decline a pitchback (only by receiver)"""
        pitchback = self.get_object()
        
        if pitchback.receiver != request.user:
            return Response(
                {'error': 'Only the pitch author can decline pitchbacks'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if pitchback.status != 'pending':
            return Response(
                {'error': f'Cannot decline a pitchback with status: {pitchback.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pitchback.status = 'declined'
        pitchback.responded_at = timezone.now()
        pitchback.save(update_fields=['status', 'responded_at', 'updated_at'])
        
        serializer = self.get_serializer(pitchback)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def withdraw(self, request, pk=None):
        """Withdraw a pitchback (only by sender)"""
        pitchback = self.get_object()
        
        if pitchback.sender != request.user:
            return Response(
                {'error': 'Only the sender can withdraw pitchbacks'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if pitchback.status != 'pending':
            return Response(
                {'error': f'Cannot withdraw a pitchback with status: {pitchback.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pitchback.status = 'withdrawn'
        pitchback.save(update_fields=['status', 'updated_at'])
        
        serializer = self.get_serializer(pitchback)
        return Response(serializer.data)
