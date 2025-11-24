from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceProviderViewSet, ServiceListingViewSet, InquiryViewSet

router = DefaultRouter()
router.register(r'providers', ServiceProviderViewSet, basename='service-provider')
router.register(r'listings', ServiceListingViewSet, basename='service-listing')
router.register(r'inquiries', InquiryViewSet, basename='inquiry')

urlpatterns = [
    path('', include(router.urls)),
]
