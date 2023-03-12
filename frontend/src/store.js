import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  deckDeleteReducer,
  deckListReducer,
  deckReducer,
} from "./reducers/deckReducers";
import { cardsOfDeckReducer, createCartReducer } from "./reducers/cardReducers";

const reducer = combineReducers({
  deckList: deckListReducer,
  oneDeck: deckReducer,
  deckDelete: deckDeleteReducer,
  cardsOfDeck: cardsOfDeckReducer,
  createCard: createCartReducer,
});

const middleware = [thunk];
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
