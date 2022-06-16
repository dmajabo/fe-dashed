import React from "react";
import ReactEcharts from "echarts-for-react";

const getYAxisLabel = value => {
  if (value > 1000000) return `${(value / 1000000).toFixed(0)}M`;
  if (value > 1000) return `${(value / 1000).toFixed(0)}K`;
  return value;
};

const style = {
  height: "500px",
  width: "100%",
};

let option = {
  backgroundColor: "#111217",
  toolbox: {
    show: true,
    feature: {},
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 17,
        color: "#5B6178",
      },
      data: ["01/20", "02/20", "03/20", "04/20", "05/20"],
    },
  ],
  yAxis: [
    {
      type: "value",
      max: 50,
      axisLine: {
        show: false,
      },
      axisLabel: {
        formatter: value => getYAxisLabel(value),
        fontWeight: "700",
        fontSize: 12,
        lineHeight: 24,
        color: "rgba(255, 255, 255, 0.6)",
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.2)",
          type: [2, 2],
        },
      },
      splitNumber: 5,
    },
    {
      type: "value",
      axisLabel: {
        formatter: "{value}M",
      },
      max: 450,
      axisLine: {
        show: false,
      },
      axisLabel: {
        formatter: value => getYAxisLabel(value),
        fontWeight: "700",
        fontSize: 12,
        lineHeight: 24,
        color: "rgba(255, 255, 255, 0.6)",
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      splitNumber: 5,
    },
  ],
  series: [
    {
      name: "Transactions",
      type: "bar",
      xAxisIndex: 0,
      yAxisIndex: 1,
      data: [50, 400, 320, 300, 150],
      barWidth: 30,
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#36F097",
          },
          {
            offset: 1,
            color: "rgba(54, 240, 151, 0.2)",
          },
        ],
        global: false,
      },
    },
    {
      name: "# of Wallets",
      type: "line",
      smooth: true,
      symbol: "none",
      data: [8, 13, 33, 24, 43],
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#3DFFDC",
          },
          {
            offset: 1,
            color: "rgba(61, 255, 220, 0.2)",
          },
        ],
        global: false,
      },
    },
  ],
};

const PolygonTransactions = () => {
  return <ReactEcharts option={option} style={style} className="bar-chart" />;
};

export default PolygonTransactions;
