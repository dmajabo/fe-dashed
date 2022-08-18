// @flow
import {
  SET_USER,
  SET_USERS,
  SET_IS_PROCESS,
  ADD_NEW_CHART,
  RESET_SETTING,
  REMOVE_INDEX_CHART
} from "./actionTypes";

const INIT_STATE = {
  user: {},
  users: [],
  newChart: []
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
    case ADD_NEW_CHART:

      return {
        ...state,
        newChart: [...state.newChart, action.payload]
      }
    case RESET_SETTING:

      return {
        ...state,
        newChart: []
      }
    case REMOVE_INDEX_CHART:
      state.newChart.splice(action.payload, 1);
      return {
        ...state
      }
    default:
      return state;
  }
};

export default User;
