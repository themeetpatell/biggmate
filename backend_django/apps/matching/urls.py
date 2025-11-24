from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MatchViewSet, ConnectionViewSet, CompatibilityScoreViewSet

router = DefaultRouter()
router.register(r'matches', MatchViewSet, basename='match')
router.register(r'connections', ConnectionViewSet, basename='connection')
router.register(r'compatibility', CompatibilityScoreViewSet, basename='compatibility')

urlpatterns = [
    path('', include(router.urls)),
]
