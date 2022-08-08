import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG, ADD_PROFILE_DASHBOARD } from "./actionTypes"

const initialState = {
  error: "",
  success: "",
  dashboards: [],
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state }
      break
    case PROFILE_SUCCESS:
      state = { ...state, success: action.payload }
      break
    case PROFILE_ERROR:
      state = { ...state, error: action.payload }
      break
    case RESET_PROFILE_FLAG:
      state = { ...state, success: null }
      break
    case ADD_PROFILE_DASHBOARD:
      state = { ...state, dashboards: [...state.dashboards, action.payload] }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default profile
