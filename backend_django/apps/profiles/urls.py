from django.urls import path
from .views import (
    ProfileDetailView, PublicProfileView, ProfileListView,
    PortfolioItemListCreateView, PortfolioItemDetailView,
    TestimonialListCreateView, TestimonialDetailView,
    ComprehensiveProfileView
)

urlpatterns = [
    # Comprehensive profile (for EntrepreneurProfile component)
    path('comprehensive/', ComprehensiveProfileView.as_view(), name='comprehensive-profile'),
    
    # Profile management
    path('me/', ProfileDetailView.as_view(), name='profile-detail'),
    path('list/', ProfileListView.as_view(), name='profile-list'),
    path('<str:username>/', PublicProfileView.as_view(), name='public-profile'),
    
    # Portfolio items
    path('me/portfolio/', PortfolioItemListCreateView.as_view(), name='portfolio-list-create'),
    path('me/portfolio/<int:pk>/', PortfolioItemDetailView.as_view(), name='portfolio-detail'),
    
    # Testimonials
    path('me/testimonials/', TestimonialListCreateView.as_view(), name='testimonial-list-create'),
    path('me/testimonials/<int:pk>/', TestimonialDetailView.as_view(), name='testimonial-detail'),
]
