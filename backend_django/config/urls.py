"""
URL configuration for biggmate project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # API Endpoints
    path('api/auth/', include('apps.users.urls')),
    path('api/profiles/', include('apps.profiles.urls')),
    path('api/pitches/', include('apps.pitches.urls')),
    path('api/pitchbacks/', include('apps.pitchbacks.urls')),
    path('api/matching/', include('apps.matching.urls')),
    path('api/projects/', include('apps.projects.urls')),
    path('api/skills/', include('apps.skills.urls')),
    path('api/marketplace/', include('apps.marketplace.urls')),
    path('api/events/', include('apps.events.urls')),
    path('api/messages/', include('apps.messaging.urls')),
    path('api/equity/', include('apps.equity.urls')),
    path('api/ai/', include('apps.ai_cofounder.urls')),
    path('api/stakeholders/', include('apps.stakeholders.urls')),
    path('api/sprint/', include('apps.sprint_tools.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
