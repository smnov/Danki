import { CARD_DECREASE_FAIL, CARD_DECREASE_REQUEST, CARD_DECREASE_SUCCESS, CARD_INCREASE_FAIL, CARD_INCREASE_REQUEST, CARD_INCREASE_SUCCESS, CARD_LEARN_FAIL, CARD_LEARN_REQUEST, CARD_LEARN_SUCCESS } from "../constants/constants";

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


export const decreaseCardReducer = (state={}, action) => {
    switch (action.type) {
        case CARD_DECREASE_REQUEST:
            return {loading: true}
        case CARD_DECREASE_SUCCESS:
            return {loading: false, success: true}
        case CARD_DECREASE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const increaseCardReducer = (state={}, action) => {
    switch (action.type) {
        case CARD_INCREASE_REQUEST:
            return {loading: true}
        case CARD_INCREASE_SUCCESS:
            return {loading: false, success: true}
        case CARD_INCREASE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}