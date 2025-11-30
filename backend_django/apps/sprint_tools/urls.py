from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    IdeaValidationViewSet, MarketResearchViewSet,
    MVPPlanViewSet, RevenueModelViewSet, SprintoDataViewSet
)

router = DefaultRouter()
router.register(r'sprinto', SprintoDataViewSet, basename='sprinto')
router.register(r'idea-validation', IdeaValidationViewSet, basename='idea-validation')
router.register(r'market-research', MarketResearchViewSet, basename='market-research')
router.register(r'mvp-plans', MVPPlanViewSet, basename='mvp-plan')
router.register(r'revenue-models', RevenueModelViewSet, basename='revenue-model')

urlpatterns = [
    path('', include(router.urls)),
]
