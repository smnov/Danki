import axios from "axios";
import {
  CARD_CREATE_FAIL,
  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARD_OF_DECK_FAIL,
  CARD_OF_DECK_REQUEST,
  CARD_OF_DECK_SUCCESS,
  localhost,
} from "../constants/constants";

export const cardOfDeck = (id) => async (dispatch) => {
  try {
    dispatch({ type: CARD_OF_DECK_REQUEST });
    const { data } = await axios.get(localhost + `decks/${id}/cards`);
    dispatch({ type: CARD_OF_DECK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CARD_OF_DECK_FAIL,
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
    console.log(data);
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
