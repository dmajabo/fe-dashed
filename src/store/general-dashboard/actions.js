import {
  ADD_NEW_CHART,
  REMOVE_CHART_BY_INDEX,
  RESET_CHART  
} from "./actionTypes";

const actions = {
  addChart: data => ({
    type: ADD_NEW_CHART,
    payload: data,
  }),
  removeChartByIndex: data => ({
    type: REMOVE_CHART_BY_INDEX,
    payload: data,
  }),
  resetChart: data => ({
    type: RESET_CHART,
    payload: data,
  })
}

export const addChart = (chart) => (dispatch) => {
  dispatch(actions.addChart(chart));
};

export const removeChartByIndex = (index) => (dispatch) => {
  dispatch(actions.removeChartByIndex(index));
};

export const resetChart = () => (dispatch) => {
  dispatch(actions.addChart([]));
};
