import React from "react";
import { Card } from "reactstrap";
import BTCCard from "./btc-card";
import BTCFundingRatesCard from "./BTCFundingRatesCard";
import BTCPerformance from "./BTCPerformance";
import LiveFundingRates from "./LiveFundingRates";
import RiskRatingCard from "./RiskRatingCard";

export const initialContents = [
  {
    i: "0",
    content: () => (
      <Card>
        <BTCCard />
      </Card>
    ),
  },
  {
    i: "1",
    content: () => <RiskRatingCard />,
  },
  {
    i: "2",
    content: () => <BTCFundingRatesCard />,
  },
  {
    i: "3",
    content: () => <LiveFundingRates />,
  },
  {
    i: "4",
    content: () => <BTCPerformance />,
  },
];

export const initialLayout = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 9,
    h: 16,
    minW: 6,
    minH: 16,
  },
  {
    i: "1",
    x: 10,
    y: 0,
    w: 3,
    h: 16,
    minW: 3,
    minH: 16,
  },
  {
    i: "2",
    x: 0,
    y: 16,
    w: 6,
    h: 16,
    minW: 6,
    minH: 16,
  },
  {
    i: "3",
    x: 8,
    y: 16,
    w: 6,
    h: 16,
    minW: 6,
    minH: 16,
  },
];

export const initialLayoutXxxl = [
  ...initialLayout,
  {
    i: "4",
    x: 0,
    y: 32,
    w: 12,
    h: 25,
    minW: 6,
    minH: 20,
  },
];

export const initialLayoutXxl = [
  ...initialLayout,
  {
    i: "4",
    x: 0,
    y: 32,
    w: 12,
    h: 20,
    minW: 6,
    minH: 16,
  },
];

export const initialLayoutXl = [
  ...initialLayout,
  {
    i: "4",
    x: 0,
    y: 32,
    w: 12,
    h: 16,
    minW: 6,
    minH: 16,
  },
];

export const initialLayoutSmall = [
  { i: "0", x: 0, y: 0, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "1", x: 0, y: 16, w: 12, h: 12, minW: 6, minH: 12 },
  { i: "2", x: 0, y: 28, w: 12, h: 16, minW: 6, minH: 16 },
  { i: "3", x: 0, y: 34, w: 12, h: 16, minW: 12, minH: 16 },
];

export const initialLayoutLg = [
  ...initialLayoutSmall,
  { i: "4", x: 0, y: 50, w: 12, h: 14, minW: 12, minH: 14 },
];

export const initialLayoutMd = [
  ...initialLayoutSmall,
  { i: "4", x: 0, y: 50, w: 12, h: 12, minW: 12, minH: 12 },
];
