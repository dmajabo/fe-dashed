import React, { useEffect, useRef } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactEcharts from "echarts-for-react";
import { useState } from "react";
import { supabase } from "supabaseClient";
import moment from "moment";

export default function BTCFundingRatesCard() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chart = useRef();
  useEffect(() => {
    chart.current.resize();

    if (!chartData.length) getChartData();
  });

  const getChartData = async () => {
    try {
      setIsLoading(true);
      const { data } = await supabase.functions.invoke("funding-rate", {
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      });
      if (data) setChartData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const option = {
    tooltip: {
      trigger: "axis",
      show: true,
    },
    toolbox: {
      show: false,
    },
    grid: {
      show: false,
      left: 85,
      zlevel: 0,
      x: 60,
      x2: 24,
      y: 24,
      y2: 24,
      borderWidth: 0,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "rgba(0,0,0,0)",
    },
    textStyle: {
      fontFamily: "sequel_sansbold_body",
    },
    xAxis: {
      data: chartData.map(({ fundingTime }) =>
        moment(fundingTime).format("MMM YY").toUpperCase()
      ),
      axisLine: {
        lineStyle: {
          color: "#919192",
        },
      },
      xisTick: {
        show: false,
      },
      showGrid: false,
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 11,
      },
    },
    yAxis: {
      name: "Basis Points",
      nameLocation: "middle",
      nameTextStyle: {
        color: "white",
        fontWeight: "bold",
        padding: [0, 0, 55, 0],
      },
      axisLine: {
        lineStyle: {
          color: data => {
            return data > 0 ? "#FF4869" : "#A2FFA1";
          },
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 9,
        formatter: "{value}%",
      },
    },
    dataZoom: {
      start: 80,
      type: "inside",
    },
    series: [
      {
        symbolSize: 8,
        data: chartData.map(({ fundingRate }) => fundingRate),
        type: "scatter",
        colorBy: "data",
        itemStyle: {
          color: ({ value }) => {
            return value > 0 ? "#FF4869" : "#A2FFA1";
          },
        },
      },
    ],
  };

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">BTC Funding Rates Over Time</CardTitle>
        <ReactEcharts
          showLoading={isLoading}
          loadingOption={{
            text: "Loading Chart...",
            color: "#fff",
            textColor: "#fff",
            maskColor: "#111214",
            lineWidth: 3,
            fontFamily: "sequel_sansbold_body",
          }}
          ref={chart}
          style={{ height: "90%", width: "100%" }}
          option={option}
        />
      </CardBody>
    </Card>
  );
}
