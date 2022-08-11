import React, { useState, useEffect } from "react";
import ReactHighcharts from "react-highcharts";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

var categories = [
  { name: "Ethereum", slug: "ethereum", code: "ETH" },
  { name: "Cardano", slug: "cardano", code: "ADA" },
  { name: "Solana", slug: "solana", code: "SOL" },
  { name: "Polkadot", slug: "polkadot", code: "DOT" },
  { name: "Avalanche", slug: "avalanche-2", code: "AVAX" },
  { name: "Polygon", slug: "matic-network", code: "MATIC" },
  { name: "Stellar", slug: "stellar", code: "XLM" },
  { name: "Algorand", slug: "algorand", code: "ALGO" },
  { name: "Cosmos Hub", slug: "cosmos", code: "ATOM" },
  { name: "NEAR Protocol", slug: "near", code: "NEAR" },
];

export default function ButterflyChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getChartData = async () => {
      const promises = categories.map(({ slug }) =>
        getButterflyApiData({ ticker: slug })
      );

      Promise.all(promises)
        .then(values => {
          setChartData(values);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getChartData();
  }, []);

  const sum = quarterSumData => {
    return quarterSumData.reduce((a, b) => a + b["market_caps"], 0);
  };

  const getSeriesData = seriesName => {
    return chartData.map(data => data[seriesName].market_caps);
  };

  const seriesAMax = Math.max.apply(Math, getSeriesData("seriesA"));
  const seriesBMax = Math.max.apply(Math, getSeriesData("seriesB"));

  const totalMax = Math.max.apply(Math, [seriesAMax, seriesBMax]);

  const sortedSeriesA = getSeriesData("seriesA").sort((a, b) => b - a);
  const sortedSeriesB = getSeriesData("seriesB").sort((a, b) => b - a);

  const getRank = (value, yAxisIndex) => {
    const seriesToUse = yAxisIndex === 0 ? sortedSeriesA : sortedSeriesB;
    return seriesToUse.indexOf(value) + 1;
  };

  if (isLoading) return "Loading...";

  return (
    <ReactHighcharts
      config={{
        chart: {
          type: "bar",
          margin: 60,
          backgroundColor: "transparent",
        },
        containerProps: { style: { width: "100%", height: "100%", fontFamily: '"sequel_100_wide45", sans-serif' } },
        legend: {
          enabled: true,
          verticalAlign: "top",
          y: -20,
          itemStyle: { color: "white" },
        },
        tooltip: {
          borderColor: "none",
          backgroundColor: "#484848",
          style: { color: "white" },
          formatter: function () {
            return (
              "<b>" +
              this.series.name +
              "<br/> Rank: " +
              getRank(this.point.y, this.series.index) +
              "</b><br/>" +
              "Market Cap: " +
              Intl.NumberFormat("en", { notation: "compact" }).format(
                this.point.y
              )
            );
          },
        },
        title: {
          text: "Market Cap (Billions)",
          verticalAlign: "bottom",
          align: "center",
          y: 0,
        },
        subtitle: {
          text: null,
        },
        xAxis: [
          {
            categories: categories.map(({ code }) => code.toUpperCase()),
            reversed: false,
            labels: {
              align: "center",
              step: 1,
              style: { color: "white" },
            },
            lineWidth: 0,
            tickWidth: 0,
            left: "53%",
            verticalAlign: "top",
            y: 50,
          },
          ,
        ],
        yAxis: [
          {
            title: {
              text: null,
            },

            max: null,
            gridLineColor: "transparent",
            labels: {
              align: "left",
              style: { color: "white" },
              formatter: function () {
                return Intl.NumberFormat("en", { notation: "compact" }).format(
                  this.value
                );
              },
            },
            left: 10,
            width: "45%",
            reversed: true,
          },

          {
            max: null,
            gridLineColor: "transparent",
            labels: {
              style: { color: "white" },
              formatter: function () {
                return Intl.NumberFormat("en", { notation: "compact" }).format(
                  this.value
                );
              },
            },
            offset: 0,
            title: { text: null },
            left: "58%",
            width: "45%",
          },
        ],

        plotOptions: {
          series: {},
          bar: {
            grouping: true,
            groupPadding: 0.01,
            pointPadding: 0.01,
            pointWidth: 24,
            borderWidth: 0,
            borderRadius: 4,
          },
        },

        series: [
          {
            name: "August 2021",
            color: "#5a3fff",
            yAxis: 0,
            data: [...sortedSeriesA].reverse(),
          },
          {
            name: "August 2022",
            color: "#36f097",
            yAxis: 1,
            data: [...sortedSeriesB].reverse(),
          },
        ],
        credits: { enabled: false },
      }}
    />
  );
}

export const getButterflyApiData = async ({
  startDate = "1627776000",
  endDate = "1659312000",
  ticker = "bitcoin",
}) => {
  const API = `https://api.coingecko.com/api/v3/coins/${ticker}/market_chart/range`;

  try {
    const { data } = await axios.get(API, {
      params: {
        vs_currency: "usd",
        from: startDate,
        to: endDate,
      },
    });
    const mappedData = [];

    for (const i in data.prices) {
      const payload = {
        price: data.prices[i][1],
        date: moment(data.prices[i][0]).format("yyyy-MM-DD"),
        market_caps: data.market_caps[i][1],
        total_volumes: data.total_volumes[i][1],
      };
      mappedData.push(payload);
    }

    return {
      ticker,
      seriesA: mappedData[0],
      seriesB: mappedData[mappedData.length - 1],
    };
  } catch (error) {
    console.log(error);
  }
};
