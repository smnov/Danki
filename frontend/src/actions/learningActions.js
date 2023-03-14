import axios from "axios"
import { CARD_LEARN_FAIL, CARD_LEARN_REQUEST, CARD_LEARN_SUCCESS, localhost } from "../constants/constants"

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