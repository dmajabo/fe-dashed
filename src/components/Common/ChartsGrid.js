import React, { useCallback, useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import ActionButtons from "./ChartActionButtons";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ChartsGrid = ({
  breakpoints = { xxl: 1400, xl: 1200, lg: 992, md: 768, sm: 576, xs: 0 },
  cols = { xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  containerPadding = [0, 24],
  elements: _elements = {},
  layouts: _layouts = {},
  margin = [18, 18],
  ratios = {},
  ...restProps
}) => {
  const [layouts, setLayouts] = useState(_layouts);
  const [elements, setElements] = useState(_elements);

  useEffect(() => {
    setLayouts(_layouts);
  }, [_layouts]);

  useEffect(() => {
    setElements(_elements);
  }, [_elements]);

  const removeItem = key => {
    setLayouts(prev => prev.reduce((res, item) => {
      const newItem = { ...item }
      delete newItem[key]
      return newItem
    }))
    setElements(prev => {
      const newElements = { ...prev }
      delete newElements[key]
      return newElements
    })
  };

  const handleResize = useCallback((l, oldLayoutItem, layoutItem, placeholder) => {
    const heightDiff = layoutItem.h - Math.max(oldLayoutItem.h, oldLayoutItem.minH || 0);
    const widthDiff = layoutItem.w - Math.max(oldLayoutItem.w, oldLayoutItem.minW || 0);
    const changeCoef = oldLayoutItem.w / oldLayoutItem.h;
    if (Math.abs(heightDiff) < Math.abs(widthDiff)) {
      layoutItem.h = layoutItem.w / changeCoef;
      placeholder.h = layoutItem.w / changeCoef;
    } else {
      layoutItem.w = layoutItem.h * changeCoef;
      placeholder.w = layoutItem.h * changeCoef;
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
          <ActionButtons onRemove={() => removeItem(key)} />
          {elements[key]}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default ChartsGrid;
