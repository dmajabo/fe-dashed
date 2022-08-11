import React from "react";

import ChartsGrid from "components/Common/ChartsGrid";
import StatisticsCard from "./StatisticsCard";
import SubscribersCard from "./SubscribersCard";
import TopTrafficChainCard from "./TopTrafficChainCard";
import TopTrafficSourcesCard from "./TopTrafficSourcesCard";
import UserRetentionCard from "./UserRetentionCard";

const layouts = {
  xxl: [
    { i: "a", x: 0, y: 0, w: 3, h: 7, isResizable: false },
    { i: "b", x: 3, y: 0, w: 3, h: 7, isResizable: false },
    { i: "c", x: 6, y: 0, w: 3, h: 7, isResizable: false },
    { i: "d", x: 9, y: 0, w: 3, h: 7, isResizable: false },
    { i: "e", x: 0, y: 7, w: 9, h: 21, minW: 6, minH: 14, maxW: 12, maxH: 28 },
    { i: "f", x: 9, y: 7, w: 3, h: 21, minW: 3, minH: 14, maxW: 3, maxH: 21 },
    { i: "g", x: 0, y: 28, w: 9, h: 24, minW: 6, minH: 14, maxW: 12, maxH: 21 },
    { i: "h", x: 9, y: 28, w: 3, h: 18, minW: 3, minH: 14, maxW: 4, maxH: 20 },
  ],
  lg: [
    { i: "a", x: 0, y: 0, w: 6, h: 7, isResizable: false },
    { i: "b", x: 6, y: 0, w: 6, h: 7, isResizable: false },
    { i: "c", x: 0, y: 7, w: 6, h: 7, isResizable: false },
    { i: "d", x: 6, y: 7, w: 6, h: 7, isResizable: false },
    { i: "e", x: 0, y: 14, w: 12, h: 21, minW: 6, minH: 11, maxW: 12, maxH: 25 },
    { i: "f", x: 0, y: 35, w: 6, h: 15, minW: 6, minH: 15, maxW: 6, maxH: 20 },
    { i: "g", x: 0, y: 50, w: 12, h: 20, minW: 6, minH: 11, maxW: 12, maxH: 25 },
    { i: "h", x: 6, y: 35, w: 6, h: 15, minW: 6, minH: 15, maxW: 12, maxH: 20 },
  ],
};
const elements = {
  a: (
    <StatisticsCard
      title="Players Today"
      description="Total number of players today."
      value={7353}
      change={-1}
    />
  ),
  b: (
    <StatisticsCard
      title="Daily Active Users"
      description="Number of users who play twice or more weekly."
      value={35620}
      change={5}
    />
  ),
  c: (
    <StatisticsCard
      title="Total Revenue"
      description="Total value of in-app purchases, NFTs, and DLC sold."
      value={1351515}
      change={2}
    />
  ),
  d: (
    <StatisticsCard
      title="ARP DAU"
      decimals={2}
      description="Average revenue per daily active user."
      value={35.76}
      change={25}
    />
  ),
  e: <SubscribersCard />,
  f: <TopTrafficSourcesCard />,
  g: <UserRetentionCard />,
  h: <TopTrafficChainCard />,
};

export default function GamingOverview() {
  return (
    <>
      <p className="mt-4 mb-0 fs-2 text-white">
        You are 10% ahead of your goals!
      </p>
      <ChartsGrid
        className="gaming-overview"
        draggableHandle=".btn-move"
        keepRatio={false}
        rowHeight={10}
        layouts={layouts}
        elements={elements}
      />
    </>
  );
}
