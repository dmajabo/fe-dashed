import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { axiosCC } from "helpers/cc_helper";
import * as d3 from "d3";
import _ from "lodash";

const bannedCoins = [
  "USDT",
  "USDC",
  "USDC",
  "BUSD",
  "WrappedBTC",
  "stETH",
  "DAI",
];

const getPriceChange = (start, end) => {
  const diff = end.close - start.open;
  return Math.round((diff / start.open) * 10000) / 100;
};

const getOption = (data = []) => {
  const all_market_cap_change_24h = data.map(({ market_cap_change_24h }) =>
    Math.abs(market_cap_change_24h)
  );
  const maxChange24h = Math.max(...all_market_cap_change_24h);
  const minChange24h = Math.min(...all_market_cap_change_24h);
  const filteredData = _.sortBy(
    data.length > 10
      ? [...data.slice(-5).reverse(), ...data.slice(0, 5).reverse()].filter(
          v => v.market_cap_change_24h !== 0
        )
      : data,
    "market_cap"
  ).reverse();

  return {
    grid: {
      top: 12,
      left: 55,
      right: 12,
      bottom: 50,
    },
    legend: {
      show: true,
      align: "left",
    },
    tooltip: {
      show: false,
    },
    xAxis: {
      data: filteredData.map(({ market_cap }) => market_cap),
      axisLine: {
        lineStyle: {
          color: "#484848",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#484848",
        },
      },
      showGrid: true,
      splitLine: {
        show: true,
        lineStyle: {
          color: "#484848",
        },
      },
      axisLabel: {
        formatter: function (value) {
          return d3.format(".2s")(value).replace("G", "B");
        },
        color: "rgba(255, 255, 255, .6)",
        fontSize: 12,
        fontFamily: "'sequel_sansbold_body', sans-serif",
      },
      boundaryGap: ["20%", "20%"],
      name: "Market Capitalization",
      nameLocation: "middle",
      nameTextStyle: {
        color: "#919192",
        fontWeight: "bold",
        padding: [20, 0, 0, 0],
      },
    },
    yAxis: {
      interval: 3,
      minInterval: 3,
      maxInterva: 3,
      axisLine: {
        lineStyle: {
          color: "#484848",
        },
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#484848",
        },
      },
      axisLabel: {
        formatter: "{value}%",
        color: function (value, index) {
          return value >= 0 ? "#00C482" : value < 0 ? "#FD2249" : "white";
        },
        fontSize: 12,
        fontFamily: "'sequel_sansbold_body', sans-serif",
      },
      boundaryGap: ["30%", "30%"],
      name: "Percentage Change",
      nameLocation: "middle",
      nameTextStyle: {
        color: "#919192",
        fontWeight: "bold",
        padding: [0, 0, 25, 0],
      },
    },
    dataZoom: {
      type: "inside",
    },
    series: [...new Array(2).keys()].map(i => ({
      symbolSize: function (value) {
        return (
          40 + (Math.abs(value) / (maxChange24h + Math.abs(minChange24h))) * 10
        );
      },
      label: {
        show: true,
        formatter: function ({ value, name, dataIndex }) {
          if (i == 0) {
            return `${value > 0 ? "+" : ""}${value}${value == 0 ? "" : "%"}`;
          } else {
            return filteredData[dataIndex].name;
          }
        },
        fontWeight: "bold",
        color: i == 0 ? "black" : "white",
        position: i == 0 ? "inside" : "bottom",
        fontSize: 10,
      },
      data: filteredData.map(
        ({ market_cap_change_24h }) => market_cap_change_24h
      ),
      type: "scatter",
      colorBy: "data",
      itemStyle: {
        color: ({ value }) => {
          return value > 0 ? "#00C482" : value < 0 ? "#FD2249" : "#919192";
        },
      },
    })),
  };
};

const BubbleChart = ({ xAxisName, yAxisName }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getChartData = () => {
      axiosCC.get("data/top/mktcapfull?limit=50&tsym=USD").then(({ data }) => {
        const { Data } = data;
        const top50Coins = Data.filter(
          coin => !bannedCoins.includes(coin.CoinInfo.Name)
        );

        if (top50Coins.length > 0) {
          Promise.all(
            top50Coins.map(coin =>
              axiosCC.get(
                `data/v2/histoday?fsym=${coin.CoinInfo.Name}&tsym=USD&limit=30`
              )
            )
          )
            .then(responses => responses.map(res => res.data.Data.Data))
            .then(histories =>
              histories.map((history, index) => ({
                name: top50Coins[index].CoinInfo.Name,
                market_cap: top50Coins[index].RAW?.USD?.MKTCAP || 0,
                market_cap_change_24h: getPriceChange(history[30], history[30]),
              }))
            )
            .then(data => {
              setChartData(
                data.sort(
                  (a, b) => a.market_cap_change_24h - b.market_cap_change_24h
                )
              );
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      });
    };

    getChartData();
  }, []);

  if (isLoading) return "Loading...";

  if (!chartData || chartData.length === 0) return "No Data";

  const content = (
    <ReactEcharts
      style={{ height: "100%", width: "100%" }}
      option={getOption(chartData)}
    />
  );

  if (xAxisName || yAxisName) {
    return (
      <React.Fragment>
        <div className="chart-with-axis">
          <div className="axis y-axis">
            <span className="">{yAxisName}</span>
          </div>
          <div className="chart">
            <ReactEcharts
              style={{ height: "100%", width: "100%" }}
              option={getOption(chartData)}
            />
          </div>
        </div>
        <div className="axis x-axis">
          <span className="">{xAxisName}</span>
        </div>
      </React.Fragment>
    );
  } else {
    return content;
  }
};

export default BubbleChart;
