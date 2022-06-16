import * as React from "react";
import { CardBody, CardTitle, Col, Row } from "reactstrap";
import GaugeChart from "react-gauge-chart";

const RiskRating = () => {
  return (
    <CardBody>
      <CardTitle className="mb-4">Risk Rating</CardTitle>
      <GaugeChart nrOfLevels={1} />
    </CardBody>
  );
};

export default RiskRating;
