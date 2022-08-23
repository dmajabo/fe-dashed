// @flow
import {
  initialContents,
  initialLayoutLarge,
  initialLayoutLg,
  initialLayoutMd,
  initialLayoutXl,
  initialLayoutXxl,
  initialLayoutXxxl,
} from "pages/GeneralDashboard/data";
import {
  ADD_NEW_CHART,
  REMOVE_CHART_BY_INDEX,
  RESET_CHART,
} from "./actionTypes";

const INIT_STATE = {
  contents: initialContents,
  layoutXxxl: initialLayoutXxxl,
  layoutXxl: initialLayoutXxl,
  layoutXl: initialLayoutXl,
  layoutLg: initialLayoutLg,
  layoutMd: initialLayoutMd,
};

const GeneralChartSetting = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_CHART:
      return {
        ...state,
        contents: [...state.contents, action.payload.content],
        layoutXxxl: [...state.layoutXxxl, action.payload.xxxl],
        layoutXxl: [...state.layoutXxl, action.payload.xxl],
        layoutXl: [...state.layoutXl, action.payload.xl],
        layoutLg: [...state.layoutLg, action.payload.lg],
        layoutMd: [...state.layoutMd, action.payload.md],
      };

    case REMOVE_CHART_BY_INDEX:
      const index = action.payload;
      const contents = state.contents.filter(({ i }) => i !== index);
      const layoutXxxl = state.layoutXxxl.filter(({ i }) => i !== index);
      const layoutXxl = state.layoutXxl.filter(({ i }) => i !== index);
      const layoutXl = state.layoutXl.filter(({ i }) => i !== index);
      const layoutLg = state.layoutLg.filter(({ i }) => i !== index);
      const layoutMd = state.layoutMd.filter(({ i }) => i !== index);
      return {
        ...state,
        contents,
        layoutXxxl,
        layoutXxl,
        layoutXl,
        layoutLg,
        layoutMd,
      };
    case RESET_CHART:
      return {
        ...state,
        contents: initialContents,
        layoutXxxl: initialLayoutXxxl,
        layoutXxl: initialLayoutXxl,
        layoutXl: initialLayoutXl,
        layoutLg: initialLayoutLg,
        layoutMd: initialLayoutMd,
      };
    default:
      return state;
  }
};

export default GeneralChartSetting;
