import React, {useMemo} from "react";
import ReactEcharts from "echarts-for-react";

const PolygonTransactions = ({ data }) => {

  const getYAxisLabel = value => {
    if (value > 1000000) return `${(value / 1000000).toFixed(0)}M`;
    if (value > 1000) return `${(value / 1000).toFixed(0)}K`;
    return `${value}`;
  };

  const style = {
    height: "100%",
    width: "100%",
  };

  const option = useMemo(()=> ({
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
        name: "Price",
        type: "line",
        smooth: true,
        symbol: "none",
        data: data.map(x => x.value),
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
  }), [data]);

  return <ReactEcharts option={option} style={style} className="bar-chart" />;
};

export default PolygonTransactions;
