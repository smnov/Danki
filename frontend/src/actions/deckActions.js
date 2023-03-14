import axios from "axios";
import {
  DECK_CREATE_FAIL,
  DECK_CREATE_REQUEST,
  DECK_CREATE_SUCCESS,
  DECK_DELETE_REQUEST,
  DECK_DELETE_SUCCESS,
  DECK_FAIL,
  DECK_LIST_FAIL,
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_REQUEST,
  DECK_SUCCESS,
  localhost,
} from "../constants/constants";

export const listDecks = () => async (dispatch) => {
  try {
    dispatch({ type: DECK_LIST_REQUEST });
    const { data } = await axios.get(localhost + "decks");
    dispatch({
      type: DECK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DECK_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const deckDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DECK_REQUEST });
    const { data } = await axios.get(localhost + `decks/${id}`);
    dispatch({
      type: DECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DECK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const deckDeleteAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DECK_DELETE_REQUEST });
    const { data } = await axios.delete(localhost + `delete/${id}`);
    dispatch({
      type: DECK_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DECK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const deckCreateAction = (deck) => async (dispatch) => {
  try {
    dispatch({type: DECK_CREATE_REQUEST})
    const { data } = await axios.post(localhost + 'decks', deck)
    dispatch({type: DECK_CREATE_SUCCESS,
    payload: data,})
  } catch (error) {
    dispatch({
      type: DECK_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
}