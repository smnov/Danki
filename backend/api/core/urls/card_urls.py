from django.urls import path
from ..views import card_views as views

urlpatterns = [
        path('', views.CardsView.as_view()),
        path('<int:pk>', views.CardsOfDeckView.as_view()),
        ]
