from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/decks/', include('core.urls.deck_urls')),
    path('api/cards/', include('core.urls.card_urls')),
]
