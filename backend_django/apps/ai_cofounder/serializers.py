from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import AISession, AIMessage, AIOutput

User = get_user_model()


class AIMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIMessage
        fields = ['id', 'session', 'role', 'content', 'tokens_used', 'model', 'created_at']
        read_only_fields = ['created_at']


class AISessionSerializer(serializers.ModelSerializer):
    messages = AIMessageSerializer(many=True, read_only=True)
    messages_count = serializers.SerializerMethodField()
    
    class Meta:
        model = AISession
        fields = ['id', 'user', 'tool', 'title', 'context', 'messages', 'messages_count', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def get_messages_count(self, obj):
        return obj.messages.count()
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)


class AIOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIOutput
        fields = [
            'id', 'session', 'user', 'output_type', 'title', 'content',
            'metadata', 'is_saved', 'rating', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)
