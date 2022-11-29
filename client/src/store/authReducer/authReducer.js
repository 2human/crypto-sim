import { SET_LOGIN_STATUS, SET_USER_ID } from "../actions/actionTypes";

export const defaultState = { loggedIn: false, userId: undefined };

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...state, loggedIn: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};
