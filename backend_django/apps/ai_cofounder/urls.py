from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AISessionViewSet, AIOutputViewSet, AIToolViewSet

router = DefaultRouter()
router.register(r'sessions', AISessionViewSet, basename='ai-session')
router.register(r'outputs', AIOutputViewSet, basename='ai-output')
router.register(r'tools', AIToolViewSet, basename='ai-tools')

urlpatterns = [
    path('', include(router.urls)),
]
