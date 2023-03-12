from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from ..models import Card
from ..serializers import CardSerializer


class CardsView(APIView):
    """View all cards"""
    def get(self, request):
        cards = Card.objects.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)


class CardsOfDeckView(APIView):
    """View cards of a deck"""
    def get(self, request, pk):
        cards = Card.objects.filter(deck__pk==pk)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)
