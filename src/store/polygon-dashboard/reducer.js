// @flow
import {
  initialLayoutLarge,
  initialLayoutMd,
} from "pages/Polygon-Dashboard/data";
import {
  ADD_NEW_CHART,
  REMOVE_CHART_BY_INDEX,
  RESET_CHART,
} from "./actionTypes";

const INIT_STATE = {
  layoutLarge: initialLayoutLarge,
  layoutMd: initialLayoutMd,
};

const PolygonChartSetting = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_CHART:
      const newLayoutLarge = state.layoutLarge.map(item =>
        item.content ? item : action.payload.xxl
      );
      const newLayoutMd = state.layoutMd.map(item =>
        item.content ? item : action.payload.lg
      );
      // const newLayoutLarge = state.layoutLarge.filter(item => item.content);
      // newLayoutLarge.splice(
      //   state.layoutLarge.length - 1,
      //   0,
      //   action.payload.xxl,
      // );

      // const newLayoutMd = state.layoutMd;
      // newLayoutMd.splice(state.layoutMd.length - 1, 0, action.payload.lg);

      return {
        ...state,
        layoutLarge: newLayoutLarge,
        layoutMd: newLayoutMd,
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

export default PolygonChartSetting;
