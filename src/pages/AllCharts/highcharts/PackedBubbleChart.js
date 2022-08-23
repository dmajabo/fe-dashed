import React, { useMemo, useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import ReactHighcharts from "highcharts-react-official";
import HcMore from "highcharts/highcharts-more";

HcMore(Highcharts);

function PackedBubbleChart({ option }) {
  const chart = useRef();
  const [chartSize, setchartSize] = useState({
    height: "100%",
  });

  useEffect(() => {
    const card = document.querySelector("#packed-bubble-chart");
    const resizeObserver = new ResizeObserver(event => {
      const width = event[0].contentBoxSize[0].inlineSize;
      const height = event[0].contentBoxSize[0].blockSize;
      setchartSize({ width, height });
      chart.current.chart.reflow();
    });

    resizeObserver.observe(card);
  });

  const options = useMemo(() => {
    return {
      chart: {
        backgroundColor: "transparent",
        type: "packedbubble",
        height: chartSize.height,
        style: {
          fontFamily: "sequel_sansbold_body",
        },
      },
    };
  });
  return (
    <div id={"packed-bubble-chart"} style={{ width: "100%", height: "100%" }}>
      <ReactHighcharts
        ref={chart}
        highcharts={Highcharts}
        // options={options}
        options={Object.assign({}, options, option)}
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default PackedBubbleChart;
