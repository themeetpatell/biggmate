from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Prefetch
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'participants__username']
    ordering = ['-last_message_at', '-created_at']
    
    def get_queryset(self):
        return Conversation.objects.filter(
            participants=self.request.user
        ).prefetch_related('participants').distinct()
    
    @action(detail=False, methods=['post'])
    def start_conversation(self, request):
        """Start a new conversation with one or more users"""
        participant_ids = request.data.get('participants', [])
        is_group = request.data.get('is_group', False)
        title = request.data.get('title', '')
        
        if not participant_ids:
            return Response(
                {'error': 'At least one participant is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # For 1-on-1 conversations, check if one already exists
        if not is_group and len(participant_ids) == 1:
            existing = Conversation.objects.filter(
                is_group=False,
                participants=request.user
            ).filter(
                participants__id=participant_ids[0]
            ).distinct().first()
            
            if existing:
                serializer = self.get_serializer(existing)
                return Response(serializer.data)
        
        # Create new conversation
        conversation = Conversation.objects.create(
            is_group=is_group,
            title=title
        )
        conversation.participants.add(request.user)
        
        from django.contrib.auth import get_user_model
        User = get_user_model()
        for participant_id in participant_ids:
            try:
                user = User.objects.get(id=participant_id)
                conversation.participants.add(user)
            except User.DoesNotExist:
                pass
        
        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        """Get all messages in a conversation"""
        conversation = self.get_object()
        messages = conversation.messages.select_related('sender').order_by('created_at')
        
        # Mark messages as read
        unread_messages = messages.exclude(sender=request.user).exclude(
            read_by=request.user
        )
        for msg in unread_messages:
            msg.read_by.add(request.user)
        
        page = self.paginate_queryset(messages)
        if page is not None:
            serializer = MessageSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        """Send a message in a conversation"""
        conversation = self.get_object()
        
        # Verify user is a participant
        if not conversation.participants.filter(id=request.user.id).exists():
            return Response(
                {'error': 'You are not a participant in this conversation'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = MessageSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        message = serializer.save(conversation=conversation)
        
        return Response(
            MessageSerializer(message, context={'request': request}).data,
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """Mark all messages in a conversation as read"""
        conversation = self.get_object()
        
        unread_messages = conversation.messages.exclude(sender=request.user).exclude(
            read_by=request.user
        )
        
        for msg in unread_messages:
            msg.read_by.add(request.user)
        
        return Response({'message': 'Messages marked as read'})


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['conversation', 'message_type']
    ordering = ['created_at']
    
    def get_queryset(self):
        # Users can see messages from conversations they're part of
        user_conversations = Conversation.objects.filter(
            participants=self.request.user
        ).values_list('id', flat=True)
        
        return Message.objects.filter(
            conversation_id__in=user_conversations
        ).select_related('sender', 'conversation')
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """Mark a message as read"""
        message = self.get_object()
        message.read_by.add(request.user)
        message.is_read = True
        message.save(update_fields=['is_read'])
        
        serializer = self.get_serializer(message)
        return Response(serializer.data)
