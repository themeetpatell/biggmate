from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from datetime import timedelta
import random

from .models import OTPVerification, GlobalLocation
from .serializers import (
    UserSerializer, UserRegistrationSerializer, UserLoginSerializer,
    PasswordResetRequestSerializer, PasswordResetVerifySerializer,
    UsernameRecoveryRequestSerializer, UsernameRecoveryVerifySerializer
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
