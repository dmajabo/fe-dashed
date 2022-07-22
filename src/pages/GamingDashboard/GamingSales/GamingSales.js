import React from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";

import AvgWalletBalanceVsSpending from './AvgWalletBalanceVsSpending';
import EngagementScoreCard from './EngagementScoreCard';
import NewPaidUsersCard from './NewPaidUsersCard';
import RevenueByChainCard from './RevenueByChainCard';
import RevenuePerChainCard from './RevenuePerChainCard';
import TotalSalesByChainCard from './TotalSalesByChainCard';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 3, h: 3 },
    { i: "b", x: 3, y: 0, w: 5, h: 3 },
    { i: "c", x: 8, y: 0, w: 3, h: 3 },
    { i: "d", x: 0, y: 3, w: 4, h: 3 },
    { i: "e", x: 4, y: 3, w: 4, h: 3 },
    { i: "f", x: 8, y: 3, w: 3, h: 3 },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 6, h: 3 },
    { i: "b", x: 0, y: 3, w: 11, h: 3 },
    { i: "c", x: 6, y: 0, w: 5, h: 3 },
    { i: "d", x: 0, y: 6, w: 11, h: 3 },
    { i: "e", x: 0, y: 9, w: 11, h: 3 },
    { i: "f", x: 0, y: 12, w: 11, h: 3 },
  ],
}

export default function GamingSales() {
  return (
    <ResponsiveGridLayout
      className="gaming-overview"
      breakpoints={{ lg: 1200, md: 996 }}
      cols={{ lg: 11, md: 11 }}
      layouts={layouts}
      margin={{ lg: [32, 32], md: [24, 24] }}
      containerPadding={[0, 24]}
    >
      <div key="a">
        <TotalSalesByChainCard />
      </div>
      <div key="b">
        <RevenueByChainCard />
      </div>
      <div key="c">
        <EngagementScoreCard />
      </div>
      <div key="d">
        <NewPaidUsersCard />
      </div>
      <div key="e">
        <AvgWalletBalanceVsSpending />
      </div>
      <div key="f">
        <RevenuePerChainCard />
      </div>
    </ResponsiveGridLayout>
  )
}
