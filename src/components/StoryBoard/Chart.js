import React from "react"
import PolygonTransactions from "../../pages/Polygon-Dashboard/polygonTransactions";

const Chart = (props) => {

  return <div {...props} className="story-component-chart">
    <PolygonTransactions />
  </div>
}

export default Chart