from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Profile, PortfolioItem, Testimonial
from .serializers import (
    ProfileSerializer, ProfileCreateUpdateSerializer, 
    PortfolioItemSerializer, TestimonialSerializer,
    ComprehensiveProfileSerializer
)


class ComprehensiveProfileView(views.APIView):
    """
    Get comprehensive user profile including all user data, onboarding data, 
    profile info, portfolio items, testimonials, and stats.
    This is the main endpoint for displaying the full user profile.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get full profile data for the authenticated user"""
        user = request.user
        
        # Get or create profile
        profile, created = Profile.objects.prefetch_related(
            'portfolio_items', 'testimonials'
        ).get_or_create(user=user)
        
        # Serialize comprehensive profile data
        serializer = ComprehensiveProfileSerializer(profile, context={'request': request})
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        """Update profile data"""
        user = request.user
        data = request.data
        
        # Get or create profile
        profile, created = Profile.objects.get_or_create(user=user)
        
        # Update profile fields
        profile_fields = [
            'role', 'bio', 'tagline', 'avatar', 'cover_image',
            'skills', 'experience', 'previous_startups', 'location',
            'looking_for', 'industries', 'archetype', 'availability',
            'stage_preference', 'linkedin_url', 'twitter_url', 'github_url', 'website_url',
            'is_public', 'accepting_pitches'
        ]
        
        for field in profile_fields:
            if field in data:
                setattr(profile, field, data[field])
        
        profile.save()
        
        # Update onboarding data if provided
        onboarding_fields = ['work_experience', 'education', 'mission_statement', 
                            'selected_values', 'about_self', 'background']
        
        # Get or create onboarding data
        from apps.users.models import OnboardingData
        onboarding, _ = OnboardingData.objects.get_or_create(user=user)
        
        onboarding_updated = False
        for field in onboarding_fields:
            if field in data:
                setattr(onboarding, field, data[field])
                onboarding_updated = True
        
        if onboarding_updated:
            onboarding.save()
        
        # Return updated comprehensive profile
        serializer = ComprehensiveProfileSerializer(profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    """Get or update user's own profile"""
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProfileCreateUpdateSerializer
        return ProfileSerializer


class PublicProfileView(generics.RetrieveAPIView):
    """Get public profile by username"""
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    lookup_field = 'user__username'
    lookup_url_kwarg = 'username'
    
    def get_queryset(self):
        return Profile.objects.filter(is_public=True)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment profile views
        instance.profile_views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ProfileListView(generics.ListAPIView):
    """List all public profiles"""
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Profile.objects.filter(is_public=True)
        
        # Filters
        role = self.request.query_params.get('role')
        industry = self.request.query_params.get('industry')
        archetype = self.request.query_params.get('archetype')
        availability = self.request.query_params.get('availability')
        
        if role:
            queryset = queryset.filter(role__icontains=role)
        if industry:
            queryset = queryset.filter(industries__contains=[industry])
        if archetype:
            queryset = queryset.filter(archetype=archetype)
        if availability:
            queryset = queryset.filter(availability=availability)
        
        return queryset


class PortfolioItemListCreateView(generics.ListCreateAPIView):
    """List or create portfolio items"""
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return PortfolioItem.objects.filter(profile=profile)
    
    def perform_create(self, serializer):
        profile = get_object_or_404(Profile, user=self.request.user)
        serializer.save(profile=profile)


class PortfolioItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a portfolio item"""
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return PortfolioItem.objects.filter(profile=profile)


class TestimonialListCreateView(generics.ListCreateAPIView):
    """List or create testimonials"""
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return Testimonial.objects.filter(profile=profile)
    
    def perform_create(self, serializer):
        profile = get_object_or_404(Profile, user=self.request.user)
        serializer.save(profile=profile)


class TestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a testimonial"""
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        profile = get_object_or_404(Profile, user=self.request.user)
        return Testimonial.objects.filter(profile=profile)
