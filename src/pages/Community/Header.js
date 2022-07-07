import React from "react";
import { Row, Col, Button } from "reactstrap";

import searchImg from "./../../assets/images/Search.svg";

const explore = [
  "Explore",
  "Latest",
  "Most Popular",
  "Market Data",
  "On-Chain Analysis",
  "NFTS",
  "Exchange Activity",
];

export default function Header() {
  return (
    <div className="header">
      <h1>Best of Dashed</h1>
      <h3>
        Explore the best dashboards, charts, and analysis featured by our
        members
      </h3>
      <div className="explore">
        {explore.map((item, index) => (
          <Button key={index} outline color="white">
            {item}
          </Button>
        ))}
      </div>
      <div className="search">
        <img src={searchImg} />
        <input type={"text"} placeholder="Search all dashboards and charts" />
      </div>
    </div>
  );
}
