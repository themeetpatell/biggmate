from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from datetime import timedelta
import random

from .models import OTPVerification, GlobalLocation
from .models_onboarding import (
    ValueCategory, Value, Intent, Industry, Skill, ExperienceLevel,
    CofounderRole, WorkStyle, TimeCommitment, Availability, LocationPreference
)
from .serializers import (
    UserSerializer, UserRegistrationSerializer, UserLoginSerializer,
    PasswordResetRequestSerializer, PasswordResetVerifySerializer,
    UsernameRecoveryRequestSerializer, UsernameRecoveryVerifySerializer,
    OnboardingDataSerializer
)
from .serializers_onboarding import (
    ValueCategorySerializer, IntentSerializer, IndustrySerializer,
    SkillSerializer, ExperienceLevelSerializer, OnboardingOptionsSerializer,
    CofounderRoleSerializer, WorkStyleSerializer, TimeCommitmentSerializer,
    AvailabilitySerializer, LocationPreferenceSerializer
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """User registration endpoint"""
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Create global location if provided
        location_data = request.data.get('location', {})
        if location_data:
            GlobalLocation.objects.create(
                user=user,
                country=location_data.get('country', 'United States'),
                city=location_data.get('city', 'San Francisco'),
                timezone=location_data.get('timezone', 'PST'),
                region=location_data.get('region', 'North America'),
                language=location_data.get('language', 'English')
            )
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'accessToken': str(refresh.access_token),
            'refreshToken': str(refresh),
        }, status=status.HTTP_201_CREATED)


class LoginView(views.APIView):
    """User login endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        
        if not user:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Update last active
        user.last_active = timezone.now()
        user.save()
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'accessToken': str(refresh.access_token),
            'refreshToken': str(refresh),
        })


class LogoutView(views.APIView):
    """User logout endpoint"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refreshToken')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            pass
        
        return Response({'message': 'Logged out successfully'})


class CurrentUserView(generics.RetrieveUpdateAPIView):
    """Get or update current user"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class PasswordResetRequestView(views.APIView):
    """Request password reset OTP"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        whatsapp_number = serializer.validated_data['whatsapp_number']
        country_code = serializer.validated_data['country_code']
        full_number = f"{country_code}{whatsapp_number}"
        
        # Check if user exists
        try:
            user = User.objects.get(whatsapp_number=full_number)
        except User.DoesNotExist:
            return Response(
                {'error': 'No user found with this WhatsApp number'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Generate OTP
        otp = str(random.randint(100000, 999999))
        expires_at = timezone.now() + timedelta(minutes=10)
        
        # Save OTP
        OTPVerification.objects.create(
            user=user,
            whatsapp_number=full_number,
            otp=otp,
            purpose='password_reset',
            expires_at=expires_at
        )
        
        # TODO: Send OTP via WhatsApp/Twilio
        # send_whatsapp_otp(full_number, otp)
        
        return Response({
            'message': 'OTP sent successfully',
            'otp': otp  # Remove in production
        })


class PasswordResetVerifyView(views.APIView):
    """Verify OTP and reset password"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = PasswordResetVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        whatsapp_number = serializer.validated_data['whatsapp_number']
        otp = serializer.validated_data['otp']
        new_password = serializer.validated_data['new_password']
        
        # Verify OTP
        try:
            otp_record = OTPVerification.objects.get(
                whatsapp_number=whatsapp_number,
                otp=otp,
                purpose='password_reset',
                is_used=False,
                expires_at__gt=timezone.now()
            )
        except OTPVerification.DoesNotExist:
            return Response(
                {'error': 'Invalid or expired OTP'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Reset password
        user = otp_record.user
        user.set_password(new_password)
        user.save()
        
        # Mark OTP as used
        otp_record.is_used = True
        otp_record.save()
        
        return Response({'message': 'Password reset successfully'})


class UsernameRecoveryRequestView(views.APIView):
    """Request username recovery OTP"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UsernameRecoveryRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        whatsapp_number = serializer.validated_data['whatsapp_number']
        country_code = serializer.validated_data['country_code']
        full_number = f"{country_code}{whatsapp_number}"
        
        # Check if user exists
        try:
            user = User.objects.get(whatsapp_number=full_number)
        except User.DoesNotExist:
            return Response(
                {'error': 'No user found with this WhatsApp number'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Generate OTP
        otp = str(random.randint(100000, 999999))
        expires_at = timezone.now() + timedelta(minutes=10)
        
        # Save OTP
        OTPVerification.objects.create(
            user=user,
            whatsapp_number=full_number,
            otp=otp,
            purpose='username_recovery',
            expires_at=expires_at
        )
        
        # TODO: Send OTP via WhatsApp/Twilio
        
        return Response({
            'message': 'OTP sent successfully',
            'otp': otp  # Remove in production
        })


class UsernameRecoveryVerifyView(views.APIView):
    """Verify OTP and return username"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UsernameRecoveryVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        whatsapp_number = serializer.validated_data['whatsapp_number']
        otp = serializer.validated_data['otp']
        
        # Verify OTP
        try:
            otp_record = OTPVerification.objects.get(
                whatsapp_number=whatsapp_number,
                otp=otp,
                purpose='username_recovery',
                is_used=False,
                expires_at__gt=timezone.now()
            )
        except OTPVerification.DoesNotExist:
            return Response(
                {'error': 'Invalid or expired OTP'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get username
        user = otp_record.user
        
        # Mark OTP as used
        otp_record.is_used = True
        otp_record.save()
        
        return Response({
            'username': user.username,
            'email': user.email
        })


class OnboardingView(views.APIView):
    """Save comprehensive onboarding data"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        from .models import OnboardingData
        from apps.profiles.models import Profile
        
        user = request.user
        data = request.data
        
        # Update User model fields
        if 'user_intent' in data:
            user.user_intent = data['user_intent']
        if 'onboarding_complete' in data:
            user.onboarding_complete = data['onboarding_complete']
        if 'user_stage' in data:
            user.user_stage = data['user_stage']
        if 'user_mask' in data:
            user.user_mask = data['user_mask']
        if 'user_role' in data:
            user.user_role = data['user_role']
        
        user.save()
        
        # Create or update OnboardingData
        onboarding_data, created = OnboardingData.objects.get_or_create(user=user)
        
        # Mission & Values
        if 'mission_statement' in data or 'whyHere' in data:
            onboarding_data.mission_statement = data.get('mission_statement') or data.get('whyHere', '')
        if 'selected_values' in data or 'selectedValues' in data:
            onboarding_data.selected_values = data.get('selected_values') or data.get('selectedValues', [])
        
        # Background
        if 'industries' in data or 'yourIndustries' in data:
            onboarding_data.industries = data.get('industries') or data.get('yourIndustries', [])
        if 'skills' in data or 'yourSkills' in data:
            onboarding_data.skills = data.get('skills') or data.get('yourSkills', [])
        if 'experience' in data or 'yourExperience' in data:
            onboarding_data.experience = data.get('experience') or data.get('yourExperience', '')
        if 'background' in data or 'yourBackground' in data:
            onboarding_data.background = data.get('background') or data.get('yourBackground', '')
        if 'about_self' in data or 'yourSelf' in data:
            onboarding_data.about_self = data.get('about_self') or data.get('yourSelf', '')
        if 'birth_place' in data or 'birthPlace' in data:
            onboarding_data.birth_place = data.get('birth_place') or data.get('birthPlace', '')
        
        # Pitch & Media
        if 'pitch_text' in data or 'pitchText' in data:
            onboarding_data.pitch_text = data.get('pitch_text') or data.get('pitchText', '')
        if 'pitch_format' in data or 'pitchFormat' in data:
            onboarding_data.pitch_format = data.get('pitch_format') or data.get('pitchFormat', 'text')
        if 'has_voice_note' in data or 'hasVoiceNote' in data:
            onboarding_data.has_voice_note = data.get('has_voice_note') or data.get('hasVoiceNote', False)
        if 'pitch_deck_file_name' in data or 'pitchDeckFileName' in data:
            onboarding_data.pitch_deck_file_name = data.get('pitch_deck_file_name') or data.get('pitchDeckFileName', '')
        if 'pitch_deck_file_size' in data or 'pitchDeckFileSize' in data:
            onboarding_data.pitch_deck_file_size = data.get('pitch_deck_file_size') or data.get('pitchDeckFileSize', '')
        
        # Cofounder Preferences
        if 'cofounder_preferences' in data or 'cofounderPreferences' in data:
            onboarding_data.cofounder_preferences = data.get('cofounder_preferences') or data.get('cofounderPreferences', {})
        
        # Offer Skills Data
        if 'offer_skills_data' in data or 'offerSkillsPreferences' in data:
            onboarding_data.offer_skills_data = data.get('offer_skills_data') or data.get('offerSkillsPreferences', {})
        
        # Idea Sprint Data
        if 'idea_sprint_data' in data or 'ideaSprintDetails' in data:
            onboarding_data.idea_sprint_data = data.get('idea_sprint_data') or data.get('ideaSprintDetails', {})
        
        onboarding_data.save()
        
        # Create or update Profile if needed
        profile, profile_created = Profile.objects.get_or_create(
            user=user,
            defaults={
                'role': user.user_role or 'founder',
                'bio': onboarding_data.about_self or '',
                'skills': onboarding_data.skills or [],
                'experience': onboarding_data.experience or '',
                'industries': onboarding_data.industries or [],
                'location': onboarding_data.birth_place or '',
            }
        )
        
        # Update existing profile
        if not profile_created:
            if onboarding_data.skills:
                profile.skills = onboarding_data.skills
            if onboarding_data.industries:
                profile.industries = onboarding_data.industries
            if onboarding_data.experience:
                profile.experience = onboarding_data.experience
            if onboarding_data.about_self:
                profile.bio = onboarding_data.about_self
            if onboarding_data.birth_place:
                profile.location = onboarding_data.birth_place
            profile.save()
        
        return Response({
            'success': True,
            'message': 'Onboarding data saved successfully',
            'user': UserSerializer(user).data,
            'onboarding_complete': user.onboarding_complete
        })
    
    def get(self, request):
        """Get onboarding status and data"""
        from .models import OnboardingData
        
        user = request.user
        
        try:
            onboarding_data = user.onboarding_data
            onboarding_dict = {
                'mission_statement': onboarding_data.mission_statement,
                'selected_values': onboarding_data.selected_values,
                'industries': onboarding_data.industries,
                'skills': onboarding_data.skills,
                'experience': onboarding_data.experience,
                'background': onboarding_data.background,
                'about_self': onboarding_data.about_self,
                'birth_place': onboarding_data.birth_place,
                'pitch_text': onboarding_data.pitch_text,
                'pitch_format': onboarding_data.pitch_format,
                'cofounder_preferences': onboarding_data.cofounder_preferences,
                'offer_skills_data': onboarding_data.offer_skills_data,
                'idea_sprint_data': onboarding_data.idea_sprint_data,
            }
        except OnboardingData.DoesNotExist:
            onboarding_dict = {}
        
        return Response({
            'onboarding_complete': user.onboarding_complete,
            'user_intent': user.user_intent,
            'user_stage': user.user_stage,
            'user_mask': user.user_mask,
            'user_role': user.user_role,
            'onboarding_data': onboarding_dict
        })


class OnboardingOptionsView(views.APIView):
    """
    Get all onboarding options including values, intents, industries, skills, and experience levels
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Fetch all onboarding options from database"""
        try:
            # Fetch all data
            value_categories = ValueCategory.objects.prefetch_related('values').all()
            intents = Intent.objects.all()
            industries = Industry.objects.all()
            skills = Skill.objects.all()
            experience_levels = ExperienceLevel.objects.all()
            cofounder_roles = CofounderRole.objects.all()
            work_styles = WorkStyle.objects.all()
            time_commitments = TimeCommitment.objects.all()
            availabilities = Availability.objects.all()
            location_preferences = LocationPreference.objects.all()
            
            # Serialize data
            data = {
                'value_groups': ValueCategorySerializer(value_categories, many=True).data,
                'intents': IntentSerializer(intents, many=True).data,
                'industries': IndustrySerializer(industries, many=True).data,
                'skills': SkillSerializer(skills, many=True).data,
                'experience_levels': ExperienceLevelSerializer(experience_levels, many=True).data,
                'cofounder_roles': CofounderRoleSerializer(cofounder_roles, many=True).data,
                'work_styles': WorkStyleSerializer(work_styles, many=True).data,
                'time_commitments': TimeCommitmentSerializer(time_commitments, many=True).data,
                'availabilities': AvailabilitySerializer(availabilities, many=True).data,
                'location_preferences': LocationPreferenceSerializer(location_preferences, many=True).data,
            }
            
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch onboarding options: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
