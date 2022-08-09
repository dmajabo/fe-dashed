import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import ActionButtons from "./ChartActionButtons";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ChartsGrid = ({ layouts: _layouts, ...restProps }) => {
  const [layouts, setlayouts] = useState(_layouts);

  useEffect(() => {
    setlayouts(_layouts);
  }, [_layouts]);

  const removeItem = id => {
    setlayouts({
      lg: layouts.lg.filter(layout => layout.i !== id),
      md: layouts.md.filter(layout => layout.i !== id),
    });
  };

  return (
    <ResponsiveGridLayout
      breakpoints={{ lg: 1200, md: 996 }}
      cols={{ lg: 12, md: 12 }}
      layouts={layouts}
      margin={{ lg: [32, 32], md: [24, 24] }}
      containerPadding={[0, 24]}
      {...restProps}
    >
      {layouts.lg.map(({ i, content: Content }) => (
        <div key={i}>
          <ActionButtons onRemove={() => removeItem(i)} />
          <Content />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default ChartsGrid;
