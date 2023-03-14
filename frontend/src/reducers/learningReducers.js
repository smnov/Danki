import { CARD_LEARN_FAIL, CARD_LEARN_REQUEST, CARD_LEARN_SUCCESS } from "../constants/constants";

export const cardLearnReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_LEARN_REQUEST:
            return {loading: true}
        case CARD_LEARN_SUCCESS:
            return {loading:false, card: action.payload}
        case CARD_LEARN_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}