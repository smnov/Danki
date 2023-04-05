import datetime

def check_rating(card):
    if card.session_rating > 10:
        card.isDone = True
    if card.session_rating < 0:
        card.session_rating = 0
    if card.isDone:
        card.global_rating += 1
    card.last_update = datetime.datetime.now()
    return card 
