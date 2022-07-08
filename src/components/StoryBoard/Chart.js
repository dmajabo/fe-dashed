import React from "react"
import LineChart from "./charts/LineChart";

const Chart = (props) => {

  const {data, ...rest} = props

  return <div {...rest} className="story-component-chart">
    <LineChart data={data} />
  </div>
}

export default Chart