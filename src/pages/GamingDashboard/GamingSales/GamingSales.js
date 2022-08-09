import React from "react";

import ChartsGrid from "components/Common/ChartsGrid";
import AvgWalletBalanceVsSpending from "./AvgWalletBalanceVsSpending";
import EngagementScoreCard from "./EngagementScoreCard";
import NewPaidUsersCard from "./NewPaidUsersCard";
import RevenueByChainCard from "./RevenueByChainCard";
import RevenuePerChainCard from "./RevenuePerChainCard";
import TotalSalesByChainCard from "./TotalSalesByChainCard";

const layouts = {
  xxl: [
    { i: "a", x: 0, y: 0, w: 34, h: 15, minW: 3, minH: 3 },
    { i: "b", x: 34, y: 0, w: 80, h: 15, minW: 5, minH: 3 },
    { i: "c", x: 114, y: 0, w: 42, h: 15, minW: 3, minH: 3 },
    { i: "d", x: 0, y: 15, w: 58, h: 17, minW: 4, minH: 3 },
    { i: "e", x: 58, y: 15, w: 58, h: 17, minW: 4, minH: 3 },
    { i: "f", x: 116, y: 15, w: 40, h: 17, minW: 3, minH: 3 },
  ],
  lg: [
    { i: "a", x: 0, y: 0, w: 78, h: 15, minW: 5, minH: 3 },
    { i: "b", x: 0, y: 3, w: 156, h: 20, minW: 11, minH: 3 },
    { i: "c", x: 78, y: 0, w: 78, h: 15, minW: 5, minH: 3 },
    { i: "d", x: 0, y: 6, w: 156, h: 17, minW: 11, minH: 3 },
    { i: "e", x: 0, y: 9, w: 156, h: 17, minW: 11, minH: 3 },
    { i: "f", x: 0, y: 12, w: 78, h: 17, minW: 5, minH: 3 },
  ],
};

const elements = {
  a: <TotalSalesByChainCard />,
  b: <RevenueByChainCard />,
  c: <EngagementScoreCard />,
  d: <NewPaidUsersCard />,
  e: <AvgWalletBalanceVsSpending />,
  f: <RevenuePerChainCard />,
}

const ratios = {
  // key: width / height
  a: 34 / 45,
  b: 80 / 45,
  c: 42 / 45,
  d: 58 / 51,
  e: 58 / 51,
  f: 40 / 51,
}

export default function GamingSales() {
  return (
    <ChartsGrid
      className="gaming-overview"
      draggableHandle=".btn-move"
      cols={{ xxl: 156, xl: 156, lg: 156 }}
      elements={elements}
      layouts={layouts}
      ratios={ratios}
      rowHeight={10}
    />
  );
}
