from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillProfileViewSet, ServicePackageViewSet, ClientProjectViewSet

router = DefaultRouter()
router.register(r'profiles', SkillProfileViewSet, basename='skill-profile')
router.register(r'packages', ServicePackageViewSet, basename='service-package')
router.register(r'projects', ClientProjectViewSet, basename='client-project')

urlpatterns = [
    path('', include(router.urls)),
]
