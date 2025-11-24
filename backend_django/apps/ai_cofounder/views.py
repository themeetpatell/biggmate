from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
import os
import openai
from .models import AISession, AIMessage, AIOutput
from .serializers import AISessionSerializer, AIMessageSerializer, AIOutputSerializer


class AISessionViewSet(viewsets.ModelViewSet):
    serializer_class = AISessionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tool']
    
    def get_queryset(self):
        return AISession.objects.filter(user=self.request.user).prefetch_related('messages')
    
    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        """Send a message to the AI assistant"""
        session = self.get_object()
        user_message = request.data.get('message')
        
        if not user_message:
            return Response(
                {'error': 'message is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Save user message
        AIMessage.objects.create(
            session=session,
            role='user',
            content=user_message
        )
        
        # Get conversation history
        messages = list(session.messages.values('role', 'content'))
        
        # Call OpenAI API (if configured)
        try:
            openai.api_key = os.getenv('OPENAI_API_KEY')
            
            if not openai.api_key:
                return Response(
                    {'error': 'OpenAI API key not configured'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Prepare system message based on tool
            system_messages = {
                'cothink': 'You are a creative brainstorming assistant helping entrepreneurs develop and refine their ideas.',
                'cowrite': 'You are a professional content writer helping create compelling marketing and business content.',
                'coplan': 'You are a strategic planning consultant helping entrepreneurs create actionable business plans.',
                'coanalyze': 'You are a data analyst helping interpret business metrics and provide insights.',
                'cocode': 'You are a coding assistant helping developers write clean, efficient code.',
                'codesign': 'You are a design consultant providing creative design ideas and feedback.',
            }
            
            system_message = system_messages.get(session.tool, 'You are a helpful AI assistant for entrepreneurs.')
            
            # Call OpenAI
            response = openai.ChatCompletion.create(
                model='gpt-3.5-turbo',
                messages=[
                    {'role': 'system', 'content': system_message},
                    *messages
                ],
                temperature=0.7,
                max_tokens=1000
            )
            
            assistant_message = response.choices[0].message.content
            tokens_used = response.usage.total_tokens
            
            # Save assistant message
            ai_message = AIMessage.objects.create(
                session=session,
                role='assistant',
                content=assistant_message,
                tokens_used=tokens_used,
                model='gpt-3.5-turbo'
            )
            
            return Response({
                'message': AIMessageSerializer(ai_message).data,
                'tokens_used': tokens_used
            })
            
        except Exception as e:
            # If OpenAI is not available, return a mock response
            mock_message = f"AI response to: {user_message[:50]}... (OpenAI API not configured or error occurred: {str(e)})"
            
            ai_message = AIMessage.objects.create(
                session=session,
                role='assistant',
                content=mock_message,
                tokens_used=0
            )
            
            return Response({
                'message': AIMessageSerializer(ai_message).data,
                'tokens_used': 0,
                'note': 'This is a mock response. Configure OpenAI API key for real responses.'
            })
    
    @action(detail=False, methods=['post'])
    def quick_chat(self, request):
        """Quick chat without creating a session"""
        tool = request.data.get('tool', 'cothink')
        message = request.data.get('message')
        
        if not message:
            return Response(
                {'error': 'message is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create temporary session
        session = AISession.objects.create(
            user=request.user,
            tool=tool,
            title=f"Quick chat - {message[:50]}"
        )
        
        # Send message
        AIMessage.objects.create(
            session=session,
            role='user',
            content=message
        )
        
        # Get AI response (simplified - you can reuse send_message logic)
        mock_response = f"Here's a response to help with {tool}: {message[:100]}..."
        
        ai_message = AIMessage.objects.create(
            session=session,
            role='assistant',
            content=mock_response
        )
        
        return Response({
            'session_id': session.id,
            'response': AIMessageSerializer(ai_message).data
        })


class AIOutputViewSet(viewsets.ModelViewSet):
    serializer_class = AIOutputSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['output_type', 'is_saved']
    
    def get_queryset(self):
        return AIOutput.objects.filter(user=self.request.user).select_related('session')
    
    @action(detail=True, methods=['post'])
    def save_output(self, request, pk=None):
        """Mark output as saved"""
        output = self.get_object()
        output.is_saved = True
        output.save(update_fields=['is_saved', 'updated_at'])
        
        serializer = self.get_serializer(output)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def rate_output(self, request, pk=None):
        """Rate an AI output"""
        output = self.get_object()
        rating = request.data.get('rating')
        
        if not rating or not (1 <= int(rating) <= 5):
            return Response(
                {'error': 'rating must be between 1 and 5'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        output.rating = rating
        output.save(update_fields=['rating', 'updated_at'])
        
        serializer = self.get_serializer(output)
        return Response(serializer.data)


# AI Tool specific views
class AIToolViewSet(viewsets.ViewSet):
    """Specific AI tool endpoints"""
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'])
    def cothink(self, request):
        """CoThink - Brainstorming assistant"""
        topic = request.data.get('topic')
        context = request.data.get('context', {})
        
        session = AISession.objects.create(
            user=request.user,
            tool='cothink',
            title=f"Brainstorm: {topic}",
            context=context
        )
        
        return Response({
            'session_id': session.id,
            'message': 'CoThink session started. Ready to brainstorm!'
        })
    
    @action(detail=False, methods=['post'])
    def cowrite(self, request):
        """CoWrite - Content creation assistant"""
        content_type = request.data.get('content_type', 'general')
        prompt = request.data.get('prompt')
        
        session = AISession.objects.create(
            user=request.user,
            tool='cowrite',
            title=f"Write: {content_type}",
            context={'content_type': content_type, 'prompt': prompt}
        )
        
        return Response({
            'session_id': session.id,
            'message': 'CoWrite session started. Ready to create content!'
        })
    
    @action(detail=False, methods=['post'])
    def coplan(self, request):
        """CoPlan - Strategic planning assistant"""
        plan_type = request.data.get('plan_type', 'business')
        
        session = AISession.objects.create(
            user=request.user,
            tool='coplan',
            title=f"Plan: {plan_type}",
            context={'plan_type': plan_type}
        )
        
        return Response({
            'session_id': session.id,
            'message': 'CoPlan session started. Ready to strategize!'
        })
    
    @action(detail=False, methods=['post'])
    def coanalyze(self, request):
        """CoAnalyze - Data analysis assistant"""
        data = request.data.get('data')
        analysis_type = request.data.get('analysis_type', 'general')
        
        session = AISession.objects.create(
            user=request.user,
            tool='coanalyze',
            title=f"Analyze: {analysis_type}",
            context={'data': data, 'analysis_type': analysis_type}
        )
        
        return Response({
            'session_id': session.id,
            'message': 'CoAnalyze session started. Ready to analyze!'
        })
    
    @action(detail=False, methods=['post'])
    def cocode(self, request):
        """CoCode - Coding assistant"""
        language = request.data.get('language', 'python')
        task = request.data.get('task')
        
        session = AISession.objects.create(
            user=request.user,
            tool='cocode',
            title=f"Code: {language}",
            context={'language': language, 'task': task}
        )
        
        return Response({
            'session_id': session.id,
            'message': 'CoCode session started. Ready to code!'
        })
    
    @action(detail=False, methods=['post'])
    def codesign(self, request):
        """CoDesign - Design assistant"""
        design_type = request.data.get('design_type', 'ui')
        
        session = AISession.objects.create(
            user=request.user,
            tool='codesign',
            title=f"Design: {design_type}",
            context={'design_type': design_type}
        )
        
        return Response({
            'session_id': session.id,
            'message': 'CoDesign session started. Ready to design!'
        })
