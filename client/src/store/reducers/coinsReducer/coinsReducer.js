import { SET_COIN_DATA } from "../../actions/actionTypes";

export const defaultState = {
  coins: [],
};

export const coinsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COIN_DATA:
      return { ...state, coins: action.payload };
    default:
      return state;
  }
};
