import React from "react";

import ChartsGrid from "components/Common/ChartsGrid";
import StatisticsCard from "./StatisticsCard";
import SubscribersCard from "./SubscribersCard";
import TopTrafficChainCard from "./TopTrafficChainCard";
import TopTrafficSourcesCard from "./TopTrafficSourcesCard";
import UserRetentionCard from "./UserRetentionCard";

const layouts = {
  lg: [
    {
      i: "a",
      x: 0,
      y: 0,
      w: 3,
      h: 1.5,
      content: () => (
        <StatisticsCard
          title="Visitors Today"
          description="some sort of analysis there to give context"
          value={1351515}
          change={-1}
        />
      ),
    },
    {
      i: "b",
      x: 3,
      y: 0,
      w: 3,
      h: 1.5,
      content: () => (
        <StatisticsCard
          title="Daily Active Users"
          description="some sort of analysis there to give context"
          value={1351515}
          change={5}
        />
      ),
    },
    {
      i: "c",
      x: 6,
      y: 0,
      w: 3,
      h: 1.5,
      content: () => (
        <StatisticsCard
          title="Total Sales"
          description="some sort of analysis there to give context"
          value={1351515}
          change={2}
        />
      ),
    },
    {
      i: "d",
      x: 9,
      y: 0,
      w: 3,
      h: 1.5,
      content: () => (
        <StatisticsCard
          title="ARP DAU"
          description="some sort of analysis there to give context"
          value={1351515}
          change={25}
        />
      ),
    },
    { i: "e", x: 0, y: 1.5, w: 9, h: 4, content: () => <SubscribersCard /> },
    {
      i: "f",
      x: 9,
      y: 1.5,
      w: 3,
      h: 4,
      content: () => <TopTrafficSourcesCard />,
    },
    { i: "g", x: 0, y: 5.5, w: 9, h: 4, content: () => <UserRetentionCard /> },
    {
      i: "h",
      x: 9,
      y: 5.5,
      w: 3,
      h: 4,
      content: () => <TopTrafficChainCard />,
    },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 6, h: 1.5 },
    { i: "b", x: 6, y: 0, w: 6, h: 1.5 },
    { i: "c", x: 0, y: 0, w: 6, h: 1.5 },
    { i: "d", x: 6, y: 0, w: 6, h: 1.5 },
    { i: "e", x: 0, y: 1.5, w: 12, h: 4 },
    { i: "f", x: 0, y: 5.5, w: 6, h: 4 },
    { i: "g", x: 0, y: 9.5, w: 12, h: 4 },
    { i: "h", x: 6, y: 5.5, w: 6, h: 4 },
  ],
};

export default function GamingOverview() {
  return (
    <>
      <p className="mt-4 mb-0 fs-2 text-white">
        You are 10% ahead of your goals!
      </p>
      <ChartsGrid className="gaming-overview" layouts={layouts} />
    </>
  );
}
