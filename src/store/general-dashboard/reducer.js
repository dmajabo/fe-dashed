// @flow
import {
  initialLayoutLarge,
  initialLayoutMd,
} from "pages/GeneralDashboard/data";
import {
  ADD_NEW_CHART,
  REMOVE_CHART_BY_INDEX,
  RESET_CHART,
} from "./actionTypes";

const INIT_STATE = {
  layoutLarge: initialLayoutLarge,
  layoutMd: initialLayoutMd,
};

const GeneralChartSetting = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_CHART:
      return {
        ...state,
        layoutLarge: [...state.layoutLarge, action.payload.xxl],
        layoutMd: [...state.layoutMd, action.payload.lg],
      };

    case REMOVE_CHART_BY_INDEX:
      const layoutLarge = state.layoutLarge.filter(
        ({ i }) => i !== action.payload
      );
      const layoutMd = state.layoutMd.filter(({ i }) => i !== action.payload);
      return {
        ...state,
        layoutLarge,
        layoutMd,
      };
    case RESET_CHART:
      return {
        ...state,
        layoutLarge: initialLayoutLarge,
        layoutMd: initialLayoutMd,
      };
    default:
      return state;
  }
};

export default GeneralChartSetting;
