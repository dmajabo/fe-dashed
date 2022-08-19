import React, { useState, useEffect } from "react";
import LineChart from "./charts/LineChart";
import {
  getCoinMarketPriceApi,
} from "components/StoryBoard/charts/LineChart";
import { IconClose } from "components/Common/Icon";

const Chart = props => {

  const [chartData, setChartData] = useState()
  const { onRemove, isPreview, ...rest } = props

  useEffect(() => {
    const getChartData = async (props) => {
      const data = await getCoinMarketPriceApi({ ...props });

      setChartData(data)
    };
    getChartData(props)
  }, [props])

  return (
    <div className="story-component-chart story-component-with-remove">
      {!isPreview && <div className="story-component-remove-container"><div onClick={onRemove} className="story-component-remove"><IconClose /></div></div>}
      <LineChart {...rest} chartData={chartData} />
    </div>
  );
};

export default Chart;
