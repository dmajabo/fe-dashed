import React, { useMemo, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { post } from "../../../helpers/supabase_api_helper";

const categories = [
  {
    name: "Ethereum",
    slug: "ethereum",
    code: "ETH",
    color: "#5A3FFF",
    lineColor: "rgba(90, 63, 255, 0.7)",
  },
  {
    name: "Cardano",
    slug: "cardano",
    code: "ADA",
    color: "#FF4869",
    lineColor: "rgba(255, 72, 105, 0.7)",
  },
  {
    name: "Solana",
    slug: "solana",
    code: "SOL",
    color: "#35D28A",
    lineColor: "rgba(53, 210, 138, 0.7)",
  },
  {
    name: "Polkadot",
    slug: "polkadot",
    code: "DOT",
    color: "#C31322",
    lineColor: "rgba(195, 19, 34, 0.7)",
  },
  {
    name: "Avalanche",
    slug: "avalanche-2",
    code: "AVAX",
    color: "#DB531A",
    lineColor: "rgba(219, 83, 26, 0.7)",
  },
  {
    name: "Polygon",
    slug: "matic-network",
    code: "MATIC",
    color: "#FFE920",
    lineColor: "rgba(255, 233, 32, 0.7)",
  },
  {
    name: "Stellar",
    slug: "stellar",
    code: "XLM",
    color: "#43F5A3",
    lineColor: "rgba(67, 245, 163, 0.7)",
  },
  {
    name: "Algorand",
    slug: "algorand",
    code: "ALGO",
    color: "#AFF1FF",
    lineColor: "rgba(175, 241, 255, 0.7)",
  },
  {
    name: "Cosmos Hub",
    slug: "cosmos",
    code: "ATOM",
    color: "#9BF543",
    lineColor: "rgba(155, 245, 67, 0.7)",
  },
  {
    name: "NEAR Protocol",
    slug: "near",
    code: "NEAR",
    color: "#DB9133",
    lineColor: "rgba(219, 145, 51, 0.7)",
  },
];

const BumpChart = ({ key }) => {
  const chart = useRef();
  const [chartSize, setchartSize] = useState({
    height: "100%",
  });
  const [chartData, setChartData] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  Highcharts.SVGRenderer.prototype.symbols.custom = function (x, y) {
    const w = 6,
      h = 30;

    return [
      "m",
      x + w / 2,
      y - h / 2 + w / 2,
      "c",
      -w / 2,
      0,
      -w / 2,
      w / 2,
      -w / 2,
      w / 2,
      "v",
      h - w,
      "c",
      0,
      w / 2,
      w / 2,
      w / 2,
      w / 2,
      w / 2,
      "c",
      w / 2,
      0,
      w / 2,
      -w / 2,
      w / 2,
      -w / 2,
      "l",
      0,
      -(h - w),
      "c",
      0,
      0,
      0,
      -w / 2,
      -w / 2,
      -w / 2,
      "z",
    ];
  };

  Highcharts.SVGRenderer.prototype.symbols.customSM = function (x, y) {
    const w = 4,
      h = 16;

    return [
      "m",
      x + w / 2,
      y - h / 2 + w,
      "c",
      -w / 2,
      0,
      -w / 2,
      w / 2,
      -w / 2,
      w / 2,
      "v",
      h - w,
      "c",
      0,
      w / 2,
      w / 2,
      w / 2,
      w / 2,
      w / 2,
      "c",
      w / 2,
      0,
      w / 2,
      -w / 2,
      w / 2,
      -w / 2,
      "l",
      0,
      -(h - w),
      "c",
      0,
      0,
      0,
      -w / 2,
      -w / 2,
      -w / 2,
      "z",
    ];
  };

  useEffect(() => {
    const getChartData = async () => {
      const promises = categories.map(({ slug, code, color }, index) =>
        getBumpApiData({ ticker: slug, code, color, index })
      );

      Promise.all(promises)
        .then(values => {
          const xAxis = Object.keys(values[0].market_caps);
          setXAxis(xAxis);
          const ranks = [];
          _.map(xAxis, item => {
            ranks.push(
              _.map(
                _.sortBy(values, v => v.market_caps[item]).reverse(),
                v => v.id
              )
            );
          });
          const data = categories.map(category => {
            return {
              ...category,
              data: _.map(ranks, (rank, index) => {
                return _.findIndex(rank, v => v === category.code) + 1;
              }),
            };
          });
          setChartData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    };

    const card = document.querySelector("#bump-chart");
    const resizeObserver = new ResizeObserver(event => {
      const width = event[0].contentBoxSize[0].inlineSize;
      const height = event[0].contentBoxSize[0].blockSize;
      setchartSize({ width, height });
      chart.current.chart.reflow();
    });

    getChartData();
    resizeObserver.observe(card);
  }, []);

  const getOptions = () => {
    const firstLabels = _.sortBy(chartData, v => v.data[0]);
    const lastIndex = chartData[0]?.data.length - 1;
    const lastLabels = _.sortBy(chartData, v => v.data[lastIndex]);

    return {
      chart: {
        spacing: 0,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 15,
        marginBottom: 50,
        backgroundColor: "transparent",
        height: chartSize.height - 10,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 0,
        },
      },
      series: chartData.map(v => {
        return {
          name: v.code,
          type: "spline",
          data: v.data,
          color: v.lineColor,
          lineWidth: 20,
          lineCap: "butt",
          crisp: false,
          marker: {
            symbol: "custom",
            lineWidth: 1,
            lineColor: v.color,
            fillColor: v.color,
            width: 2,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
          xAxis: 0,
          yAxis: 0,
        };
      }),
      title: {
        text: "Market Cap Rankings",
        align: "left",
        style: {
          color: "white",
          fontFamily: "'sequel_100_wide45', sans-serif",
          fontSize: 14,
        },
      },
      tooltip: {
        borderColor: null,
        borderWidth: 0,
        useHTML: true,
        shape: "react",
        headerFormat: null,
        padding: 0,
        pointFormat: `<div style="z-index: 1000; border-radius: 3px; backgroundColor: #F5F5F5; display: flex; align-items: center; padding: 4px;"><div style="width: 9px; height: 9px; background:{series.color}; margin-right: 5px;"></div>{series.name} > {point.y}</div>`,
      },
      xAxis: [
        {
          lineColor: null,
          gridLineColor: null,
          tickWidth: 0,
          min: 0,
          max: lastIndex,
          tickInterval: 1,
          labels: {
            useHTML: true,
            style: {
              color: "white",
              fontFamily: "'sequel_100_wide45', sans-serif",
            },
            formatter: function () {
              return `<div style="padding: 4px 8px; display: flex; align-items: center; background: #2F2F2F; border-radius: 16px;">${
                xAxis[this.value]
              }</div>`;
            },
          },
          left: "5%",
          width: "90%",
          offset: 0,
        },
        ,
      ],
      yAxis: [
        {
          gridLineColor: null,
          title: {
            text: null,
          },
          min: 0,
          max: 11,
          tickInterval: 1,
          showFirstLabel: false,
          showLastLabel: false,
          labels: {
            allowOverlap: true,
            useHTML: true,
            formatter: function () {
              return `<div style="display: flex; align-items: center; justify-content: center; width: 12px; height: 12px; border-radius: 6px; background: #2F2F2F; color: #FFFFFF; font-size: 7px; ling-height: 1;">${this.value}</div>`;
            },
          },
          offset: 5,
          left: "0%",
          width: "5%",
          zIndex: 0,
          reversed: true,
        },
        {
          gridLineColor: null,
          title: {
            text: null,
          },
          min: 0,
          max: 11,
          categories: [
            "",
            ...firstLabels.map(v => {
              return { code: v.code, color: v.color };
            }),
          ],
          tickInterval: 1,
          showFirstLabel: false,
          showLastLabel: false,
          labels: {
            align: "left",
            style: {
              fontFamily: "'sequel_100_wide45', sans-serif",
              fontSize: "10px",
            },
            formatter: function () {
              if (this.value.color) {
                return (
                  `<span style="color: ${this.value.color};">` +
                  this.value.code +
                  "</span>"
                );
              } else {
                return this.value;
              }
            },
            useHTML: true,
          },
          offset: 0,
          left: "0%",
          width: "5%",
          zIndex: 0,
          reversed: true,
        },
        {
          gridLineColor: null,
          title: {
            text: null,
          },
          min: 0,
          max: 11,
          categories: [
            "",
            ...lastLabels.map(v => {
              return { code: v.code, color: v.color };
            }),
          ],
          tickInterval: 1,
          showFirstLabel: false,
          showLastLabel: false,
          labels: {
            align: "left",
            useHTML: true,
            style: {
              fontFamily: "'sequel_100_wide45', sans-serif",
              fontSize: "10px",
            },
            formatter: function () {
              if (this.value.color) {
                return (
                  `<span style="color: ${this.value.color};">` +
                  this.value.code +
                  "</span>"
                );
              } else {
                return this.value;
              }
            },
          },
          offset: 0,
          left: "100%",
          width: "5%",
          zIndex: 0,
          reversed: true,
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
              maxHeight: 400,
            },
            chartOptions: {
              series: chartData.map(v => {
                return {
                  lineWidth: 12,
                  marker: {
                    symbol: "customSM",
                    width: 2,
                  },
                };
              }),
              title: {
                style: {
                  fontSize: "10px",
                },
              },
              xAxis: [
                {
                  labels: {
                    style: {
                      fontSize: "5px",
                    },
                  },
                  left: "10%",
                  width: "80%",
                },
                ,
              ],
              yAxis: [
                {
                  left: "0%",
                  width: "10%",
                },
                {
                  left: "0%",
                  width: "10%",
                },
                {
                  left: "100%",
                  width: "10%",
                  zIndex: 0,
                  reversed: true,
                },
              ],
            },
          },
        ],
      },
      credits: { enabled: false },
    };
  };

  if (isLoading) return "Loading...";

  return (
    <div id="bump-chart" style={{ width: "100%", height: "100%" }}>
      <HighchartsReact
        ref={chart}
        highcharts={Highcharts}
        options={getOptions()}
        containerProps={{
          style: {
            width: "100%",
            height: "100%",
            fontFamily: "'sequel_100_wide45', sans-serif",
          },
        }}
      />
    </div>
  );
};

export default BumpChart;

const getBumpApiData = async ({
  startDate = "1627776000",
  endDate = "1659312000",
  ticker = "bitcoin",
  code = "BTC",
  color,
  index,
}) => {

  try {
    const data = await post('market_chart', {
      ticker,
      from: startDate,
      to: endDate,
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

    let grouped_items = _.groupBy(mappedData, b =>
      moment(b.date).startOf("quarter").format("MMM YYYY")
    );
    _.values(grouped_items);
    const market_caps = {};
    Object.keys(grouped_items).map(item => {
      market_caps[item] = grouped_items[item].reduce(
        (a, b) => a + b["market_caps"],
        0
      );
    });
    return {
      name: ticker,
      id: code,
      color: color,
      market_caps,
    };
  } catch (error) {
    console.log(error);
  }
};
