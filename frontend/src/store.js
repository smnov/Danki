import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  deckCreateReducer,
  deckDeleteReducer,
  deckListReducer,
  deckReducer,
} from "./reducers/deckReducers";
import { cardsOfDeckReducer, cardStatusReducer, createCartReducer, oneCardReducer } from "./reducers/cardReducers";
import { cardLearnReducer, decreaseCardReducer, increaseCardReducer } from "./reducers/learningReducers";

const reducer = combineReducers({
  deckList: deckListReducer,
  oneDeck: deckReducer,
  deckDelete: deckDeleteReducer,
  deckCreate: deckCreateReducer,
  cardsOfDeck: cardsOfDeckReducer,
  oneCard: oneCardReducer,
  createCard: createCartReducer,
  cardLearn: cardLearnReducer,
  increaseCard: increaseCardReducer,
  decreaseCard: decreaseCardReducer,
  cardStatus: cardStatusReducer,
});

const middleware = [thunk];
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
