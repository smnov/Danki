import {
  DECK_CREATE_FAIL,
  DECK_CREATE_REQUEST,
  DECK_CREATE_SUCCESS,
  DECK_DELETE_FAIL,
  DECK_DELETE_REQUEST,
  DECK_DELETE_SUCCESS,
  DECK_FAIL,
  DECK_LIST_FAIL,
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_REQUEST,
  DECK_SUCCESS,
} from "../constants/constants";

export const deckListReducer = (state = { decks: [] }, action) => {
  switch (action.type) {
    case DECK_LIST_REQUEST:
      return { loading: true, decks: [] };
    case DECK_LIST_SUCCESS:
      return { loading: false, decks: action.payload };
    case DECK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deckReducer = (state = {}, action) => {
  switch (action.type) {
    case DECK_REQUEST:
      return { loading: true, ...state };
    case DECK_SUCCESS:
      return { loading: false, deck: action.payload };
    case DECK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deckDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DECK_DELETE_REQUEST:
      return { loading: true, ...state };
    case DECK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DECK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deckCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case DECK_CREATE_REQUEST:
      return {loading: true, deck: action.payload}
    case DECK_CREATE_SUCCESS:
      return {loading: false, success: true}
    case DECK_CREATE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}