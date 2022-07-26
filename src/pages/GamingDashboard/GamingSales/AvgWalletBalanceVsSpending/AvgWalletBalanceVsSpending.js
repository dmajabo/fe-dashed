import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody } from "reactstrap";
import * as echarts from "echarts";

import ChartActionButtons from "components/Common/ChartActionButtons";
import ChartRangeNavigation from "components/Common/ChartRangeNavigation";

import "./AvgWalletBalanceVsSpending.scss";

export default function AvgWalletBalanceVsSpending() {
  const [chart, setChart] = useState();

  const options = useMemo(() => ({
    backgroundColor: "transparent",
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
    // grid: {
    //   x: 0,
    //   x2: 0,
    //   y: "15%",
    //   y2: 0,
    //   containLabel: true,
    // },
    xAxis: {
      type: "category",
      boundaryGap: false,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: [0, 0],
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
          color: "#FFFFFF99",
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: 500,
          margin: 10,
        },
      },
    ],

    yAxis: [
      {
        type: "value",
        // interval: 5000,
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
            return "$" + value / 1000 + "k";
          },
        },
      },
    ],
    series: [
      {
        name: "Average Wallet Balance",
        type: "line",
        color: "#FDFF8E",
        data: [2000, 3000, 7000, 3000, 18000, 8000, 28000],
        symbolSize: 6,
        symbol: "circle",
      },
      {
        name: "Average Spending",
        type: "line",
        color: "#9BFCC8",
        data: [2000, 200, 1100, 2000, 7000, 3500, 10000],
        symbolSize: 6,
        symbol: "circle",
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

  return (
    <>
      <ChartActionButtons />
      <Card className="avg-wallet-balance-vs-spending">
        <CardBody>
          <h4 className="title">Avg Wallet Balance vs Avg Spend (USD)</h4>
          <div className="chart">
            <div id="avg-wallet-balance-vs-spending"></div>
            <ChartRangeNavigation />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
