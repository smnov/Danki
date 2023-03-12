import {
  CARD_CREATE_FAIL,
  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARD_OF_DECK_FAIL,
  CARD_OF_DECK_REQUEST,
  CARD_OF_DECK_SUCCESS,
} from "../constants/constants";

export const cardsOfDeckReducer = (state = { cards: [] }, action) => {
  switch (action.type) {
    case CARD_OF_DECK_REQUEST:
      return { loading: true, cards: [] };
    case CARD_OF_DECK_SUCCESS:
      return { loading: false, cards: action.payload };
    case CARD_OF_DECK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_CREATE_REQUEST:
      return { loading: true, ...state };
    case CARD_CREATE_SUCCESS:
      return { loading: false, card: action.payload };
    case CARD_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
