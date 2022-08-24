import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import PolygonTransactions from "./polygonTransactions";
import RaceChart from "./barracechart";

export const initialLayoutLarge = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 12,
    h: 3.55,
    isResizable: false,
    content: () => (
      <Card>
        <CardBody>
          <CardTitle className="mb-4">
            Polygon Performance (ROI Monthly)
          </CardTitle>
          <RaceChart />
        </CardBody>
      </Card>
    ),
  },
  {
    i: "1",
    x: 0,
    y: 5,
    w: 6,
    h: 4,
    minW: 6,
    minH: 4,
    content: () => (
      <Card>
        <CardBody className="d-flex flex-column">
          <CardTitle className="mb-4">
            <img
              src="/coin_icons/MATIC.png"
              width={32}
              height={32}
              className="me-2"
            />
            Number of Active Addresses + Transactions
          </CardTitle>
          <PolygonTransactions />
        </CardBody>
      </Card>
    ),
  },
  {
    i: "2",
    x: 7,
    y: 5,
    w: 6,
    h: 4,
    minW: 6,
    minH: 4,
    content: null,
  },
];

export const initialLayoutMd = [
  { i: "0", x: 0, y: 0, w: 12, h: 3.55, isResizable: false },
  { i: "1", x: 0, y: 16, w: 12, h: 3, minW: 6, minH: 3 },
  { i: "2", x: 0, y: 28, w: 12, h: 3, minW: 6, minH: 3 },
];
