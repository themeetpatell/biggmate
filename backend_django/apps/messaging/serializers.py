from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Conversation, Message

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class MessageSerializer(serializers.ModelSerializer):
    sender_details = UserBriefSerializer(source='sender', read_only=True)
    is_own_message = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = [
            'id', 'conversation', 'sender', 'sender_details', 'content',
            'message_type', 'attachment_url', 'attachment_name',
            'is_read', 'reply_to', 'is_own_message', 'created_at', 'updated_at'
        ]
        read_only_fields = ['sender', 'is_read', 'created_at', 'updated_at']
    
    def get_is_own_message(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.sender == request.user
        return False
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['sender'] = request.user
        return super().create(validated_data)


class ConversationSerializer(serializers.ModelSerializer):
    participants_details = UserBriefSerializer(source='participants', many=True, read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    other_participant = serializers.SerializerMethodField()
    
    class Meta:
        model = Conversation
        fields = [
            'id', 'participants', 'participants_details', 'title',
            'is_group', 'last_message_text', 'last_message_at',
            'last_message', 'unread_count', 'other_participant',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['last_message_text', 'last_message_at', 'created_at', 'updated_at']
    
    def get_last_message(self, obj):
        last_msg = obj.messages.last()
        if last_msg:
            return {
                'id': last_msg.id,
                'sender': last_msg.sender.username,
                'content': last_msg.content[:100],
                'created_at': last_msg.created_at
            }
        return None
    
    def get_unread_count(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.messages.exclude(sender=request.user).exclude(
                read_by=request.user
            ).count()
        return 0
    
    def get_other_participant(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and not obj.is_group:
            other = obj.get_other_participant(request.user)
            if other:
                return UserBriefSerializer(other).data
        return None
    
    def create(self, validated_data):
        participants_data = validated_data.pop('participants', [])
        conversation = Conversation.objects.create(**validated_data)
        
        # Add participants
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            conversation.participants.add(request.user)
        
        for participant in participants_data:
            conversation.participants.add(participant)
        
        return conversation
