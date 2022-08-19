import React, { useState, useEffect } from "react";
import { ResponsiveBump } from "@nivo/bump";

const data = [
  {
    id: "Serie 1",
    name: "Ethereum",
    slug: "ethereum",
    code: "ETH",
    color: "#5A3FFF",
    data: [
      {
        x: 2000,
        y: 1,
      },
      {
        x: 2001,
        y: 2,
      },
      {
        x: 2002,
        y: 2,
      },
      {
        x: 2003,
        y: 1,
      },
      {
        x: 2004,
        y: 1,
      },
    ],
  },
  {
    id: "Serie 2",
    name: "Algorand",
    slug: "algorand",
    code: "ALGO",
    color: "#AFF1FF",
    data: [
      {
        x: 2000,
        y: 2,
      },
      {
        x: 2001,
        y: 3,
      },
      {
        x: 2002,
        y: 4,
      },
      {
        x: 2003,
        y: 2,
      },
      {
        x: 2004,
        y: 3,
      },
    ],
  },
  {
    id: "Serie 3",
    name: "Solana",
    slug: "solana",
    code: "SOL",
    color: "#35D28A",
    data: [
      {
        x: 2000,
        y: 3,
      },
      {
        x: 2001,
        y: 1,
      },
      {
        x: 2002,
        y: 1,
      },
      {
        x: 2003,
        y: 3,
      },
      {
        x: 2004,
        y: 4,
      },
    ],
  },
  {
    id: "Serie 4",
    name: "Cosmos Hub",
    slug: "cosmos",
    code: "ATOM",
    color: "#9BF543",
    data: [
      {
        x: 2000,
        y: 4,
      },
      {
        x: 2001,
        y: 4,
      },
      {
        x: 2002,
        y: 3,
      },
      {
        x: 2003,
        y: 5,
      },
      {
        x: 2004,
        y: 2,
      },
    ],
  },
  {
    id: "Serie 5",
    name: "Polygon",
    slug: "matic-network",
    code: "MATIC",
    color: "#FFE920",
    data: [
      {
        x: 2000,
        y: 5,
      },
      {
        x: 2001,
        y: 6,
      },
      {
        x: 2002,
        y: 5,
      },
      {
        x: 2003,
        y: 6,
      },
      {
        x: 2004,
        y: 5,
      },
    ],
  },
  {
    id: "Serie 6",
    name: "Stellar",
    slug: "stellar",
    code: "XLM",
    color: "#43F5A3",
    data: [
      {
        x: 2000,
        y: 6,
      },
      {
        x: 2001,
        y: 7,
      },
      {
        x: 2002,
        y: 7,
      },
      {
        x: 2003,
        y: 8,
      },
      {
        x: 2004,
        y: 9,
      },
    ],
  },
  {
    id: "Serie 7",
    name: "NEAR Protocol",
    slug: "near",
    code: "NEAR",
    color: "#DB9133",
    data: [
      {
        x: 2000,
        y: 7,
      },
      {
        x: 2001,
        y: 5,
      },
      {
        x: 2002,
        y: 6,
      },
      {
        x: 2003,
        y: 7,
      },
      {
        x: 2004,
        y: 7,
      },
    ],
  },
  {
    id: "Serie 8",
    name: "Avalanche",
    slug: "avalanche-2",
    code: "AVAX",
    color: "#DB531A",
    data: [
      {
        x: 2000,
        y: 8,
      },
      {
        x: 2001,
        y: 8,
      },
      {
        x: 2002,
        y: 8,
      },
      {
        x: 2003,
        y: 4,
      },
      {
        x: 2004,
        y: 8,
      },
    ],
  },
  {
    id: "Serie 9",
    name: "Polkadot",
    slug: "polkadot",
    code: "DOT",
    color: "#C31322",
    data: [
      {
        x: 2000,
        y: 9,
      },
      {
        x: 2001,
        y: 10,
      },
      {
        x: 2002,
        y: 9,
      },
      {
        x: 2003,
        y: 10,
      },
      {
        x: 2004,
        y: 6,
      },
    ],
  },
  {
    id: "Serie 10",
    name: "Cardano",
    slug: "cardano",
    code: "ADA",
    color: "#FF4869",
    data: [
      {
        x: 2000,
        y: 10,
      },
      {
        x: 2001,
        y: 9,
      },
      {
        x: 2002,
        y: 10,
      },
      {
        x: 2003,
        y: 9,
      },
      {
        x: 2004,
        y: 10,
      },
    ],
  },
];

const CustomPoint = ({ point }) => {
  console.log("xxxx", point);
  return (
    <g
      transform={`translate(${point.x}, ${point.y})`}
      style={{ pointerEvents: "none" }}
    >
      <rect
        x={point.borderWidth * -0.5}
        y={point.size * -0.5}
        width={point.borderWidth}
        height={point.size}
        rx={point.borderWidth * 0.5}
        fill={point.borderColor}
        // stroke={point.borderColor}
        // strokeWidth={point.borderWidth}
      />
    </g>
  );
};

const MyResponsiveBump = () => (
  <ResponsiveBump
    width={531}
    height={295}
    data={data}
    pointComponent={CustomPoint}
    xOuterPadding={0}
    colors={data.map(category => category.color)}
    lineWidth={14}
    activeLineWidth={14}
    inactiveLineWidth={14}
    inactiveOpacity={0.1}
    pointSize={18}
    activePointSize={18}
    inactivePointSize={18}
    pointColor={{ theme: "background" }}
    pointBorderWidth={4}
    activePointBorderWidth={4}
    inactivePointBorderWidth={4}
    pointBorderColor={{ from: "serie.color" }}
    enableGridY={false}
    enableGridX={false}
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -36,
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "ranking",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
    axisRight={null}
  />
);

export default MyResponsiveBump;
