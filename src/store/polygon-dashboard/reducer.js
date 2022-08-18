// @flow
import {
  ADD_NEW_CHART,
  REMOVE_CHART_BY_INDEX,
  RESET_CHART 
} from "./actionTypes";

const INIT_STATE = {
  charts: []
};

const PolygonChartSetting = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_CHART:
      return {
        ...state,
        charts: [...state.charts, action.payload]
      };
    case REMOVE_CHART_BY_INDEX:
      state.charts.splice(index, 1); 
      return {
        ...state
      };
    case RESET_CHART:
      return {
        ...state,
        charts: []
      };
    default:
      return state;
  }
};

export default PolygonChartSetting;
