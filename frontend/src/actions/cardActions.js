import axios from "axios";
import {
  CARD_CREATE_FAIL,
  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARDS_OF_DECK_FAIL,
  CARDS_OF_DECK_REQUEST,
  CARDS_OF_DECK_SUCCESS,
  localhost,
  CARD_GET_ONE_REQUEST,
  CARD_GET_ONE_SUCCESS,
  CARD_GET_ONE_FAIL,
} from "../constants/constants";

export const cardsOfDeckAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: CARDS_OF_DECK_REQUEST });
    const { data } = await axios.get(localhost + `decks/${id}/cards`);
    dispatch({ type: CARDS_OF_DECK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CARDS_OF_DECK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const createCardAction = (card) => async (dispatch) => {
  try {
    dispatch({ type: CARD_CREATE_REQUEST });
    const { data } = await axios.post(localhost + `decks/${card.id}`, card);
    dispatch({ type: CARD_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CARD_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
};

export const oneCardAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: CARD_GET_ONE_REQUEST})
    const {data} = await axios.get(localhost + `cards/${id}`)
    dispatch({type: CARD_GET_ONE_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: CARD_GET_ONE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
}