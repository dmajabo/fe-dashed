import React, { useState, useEffect } from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

var categories = [
  { name: "Ethereum", slug: "ethereum", code: "ETH", color: "#5A3FFF" },
  { name: "Cardano", slug: "cardano", code: "ADA", color: "#FF4869" },
  { name: "Solana", slug: "solana", code: "SOL", color: "#35D28A" },
  { name: "Polkadot", slug: "polkadot", code: "DOT", color: "#C31322" },
  { name: "Avalanche", slug: "avalanche-2", code: "AVAX", color: "#DB531A" },
  { name: "Polygon", slug: "matic-network", code: "MATIC", color: "#FFE920" },
  { name: "Stellar", slug: "stellar", code: "XLM", color: "#43F5A3" },
  { name: "Algorand", slug: "algorand", code: "ALGO", color: "#AFF1FF" },
  { name: "Cosmos Hub", slug: "cosmos", code: "ATOM", color: "#9BF543" },
  { name: "NEAR Protocol", slug: "near", code: "NEAR", color: "#DB9133" },
];

export default function SankeyChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getChartData = async () => {
      const promises = categories.map(({ slug, code }) => getBumpApiData({ ticker: slug, code }));

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

  if (isLoading) return "Loading...";

  return (
    <ResponsiveAreaBump
        data={chartData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        colors={categories.map((category)=> category.color)}
        blendMode="multiply"
        fillOpacity={1}
        activeFillOpacity={0.7}
        inactiveFillOpacity={0.1}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        startLabel="id"
        endLabel="id"
        axisTop={null}
        axisBottom={{
          tickSize: 12,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
        }}
    />
  );
}

export const getBumpApiData = async ({
  startDate = "1627776000",
  endDate = "1659312000",
  ticker = "bitcoin",
  code = "BTC",
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

    let grouped_items = _.groupBy(mappedData, (b) => moment(b.date).startOf('quarter').format('MMM YYYY'));
    _.values(grouped_items)
    console.log(grouped_items)
    return {
      name: ticker,
      id: code,
      data: Object.keys(grouped_items).map((item) => {
        return {
          x: item,
          y: grouped_items[item].reduce((a, b) => a + b["market_caps"], 0)
        }
      })
    };
  } catch (error) {
    console.log(error);
  }
};