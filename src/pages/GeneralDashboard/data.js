import React from "react";
import { Card } from "reactstrap";
import BTCCard from "./btc-card";
import BTCFundingRatesCard from "./BTCFundingRatesCard";
import BTCPerformance from "./BTCPerformance";
import LiveFundingRates from "./LiveFundingRates";
import RiskRatingCard from "./RiskRatingCard";

export const initialLayoutLarge = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 9,
    h: 16,
    minW: 6,
    minH: 16,
    content: () => (
      <Card>
        <BTCCard />
      </Card>
    ),
  },
  {
    i: "1",
    x: 10,
    y: 0,
    w: 3,
    h: 16,
    minW: 3,
    minH: 16,
    content: () => <RiskRatingCard />,
  },
  {
    i: "2",
    x: 0,
    y: 16,
    w: 6,
    h: 16,
    minW: 6,
    minH: 16,
    content: () => <BTCFundingRatesCard />,
  },
  {
    i: "3",
    x: 8,
    y: 16,
    w: 6,
    h: 16,
    minW: 6,
    minH: 16,
    content: () => <LiveFundingRates />,
  },
  {
    i: "4",
    x: 0,
    y: 32,
    w: 12,
    h: 18,
    minW: 6,
    minH: 18,
    content: () => <BTCPerformance />,
  },
];

export const initialLayoutMd = [
  { i: "0", x: 0, y: 0, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "1", x: 0, y: 16, w: 12, h: 12, minW: 6, minH: 12 },
  { i: "2", x: 0, y: 28, w: 12, h: 16, minW: 6, minH: 16 },
  { i: "3", x: 0, y: 34, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "4", x: 0, y: 50, w: 12, h: 16, minW: 12, minH: 16 },
];
