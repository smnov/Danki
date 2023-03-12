from django.urls import path
from ..views import deck_views as views

urlpatterns = [
        path("", views.DecksView.as_view()),
        path("<int:pk>", views.DeckView.as_view()),
]
