import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useSelector } from "react-redux"

import ChartsGrid from "components/Common/ChartsGrid";
import AvgWalletBalanceVsSpending from "./AvgWalletBalanceVsSpending";
import EngagementScoreCard from "./EngagementScoreCard";
import NewPaidUsersCard from "./NewPaidUsersCard";
import RevenueByChainCard from "./RevenueByChainCard";
import RevenuePerChainCard from "./RevenuePerChainCard";
import TotalSalesByChainCard from "./TotalSalesByChainCard";

const initialLayouts = {
  xxl: [
    { i: "a", x: 0, y: 0, w: 3, h: 15, minW: 3, minH: 15, maxW: 4, maxH: 15, },
    { i: "b", x: 3, y: 0, w: 5, h: 15, minW: 5, minH: 15, maxW: 12, maxH: 25 },
    { i: "c", x: 8, y: 0, w: 4, h: 15, minW: 4, minH: 15, maxW: 4, maxH: 15 },
    { i: "d", x: 0, y: 15, w: 4, h: 18, minW: 4, minH: 18, maxW: 8, maxH: 25, },
    { i: "e", x: 4, y: 15, w: 4, h: 18, minW: 4, minH: 18, maxW: 8, maxH: 25, },
    { i: "f", x: 8, y: 15, w: 4, h: 18, minW: 4, minH: 18, maxW: 8, maxH: 25, },
  ],
  lg: [
    { i: "a", x: 0, y: 0, w: 6, h: 15, isResizable: false },
    { i: "b", x: 0, y: 15, w: 12, h: 20, minW: 6, minH: 15, maxW: 12, maxH: 25 },
    { i: "c", x: 6, y: 0, w: 6, h: 15, isResizable: false },
    { i: "d", x: 0, y: 35, w: 12, h: 18, minW: 6, minH: 15, maxW: 12, maxH: 25 },
    { i: "e", x: 0, y: 53, w: 12, h: 18, minW: 6, minH: 15, maxW: 12, maxH: 25 },
    { i: "f", x: 0, y: 71, w: 6, h: 18, minW: 6, minH: 15, maxW: 12, maxH: 25 },
  ],
};

const _elements = {
  a: <TotalSalesByChainCard />,
  b: <RevenueByChainCard />,
  c: <EngagementScoreCard />,
  d: <NewPaidUsersCard />,
  e: <AvgWalletBalanceVsSpending />,
  f: <RevenuePerChainCard />,
}

function GamingSales(props, ref) {
  const [layouts, setLayouts] = useState(initialLayouts);
  const [elements, setElements] = useState(_elements);
  const [remount, setRemount] = useState(0);
  const newChart = useSelector(state => state.User.newChart)

  useEffect(()=> {
    if (Object.keys(elements).length !== Object.keys(_elements).length) {
      setRemount(remount+1);
      setLayouts(initialLayouts);
      setElements(_elements)
    }
  }, [newChart])

  useImperativeHandle(ref, () => ({
    reset: () => {
      setLayouts(initialLayouts);
      setElements(_elements);
    },
    addItem: (element) => {
      const key = String.fromCharCode(97 + elements.length)
      const lastXxlItem = layouts.xxl[layouts.xxl.length - 1]
      const lastLgItem = layouts.lg[layouts.lg.length - 1]
      setLayouts({
        xxl: [...layouts.xxl, { i: key, x: 8, y: lastXxlItem.y + lastXxlItem.h, w: 6, h: 18, minW: 6, minH: 15, maxW: 12, maxH: 25 }],
        lg: [...layouts.xxl, { i: key, x: 8, y: lastLgItem.y + lastLgItem.h, w: 6, h: 18, minW: 6, minH: 15, maxW: 12, maxH: 25 }],
      })
      setElements({ ...elements, [key]: element });
    }
  }));

  const handleRemove = key => {
    setLayouts({
      xxl: layouts.xxl.filter(item => item.key !== key),
      lg: layouts.lg.filter(item => item.key !== key),
    })
    setElements(prev => {
      const newElements = { ...prev }
      delete newElements[key]
      return newElements
    })
  };

  return (
    <div key={remount}>
      <ChartsGrid
        className="gaming-overview"
        draggableHandle=".btn-move"
        // cols={{ xxl: 156, xl: 156, lg: 156, md: 156, sm: 156 }}
        elements={elements}
        keepRatio={false}
        layouts={layouts}
        onRemove={handleRemove}
        rowHeight={10}
      />
    </div>
  );
}

export default forwardRef(GamingSales)
