// @flow
import {
  SET_USER,
  SET_USERS,
  SET_IS_PROCESS
} from "./actionTypes";

const INIT_STATE = {
  user: {},
  users: [],
};

const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_IS_PROCESS:
      return {
        ...state,
        isProcess: action.payload
      };
    default:
      return state;
  }
};

export default User;
