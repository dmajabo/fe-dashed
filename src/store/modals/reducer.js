// @flow
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CLOSE_ALL_MODALS,
} from "./actionTypes";

const INIT_STATE = {
  data: {},
  isStoryFlow: false,
};

const getModalStateName = (name) => {
  switch (name) {
    case 'storyFlow':
      return 'isStoryFlow';
  }
}

const Modals = (state = INIT_STATE, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [getModalStateName(action.payload)]: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        [getModalStateName(action.payload)]: false,
      };
    case CLOSE_ALL_MODALS:
      return {
        ...state,
        ...INIT_STATE
      };
    default:
      return state;
  }
};

export default Modals;
