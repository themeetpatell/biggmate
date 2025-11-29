from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Pitch, SavedPitch
from .serializers import PitchSerializer, PitchListSerializer, SavedPitchSerializer


class PitchViewSet(viewsets.ModelViewSet):
    queryset = Pitch.objects.select_related('author').all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['stage', 'author', 'is_public']
    search_fields = ['title', 'tagline', 'description', 'problem', 'solution']
    ordering_fields = ['created_at', 'views_count', 'saves_count']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PitchListSerializer
        return PitchSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # If not authenticated, only show public pitches
        if not self.request.user.is_authenticated:
            return queryset.filter(is_public=True)
        
        # For list action (home feed), exclude current user's pitches
        # Users should see other people's pitches, not their own
        if self.action == 'list':
            return queryset.filter(is_public=True).exclude(author=self.request.user)
        
        # For retrieve, my_pitches, and other actions, include user's own pitches
        return queryset.filter(
            Q(is_public=True) | Q(author=self.request.user)
        )
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_pitches(self, request):
        pitches = self.get_queryset().filter(author=request.user)
        page = self.paginate_queryset(pitches)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(pitches, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def save(self, request, pk=None):
        pitch = self.get_object()
        saved_pitch, created = SavedPitch.objects.get_or_create(
            user=request.user,
            pitch=pitch
        )
        if created:
            pitch.increment_saves()
            return Response(
                {'message': 'Pitch saved successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'message': 'Pitch already saved'},
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unsave(self, request, pk=None):
        pitch = self.get_object()
        deleted_count, _ = SavedPitch.objects.filter(
            user=request.user,
            pitch=pitch
        ).delete()
        if deleted_count > 0:
            pitch.saves_count = max(0, pitch.saves_count - 1)
            pitch.save(update_fields=['saves_count'])
            return Response(
                {'message': 'Pitch unsaved successfully'},
                status=status.HTTP_200_OK
            )
        return Response(
            {'message': 'Pitch was not saved'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def saved(self, request):
        saved_pitches = SavedPitch.objects.filter(
            user=request.user
        ).select_related('pitch', 'pitch__author')
        page = self.paginate_queryset(saved_pitches)
        if page is not None:
            serializer = SavedPitchSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = SavedPitchSerializer(saved_pitches, many=True, context={'request': request})
        return Response(serializer.data)
