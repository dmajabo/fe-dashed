import React from "react";

import ChartsGrid from "components/Common/ChartsGrid";
import AvgWalletBalanceVsSpending from "./AvgWalletBalanceVsSpending";
import EngagementScoreCard from "./EngagementScoreCard";
import NewPaidUsersCard from "./NewPaidUsersCard";
import RevenueByChainCard from "./RevenueByChainCard";
import RevenuePerChainCard from "./RevenuePerChainCard";
import TotalSalesByChainCard from "./TotalSalesByChainCard";

const layouts = {
  lg: [
    {
      i: "a",
      x: 0,
      y: 0,
      w: 3,
      h: 3,
      minW: 3,
      minH: 3,
      content: () => <TotalSalesByChainCard />,
    },
    {
      i: "b",
      x: 3,
      y: 0,
      w: 5,
      h: 3,
      minW: 5,
      minH: 3,
      content: () => <RevenueByChainCard />,
    },
    { i: "c", x: 8, y: 0, w: 3, h: 3, minW: 3, minH: 3, content: () => <EngagementScoreCard /> },
    { i: "d", x: 0, y: 3, w: 4, h: 3, minW: 4, minH: 3, content: () => <NewPaidUsersCard /> },
    {
      i: "e",
      x: 4,
      y: 3,
      w: 4,
      h: 3,
      minW: 4,
      minH: 3,
      content: () => <AvgWalletBalanceVsSpending />,
    },
    { i: "f", x: 8, y: 3, w: 3, h: 3, minW: 3, minH: 3, content: () => <RevenuePerChainCard /> },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 6, h: 3, minW: 5, minH: 3 },
    { i: "b", x: 0, y: 3, w: 11, h: 3, minW: 11, minH: 3 },
    { i: "c", x: 6, y: 0, w: 5, h: 3, minW: 5, minH: 3 },
    { i: "d", x: 0, y: 6, w: 11, h: 3, minW: 11, minH: 3 },
    { i: "e", x: 0, y: 9, w: 11, h: 3, minW: 11, minH: 3 },
    { i: "f", x: 0, y: 12, w: 11, h: 3, minW: 5, minH: 3 },
  ],
};

export default function GamingSales() {
  return (
    <ChartsGrid
      className="gaming-overview"
      draggableHandle=".btn-move"
      cols={{ lg: 11, md: 11 }}
      layouts={layouts}
    />
  );
}
