from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StakeholderViewSet, InteractionViewSet, PipelineViewSet

router = DefaultRouter()
router.register(r'stakeholders', StakeholderViewSet, basename='stakeholder')
router.register(r'interactions', InteractionViewSet, basename='interaction')
router.register(r'pipeline', PipelineViewSet, basename='pipeline')

urlpatterns = [
    path('', include(router.urls)),
]
