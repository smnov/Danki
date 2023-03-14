import {
  CARD_CREATE_FAIL,
  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARDS_OF_DECK_FAIL,
  CARDS_OF_DECK_REQUEST,
  CARDS_OF_DECK_SUCCESS,
  CARD_GET_ONE_REQUEST,
  CARD_GET_ONE_SUCCESS,
  CARD_GET_ONE_FAIL,
} from "../constants/constants";

export const cardsOfDeckReducer = (state = { cards: [] }, action) => {
  switch (action.type) {
    case CARDS_OF_DECK_REQUEST:
      return { loading: true, cards: [] };
    case CARDS_OF_DECK_SUCCESS:
      return { loading: false, cards: action.payload };
    case CARDS_OF_DECK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const oneCardReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_GET_ONE_REQUEST:
      return {loading: true, ...state}
    case CARD_GET_ONE_SUCCESS:
      return {loading: false, card: action.payload}
    case CARD_GET_ONE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

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
