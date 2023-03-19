import axios from "axios"
import { CARD_DECREASE_FAIL, CARD_DECREASE_REQUEST, CARD_DECREASE_SUCCESS, CARD_INCREASE_FAIL, CARD_INCREASE_REQUEST, CARD_INCREASE_SUCCESS, CARD_LEARN_FAIL, CARD_LEARN_REQUEST, CARD_LEARN_SUCCESS, CARD_STATUS_FAIL, CARD_STATUS_REQUEST, CARD_STATUS_SUCCESS, localhost } from "../constants/constants"

export const cardLearnAction = (id) => async (dispatch) => {
    try {
        dispatch({type: CARD_LEARN_REQUEST})
        const { data } = await axios.get(localhost + `learning/${id}`)
        dispatch({type: CARD_LEARN_SUCCESS,
        payload: data})
  } catch (error) {
    dispatch({
      type: CARD_LEARN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
}

export const increaseCardAction = (id, rating) => async (dispatch) => {
  try {
    dispatch({type: CARD_INCREASE_REQUEST})
    const { data } = await axios.patch(localhost + `card/rating/plus/${id}?rating=${rating}`)
    dispatch({type: CARD_INCREASE_SUCCESS})
  } catch(error) {
    dispatch({
      type: CARD_INCREASE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });

  }
}


export const decreaseCardAction = (id, rating) => async (dispatch) => {
  try {
    dispatch({type: CARD_DECREASE_REQUEST})
    const { data } = await axios.patch(localhost + `card/rating/minus/${id}?rating=${rating}`)
    dispatch({type: CARD_DECREASE_SUCCESS})
  } catch(error) {
    dispatch({
      type: CARD_DECREASE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
}


export const cardStatusAction = (id) => async (dispatch) => {
  try {
    dispatch({type: CARD_STATUS_REQUEST})
    const { data } = await axios.get(localhost + `deck/${id}/status`)
    dispatch({type: CARD_STATUS_SUCCESS, payload: data})
  } catch(error) {
    dispatch({
      type: CARD_STATUS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.detail,
    });
  }
}