from django.db import models


class Deck(models.Model):
    name = models.CharField(max_length=150)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Card(models.Model):
    frontside = models.CharField(max_length=100)
    backside = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name="deck")
    
    def __str__(self):
        return self.frontside

