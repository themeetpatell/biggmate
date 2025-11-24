from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EquityCalculationViewSet, VestingScheduleViewSet, CapTableViewSet

router = DefaultRouter()
router.register(r'calculations', EquityCalculationViewSet, basename='equity-calculation')
router.register(r'vesting', VestingScheduleViewSet, basename='vesting-schedule')
router.register(r'cap-table', CapTableViewSet, basename='cap-table')

urlpatterns = [
    path('', include(router.urls)),
]
