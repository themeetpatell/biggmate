from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, LoginView, LogoutView, CurrentUserView,
    PasswordResetRequestView, PasswordResetVerifyView,
    UsernameRecoveryRequestView, UsernameRecoveryVerifyView,
    OnboardingView, OnboardingOptionsView
)

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User management
    path('me/', CurrentUserView.as_view(), name='current-user'),
    
    # Password reset
    path('password-reset/request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/verify/', PasswordResetVerifyView.as_view(), name='password-reset-verify'),
    
    # Username recovery
    path('username-recovery/request/', UsernameRecoveryRequestView.as_view(), name='username-recovery-request'),
    path('username-recovery/verify/', UsernameRecoveryVerifyView.as_view(), name='username-recovery-verify'),
    
    # Onboarding
    path('onboarding/', OnboardingView.as_view(), name='onboarding'),
    path('onboarding/options/', OnboardingOptionsView.as_view(), name='onboarding-options'),
]
