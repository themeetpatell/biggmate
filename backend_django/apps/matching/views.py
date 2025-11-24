from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.utils import timezone
from .models import Match, Connection, CompatibilityScore
from .serializers import (
    MatchSerializer, ConnectionSerializer, CompatibilityScoreSerializer
)


class MatchViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing matches"""
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']
    
    def get_queryset(self):
        # Get matches where the user is either user1 or user2
        return Match.objects.filter(
            Q(user1=self.request.user) | Q(user2=self.request.user)
        ).select_related('user1', 'user2').order_by('-compatibility_score')
    
    @action(detail=False, methods=['get'])
    def top_matches(self, request):
        """Get top matches for the current user"""
        matches = self.get_queryset().filter(status='active')[:10]
        serializer = self.get_serializer(matches, many=True)
        return Response(serializer.data)


class ConnectionViewSet(viewsets.ModelViewSet):
    """ViewSet for managing connections"""
    serializer_class = ConnectionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']
    
    def get_queryset(self):
        # Get connections where the user is either sender or receiver
        return Connection.objects.filter(
            Q(user=self.request.user) | Q(connected_user=self.request.user)
        ).select_related('user', 'connected_user').order_by('-created_at')
    
    @action(detail=False, methods=['get'])
    def sent(self, request):
        """Get connection requests sent by the current user"""
        connections = self.get_queryset().filter(user=request.user)
        page = self.paginate_queryset(connections)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(connections, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def received(self, request):
        """Get connection requests received by the current user"""
        connections = self.get_queryset().filter(connected_user=request.user)
        page = self.paginate_queryset(connections)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(connections, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active connections"""
        connections = self.get_queryset().filter(status='accepted')
        page = self.paginate_queryset(connections)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(connections, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        """Accept a connection request"""
        connection = self.get_object()
        
        if connection.connected_user != request.user:
            return Response(
                {'error': 'Only the receiver can accept connection requests'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if connection.status != 'pending':
            return Response(
                {'error': f'Cannot accept connection with status: {connection.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        connection.status = 'accepted'
        connection.responded_at = timezone.now()
        connection.save(update_fields=['status', 'responded_at', 'updated_at'])
        
        serializer = self.get_serializer(connection)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        """Decline a connection request"""
        connection = self.get_object()
        
        if connection.connected_user != request.user:
            return Response(
                {'error': 'Only the receiver can decline connection requests'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if connection.status != 'pending':
            return Response(
                {'error': f'Cannot decline connection with status: {connection.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        connection.status = 'declined'
        connection.responded_at = timezone.now()
        connection.save(update_fields=['status', 'responded_at', 'updated_at'])
        
        serializer = self.get_serializer(connection)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def block(self, request, pk=None):
        """Block a connection"""
        connection = self.get_object()
        
        # Only the receiver can block
        if connection.connected_user != request.user:
            return Response(
                {'error': 'Only the receiver can block connections'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        connection.status = 'blocked'
        connection.responded_at = timezone.now()
        connection.save(update_fields=['status', 'responded_at', 'updated_at'])
        
        serializer = self.get_serializer(connection)
        return Response(serializer.data)


class CompatibilityScoreViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing compatibility scores"""
    serializer_class = CompatibilityScoreSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Get compatibility scores where the user is either user1 or user2
        return CompatibilityScore.objects.filter(
            Q(user1=self.request.user) | Q(user2=self.request.user)
        ).select_related('user1', 'user2').order_by('-overall_score')
