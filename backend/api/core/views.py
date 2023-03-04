from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Deck, Card
from .serializers import DeckSerializer

class Home(APIView):
    def get(self, request):
        decks = Deck.objects.all()
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)
