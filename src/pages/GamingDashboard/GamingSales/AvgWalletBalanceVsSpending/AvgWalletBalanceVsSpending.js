import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody } from "reactstrap";
import * as echarts from "echarts";
import moment from "moment";

import ChartRangeNavigation from "components/Common/ChartRangeNavigation";

import "./AvgWalletBalanceVsSpending.scss";

const range = [
  { id: "year", label: "12 months", days: 365 },
  { id: "3-months", label: "3 months", days: 90 },
  { id: "month", label: "30 days", days: 30 },
  { id: "week", label: "7 days", days: 7 },
];

// demo data
const n = 365;
const demo_data = [...new Array(n).keys()].map(i => [
  moment()
    .subtract(n - i, "days")
    .format("yyyy-M-D"),
  Math.round(Math.random() * 30000),
  Math.round(Math.random() * 10000),
]);

export default function AvgWalletBalanceVsSpending() {
  const [chart, setChart] = useState();
  const [currentRange, setCurrentRange] = useState(range[3].days);

  const options = useMemo(() => ({
    backgroundColor: "transparent",
    dataset: {
      source: [
        ["date", "avgB", "avgS"],
        ...demo_data.reverse().slice(0, currentRange),
      ],
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "black",
      borderWidth: 0,
      padding: 8,
      textStyle: {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: 10,
        textAlign: "center",
        color: "#FFFFFF99",
      },
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#00FFA3",
          width: 2,
        },
      },
    },
    legend: {
      top: "4%",
      left: "right",
      icon: "circle",
      itemGap: 25,
      textStyle: {
        color: "white",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 600,
      },
    },
    grid: {
      left: "1%",
      right: "0%",
      bottom: "3%",
      top: "18%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "time",
        boundaryGap: ["1%", "4%"],
        axisLabel: {
          color: "#FFFFFF99",
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: 500,
          margin: 10,
          formatter: "{ee}",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        boundaryGap: [0, "5%"],
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#FFFFFF99",
          },
        },
        axisLabel: {
          color: "#FFFFFF99",
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: 400,
          formatter: function (value) {
            return value !== 0 ? "$" + value / 1000 + "k" : 0;
          },
        },
      },
    ],
    series: [
      {
        name: "Average Wallet Balance",
        type: "line",
        encode: { x: "date", y: "avgB" },
        color: "#FDFF8E",
        symbolSize: 6,
        symbol: "circle",
        itemStyle: {
          borderColor: "rgba(253, 255, 142, 0.2)",
          borderWidth: 6,
        },
      },
      {
        name: "Average Spending",
        type: "line",
        encode: { x: "date", y: "avgS" },
        color: "#9BFCC8",
        symbolSize: 6,
        symbol: "circle",
        itemStyle: {
          borderColor: "rgba(155, 252, 200, 0.2)",
          borderWidth: 6,
        },
      },
    ],
  }));

  useEffect(() => {
    const el = document.getElementById("avg-wallet-balance-vs-spending");
    if (chart) {
      chart.clear();
    }

    const newChart = echarts.init(el, "dark");
    newChart.setOption(options);
    setChart(newChart);
  }, [options]);

  useEffect(() => {
    const el = document.getElementById("avg-wallet-balance-vs-spending");

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (chart) {
          chart.resize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.unobserve(el);
    };
  }, [chart]);

  const onRangeChange = ({ days }) => {
    setCurrentRange(days);
  };

  return (
    <Card className="avg-wallet-balance-vs-spending">
      <CardBody>
        <h4 className="title">Avg Wallet Balance vs Avg Spend (USD)</h4>
        <div className="chart">
          <div id="avg-wallet-balance-vs-spending"></div>
          <ChartRangeNavigation range={range} onChange={onRangeChange} />
        </div>
      </CardBody>
    </Card>
  );
}
