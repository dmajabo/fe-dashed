import React, { useCallback } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import ActionButtons from "./ChartActionButtons";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ChartsGrid = ({
  breakpoints = { xxl: 1400, xl: 1120, lg: 992, md: 768, sm: 576, xs: 0 },
  cols = { xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  containerPadding = [0, 24],
  elements = {},
  keepRatio = true,
  layouts = {},
  margin = [18, 18],
  onRemove = () => {},
  ...restProps
}) => {

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

  return (
    <ResponsiveGridLayout
      breakpoints={breakpoints}
      cols={cols}
      containerPadding={containerPadding}
      layouts={layouts}
      margin={margin}
      onResize={handleResize}
      {...restProps}
    >
      {Object.keys(elements).map(key => (
        <div key={key}>
          <ActionButtons onRemove={() => onRemove(key)} />
          {elements[key]}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default ChartsGrid;
