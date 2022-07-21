import React, { useEffect, useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import moment from "moment";
import { useState } from "react";

const PriceLineChart = ({ chartData, color1, color2 }) => {
  const style = {
    height: "100%",
    width: "100%",
  };

  const option = useMemo(() => {
    if (chartData?.length)
      return {
        backgroundColor: "transparent",
        toolbox: {
          show: false,
        },
        grid: {
          left: 44,
          right: 44,
          top: 44,
          bottom: 44
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(61, 72, 90, 0.95)",
          padding: 8,
          borderRadius: 8,
          show: false
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
            data: chartData?.map(x => x.date),
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
            },
            axisLabel: {
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
            showSymbol: false,
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: chartData?.map(x => x.price),
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: color1,
                },
                {
                  offset: 1,
                  color: color2,
                },
              ],
              global: false,
            },
          },
        ],
      };
  }, [chartData]);
  if (!chartData?.length) return <p>Loading data...</p>;

  return <ReactEcharts option={option} style={style} className="bar-chart" />;
};

export default PriceLineChart;

export const getCoinMarketPriceApi = async ({
  startDate = "2020-01-01",
  endDate = "2021-12-31",
  ticker = "solana",
}) => {
  const API = `https://api.coingecko.com/api/v3/coins/${ticker}/market_chart/range`;
  const from = new Date(startDate).getTime() / 1000;
  const to = new Date(endDate).getTime() / 1000;
  try {
    const { data } = await axios.get(API, {
      params: {
        vs_currency: "usd",
        from,
        to,
      },
    });
    const mappedData = [];

    for (const i in data.prices) {
      const payload = {
        price: data.prices[i][1],
        date: moment(data.prices[i][0]).format("DD/MM/yyyy"),
        market_caps: data.market_caps[i][1],
        total_volumes: data.total_volumes[i][1],
      };
      mappedData.push(payload);
    }

    return mappedData;
  } catch (error) {
    console.log(error);
  }
};
