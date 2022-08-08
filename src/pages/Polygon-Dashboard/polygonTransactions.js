import React from "react";
import ReactEcharts from "echarts-for-react";

const data = [
  {
    date: "01/21",
    wallets: 3545,
    transactions: 3203420,
  },
  {
    date: "02/21",
    wallets: 2341,
    transactions: 4203420,
  },
  {
    date: "03/21",
    wallets: 5678,
    transactions: 7205420,
  },
  {
    date: "04/21",
    wallets: 6429,
    transactions: 6203420,
  },
  {
    date: "05/21",
    wallets: 1234,
    transactions: 4203420,
  },
  {
    date: "06/21",
    wallets: 7890,
    transactions: 5203420,
  },
  {
    date: "07/21",
    wallets: 10000,
    transactions: 8203420,
  },
  {
    date: "08/21",
    wallets: 5698,
    transactions: 7203420,
  },
  {
    date: "09/21",
    wallets: 8901,
    transactions: 6903420,
  },
  {
    date: "10/21",
    wallets: 4210,
    transactions: 6203420,
  },
  {
    date: "11/21",
    wallets: 8901,
    transactions: 5000000,
  },
  {
    date: "12/21",
    wallets: 9654,
    transactions: 15045000,
  },
  {
    date: "01/22",
    wallets: 10021,
    transactions: 12045000,
  },
  {
    date: "02/22",
    wallets: 10918,
    transactions: 11045000,
  },
  {
    date: "03/22",
    wallets: 11000,
    transactions: 9045000,
  },
  {
    date: "04/22",
    wallets: 13000,
    transactions: 10045000,
  },
  {
    date: "05/22",
    wallets: 11800,
    transactions: 12045000,
  },
];

const getYAxisLabel = value => {
  if (value > 1000000) return `${(value / 1000000).toFixed(0)}M`;
  if (value > 1000) return `${(value / 1000).toFixed(0)}K`;
  return value;
};

const style = {
  height: "100%",
  width: "100%",
};

let option = {
  toolbox: {
    show: false,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(61, 72, 90, 0.95)",
    padding: 8,
    borderRadius: 8,
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
      data: data.map(x => x.date),
    },
  ],
  yAxis: [
    {
      type: "value",
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
      data: data.map(x => x.transactions),
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
      data: data.map(x => x.wallets),
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#B987FD",
          },
          {
            offset: 1,
            color: "#9548FC",
          },
        ],
        global: false,
      },
    },
  ],
};

const PolygonTransactions = ({ option: customOption }) => {
  return (
    <ReactEcharts
      option={Object.assign({}, option, customOption)}
      style={style}
      className="bar-chart"
    />
  );
};

export default PolygonTransactions;
