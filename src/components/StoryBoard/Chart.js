import React, { useState, useEffect } from "react";
import LineChart from "./charts/LineChart";
import {
  getCoinMarketPriceApi,
} from "components/StoryBoard/charts/LineChart";

const Chart = props => {

  const [chartData, setChartData] = useState()

  useEffect(() => {
    const getChartData = async (props) => {
      const data = await getCoinMarketPriceApi({ ...props });

      setChartData(data)
    };
    getChartData(props)
  }, [props])

  return (
    <div className="story-component-chart">
      <LineChart {...props} chartData={chartData} />
    </div>
  );
};

export default Chart;
