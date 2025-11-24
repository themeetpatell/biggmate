from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PitchBackViewSet

router = DefaultRouter()
router.register(r'pitchbacks', PitchBackViewSet, basename='pitchback')

urlpatterns = [
    path('', include(router.urls)),
]
