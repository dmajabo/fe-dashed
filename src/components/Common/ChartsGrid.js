import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Responsive, WidthProvider } from "react-grid-layout";
import { removeIndexChart } from "../../store/user/actions"

// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
import ActionButtons from "./ChartActionButtons";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ChartsGrid = ({
  breakpoints = { xxl: 1400, xl: 1120, lg: 992, md: 768, sm: 576, xs: 0 },
  cols = { xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  containerPadding = [0, 0],
  elements = {},
  keepRatio = true,
  layouts = {},
  margin = [18, 18],
  onRemove = () => {},
  ...restProps
}) => {
  const dispatch = useDispatch();
  const newChart = useSelector(state => state.User.newChart);

  const handleResize = useCallback((l, oldLayoutItem, layoutItem, placeholder) => {
    if (keepRatio) {
      const heightDiff = Math.min(layoutItem.h - Math.max(oldLayoutItem.h, layoutItem.minH || 0), layoutItem.maxH || Infinity);
      const widthDiff = Math.min(layoutItem.w - Math.max(oldLayoutItem.w, layoutItem.minW || 0), layoutItem.maxW || Infinity);
      const changeCoef = oldLayoutItem.w / oldLayoutItem.h;
      if (Math.abs(heightDiff) < Math.abs(widthDiff)) {
        layoutItem.h = layoutItem.w / changeCoef;
        placeholder.h = layoutItem.w / changeCoef;
      } else {
        layoutItem.w = layoutItem.h * changeCoef;
        placeholder.w = layoutItem.h * changeCoef;
      }
    }
  }, []);

  const getLayouts = () => {
    return {
      ...layouts,
      xxl: [...layouts.xxl,newChart.map((nc) => nc.xxl)].flat(),
      lg: [...layouts.lg,newChart.map((nc) => nc.lg)].flat()
    }
  }

  const onRemoveChart = (index) => {
    dispatch(removeIndexChart(index));
  }

  return (
    <ResponsiveGridLayout
      breakpoints={breakpoints}
      cols={cols}
      containerPadding={containerPadding}
      layouts={getLayouts()}
      margin={margin}
      onResize={handleResize}
      autoSize
      {...restProps}
    >
      {Object.keys(elements).map(key => (
        <div key={key}>
          <ActionButtons onRemove={() => onRemove(key)} />
          {elements[key]}
        </div>
      ))}
      {newChart.map(({ xxl, content: Content }, index) => (
        <div key={xxl.i}>
          <ActionButtons onRemove={() => onRemoveChart(index)} />
          <Content />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default ChartsGrid;
