import React, { useState, useEffect } from "react";
import ReactHighcharts from "react-highcharts";
import Highcharts from "highcharts";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

export default function ButterflyChart() {

  const [chartData, setChartData] = useState();
  const categories = [
    "Janaary-March",
    "April-June",
    "July-September",
    "October-December"
  ]

  useEffect(() => {
    const getChartData = async () => {
      const data = await getButterflyApiData({});

      setChartData(data)
    };
    getChartData()
  }, [])

  const sum = (quarterSumData) => {
    return quarterSumData.reduce((a, b) => a + b["market_caps"], 0)
  }

  const getSeriesData = (charDataindex) => {
    if (chartData) {
      let seriesData = chartData[Object.keys(chartData)[charDataindex]]
      let newChartData = []
      let grouped_items = _.groupBy(seriesData, (b) => moment(b.date).startOf('quarter').format('YYYY/MM/DD'));
      _.values(grouped_items)

      let allQuarters = Object.keys(grouped_items).map((quarterkey) => {
        return moment(quarterkey).quarter();
      })

      categories.forEach((category, index) => {
        let quarterDate = Object.keys(grouped_items)[index];
        let quarter = moment(quarterDate).quarter();
        if (quarterDate && allQuarters.includes(quarter)) {
          newChartData.push(sum(grouped_items[quarterDate]))
        } else {
          newChartData.push(0)
        }
      })
      return newChartData;
    } else {
      []
    }
  }

  return (
    <ReactHighcharts
      config={{
        chart: {
          type: "bar",
          inverted: true,
          backgroundColor: "transparent",
        },

        title: {
          text: "Historical Market Cap Snapshots",
          align: "left",
          style: { color: "white", fontWeight: "bold" },
        },
        subtitle: {
          text: "Aug 2021 - August 2022 (indexed by Billions i.e. 300B, 10b, .5b)",
          align: "left",
          style: { color: "white" },
        },
        xAxis: [
          {
            categories: categories,
            // categories: chartData ? Object.keys(chartData) : [],
            reversed: false,
            labels: {
              step: 1,
            },
          } /*{ // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }*/,
        ],
        yAxis: {
          gridLineColor: "transparent",
          title: {
            text: null,
          },
        },

        plotOptions: {
          series: {
            stacking: "normal",
          },
        },

        series: [
          {
            name: "2021",
            color: "#affea2",
            data: getSeriesData(0),
          },
          {
            name: "2022",
            data: getSeriesData(1),
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

    let grouped_items = _.groupBy(mappedData, (b) => moment(b.date).startOf('year').format('YYYY/MM'));
    _.values(grouped_items)

    return grouped_items;
  } catch (error) {
    console.log(error);
  }
};