from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PitchViewSet, PitchCommentViewSet

router = DefaultRouter()
router.register(r'pitches', PitchViewSet, basename='pitch')
router.register(r'comments', PitchCommentViewSet, basename='pitch-comment')

urlpatterns = [
    path('', include(router.urls)),
]
