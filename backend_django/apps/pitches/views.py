from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Pitch, SavedPitch, LikedPitch, PitchComment
from .serializers import PitchSerializer, PitchListSerializer, SavedPitchSerializer, PitchCommentSerializer


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
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def like(self, request, pk=None):
        """Like a pitch"""
        pitch = self.get_object()
        liked_pitch, created = LikedPitch.objects.get_or_create(
            user=request.user,
            pitch=pitch
        )
        if created:
            pitch.increment_likes()
            return Response(
                {'message': 'Pitch liked successfully', 'likes_count': pitch.likes_count},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'message': 'Pitch already liked', 'likes_count': pitch.likes_count},
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unlike(self, request, pk=None):
        """Unlike a pitch"""
        pitch = self.get_object()
        deleted_count, _ = LikedPitch.objects.filter(
            user=request.user,
            pitch=pitch
        ).delete()
        if deleted_count > 0:
            pitch.decrement_likes()
            return Response(
                {'message': 'Pitch unliked successfully', 'likes_count': pitch.likes_count},
                status=status.HTTP_200_OK
            )
        return Response(
            {'message': 'Pitch was not liked', 'likes_count': pitch.likes_count},
            status=status.HTTP_404_NOT_FOUND
        )
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def liked(self, request):
        """Get all pitches liked by the current user"""
        liked_pitches = LikedPitch.objects.filter(
            user=request.user
        ).select_related('pitch', 'pitch__author')
        pitch_ids = [lp.pitch.id for lp in liked_pitches]
        pitches = Pitch.objects.filter(id__in=pitch_ids)
        page = self.paginate_queryset(pitches)
        if page is not None:
            serializer = PitchListSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = PitchListSerializer(pitches, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['get', 'post'], permission_classes=[IsAuthenticatedOrReadOnly])
    def comments(self, request, pk=None):
        """Get or add comments for a pitch"""
        pitch = self.get_object()
        
        if request.method == 'GET':
            # Get all comments for this pitch (top-level only, no replies)
            comments = PitchComment.objects.filter(pitch=pitch, parent=None).select_related('author')
            page = self.paginate_queryset(comments)
            if page is not None:
                serializer = PitchCommentSerializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)
            serializer = PitchCommentSerializer(comments, many=True, context={'request': request})
            return Response(serializer.data)
        
        elif request.method == 'POST':
            if not request.user.is_authenticated:
                return Response(
                    {'error': 'Authentication required'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            serializer = PitchCommentSerializer(data={
                'pitch': pitch.id,
                'content': request.data.get('content', ''),
                'parent': request.data.get('parent')
            }, context={'request': request})
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PitchCommentViewSet(viewsets.ModelViewSet):
    """ViewSet for managing pitch comments"""
    queryset = PitchComment.objects.select_related('author', 'pitch').all()
    serializer_class = PitchCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        pitch_id = self.request.query_params.get('pitch')
        if pitch_id:
            queryset = queryset.filter(pitch_id=pitch_id)
        return queryset
    
    def destroy(self, request, *args, **kwargs):
        """Delete a comment - only author can delete their own comments"""
        instance = self.get_object()
        if instance.author != request.user:
            return Response(
                {'error': 'You can only delete your own comments'},
                status=status.HTTP_403_FORBIDDEN
            )
        # Decrement comments count on pitch
        instance.pitch.comments_count = max(0, instance.pitch.comments_count - 1)
        instance.pitch.save(update_fields=['comments_count'])
        return super().destroy(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        """Update a comment - only author can update their own comments"""
        instance = self.get_object()
        if instance.author != request.user:
            return Response(
                {'error': 'You can only edit your own comments'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)
    
    @action(detail=True, methods=['get'])
    def replies(self, request, pk=None):
        """Get all replies to a comment"""
        comment = self.get_object()
        replies = comment.replies.select_related('author')
        serializer = PitchCommentSerializer(replies, many=True, context={'request': request})
        return Response(serializer.data)
