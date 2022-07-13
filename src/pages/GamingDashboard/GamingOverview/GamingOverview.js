import React from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";

import StatisticsCard from './StatisticsCard';
import SubscribersCard from './SubscribersCard';
import TopTrafficChainCard from './TopTrafficChainCard';
import TopTrafficSourcesCard from './TopTrafficSourcesCard';
import UserRetentionCard from './UserRetentionCard';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 3, h: 1.5 },
    { i: "b", x: 3, y: 0, w: 3, h: 1.5 },
    { i: "c", x: 6, y: 0, w: 3, h: 1.5 },
    { i: "d", x: 9, y: 0, w: 3, h: 1.5 },
    { i: "e", x: 0, y: 1.5, w: 9, h: 4 },
    { i: "f", x: 9, y: 1.5, w: 3, h: 4 },
    { i: "g", x: 0, y: 5.5, w: 9, h: 4 },
    { i: "h", x: 9, y: 5.5, w: 3, h: 4 },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 6, h: 1.5 },
    { i: "b", x: 6, y: 0, w: 6, h: 1.5 },
    { i: "c", x: 0, y: 0, w: 6, h: 1.5 },
    { i: "d", x: 6, y: 0, w: 6, h: 1.5 },
    { i: "e", x: 0, y: 1.5, w: 12, h: 4 },
    { i: "f", x: 0, y: 5.5, w: 6, h: 4 },
    { i: "g", x: 6, y: 5.5, w: 6, h: 4 },
    { i: "h", x: 0, y: 9.5, w: 12, h: 4 },
  ],
}

export default function GamingOverview() {
  return (
    <>
      <p className="my-4 fs-2 text-white">You are 10% ahead of your goals!</p>
      <ResponsiveGridLayout
        className="gaming-overview"
        breakpoints={{ lg: 1200, md: 996 }}
        cols={{ lg: 12, md: 12 }}
        layouts={layouts}
        margin={{ lg: [32, 32], md: [24, 24] }}
        containerPadding={[0, 0]}
      >
        <div key="a">
          <StatisticsCard
            title="Visitors Today"
            description="some sort of analysis there to give context"
            value={1351515}
            change={-1}
          />
        </div>
        <div key="b">
          <StatisticsCard
            title="Daily Active Users"
            description="some sort of analysis there to give context"
            value={1351515}
            change={5}
          />
        </div>
        <div key="c">
          <StatisticsCard
            title="Total Sales"
            description="some sort of analysis there to give context"
            value={1351515}
            change={2}
          />
        </div>
        <div key="d">
          <StatisticsCard
            title="ARP DAU"
            description="some sort of analysis there to give context"
            value={1351515}
            change={25}
          />
        </div>
        <div key="e">
          <SubscribersCard />
        </div>
        <div key="f">
          <TopTrafficSourcesCard />
        </div>
        <div key="g">
          <UserRetentionCard />
        </div>
        <div key="h">
          <TopTrafficChainCard />
        </div>
      </ResponsiveGridLayout>
    </>
  )
}
