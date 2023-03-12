from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from ..models import Deck
from ..serializers import DeckSerializer


class DecksView(APIView):
    """View all decks"""
    def get(self, request):
        decks = Deck.objects.all()
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)


class DeckView(APIView):
    """One Deck View"""
    def get(self, request, pk):
        deck = Deck.objects.get(pk=pk)
        serializer = DeckSerializer(deck)
        return Response(serializer.data)
