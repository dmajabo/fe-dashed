import React from "react";
import LineChart from "./charts/LineChart";

const Chart = props => {
  return (
    <div className="story-component-chart">
      <LineChart {...props} />
    </div>
  );
};

export default Chart;
