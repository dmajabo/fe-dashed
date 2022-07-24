import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody } from "reactstrap";
import * as echarts from "echarts";

import ChartActionButtons from "components/Common/ChartActionButtons";
import ChartRangeNavigation from "components/Common/ChartRangeNavigation";

import "./NewPaidUsersCard.scss";

export default function NewPaidUsersCard() {
  const [chart, setChart] = useState();

  const options = useMemo(() => ({
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      // formatter: "{b0}: {c0}<br />{b1}: {c1}",
      position: function (point, params, dom, rect, size) {
        return [rect.x - rect.width / 2, rect.y - 80];
      },
      backgroundColor: "black",
      borderWidth: 0,
      padding: [8, 12, 8, 2],
      textStyle: {
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: 10,
        textAlign: "center",
        color: "white",
      },
    },
    grid: {
      x: 0,
      x2: 0,
      y: "15%",
      y2: 0,
      containLabel: true,
    },
    legend: {
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
    calculable: true,
    xAxis: [
      {
        type: "category",
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
        interval: 25,
        boundaryGap: [0, "20%"],
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
        },
      },
    ],
    series: [
      {
        name: "New Paid Users",
        type: "bar",
        data: [
          24, 60, 78, 60, 78, 75, 76,
          // { amount: 24 },
          // { amount: 60 },
          // { amount: 78 },
          // { amount: 60 },
          // { amount: 78 },
          // { amount: 75 },
          // { amount: 76 },
        ],
        color: "#46ED89",
        barCategoryGap: "50%",
        barWidth: "30%",
      },
      {
        name: "Goal",
        type: "bar",
        data: [
          52, 30, 40, 44, 52, 18, 36,
          // { amount: 52 },
          // { amount: 30 },
          // { amount: 40 },
          // { amount: 44 },
          // { amount: 52 },
          // { amount: 18 },
          // { amount: 36 },
        ],
        color: "#0E501C80",
        barCategoryGap: "50%",
        barWidth: "30%",
      },
    ],
  }));

  useEffect(() => {
    const el = document.getElementById("new-paid-users");
    if (chart) {
      chart.clear();
    }

    const newChart = echarts.init(el, "dark");
    newChart.setOption(options);
    setChart(newChart);
  }, [options]);

  useEffect(() => {
    const el = document.getElementById("new-paid-users");

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
      <Card className="new-paid-users">
        <CardBody>
          <h4 className="title">New Paid Users</h4>
          <p className="description">
            some sort of analysis there to give context
          </p>
          <div className="chart">
            <div id="new-paid-users"></div>
            <ChartRangeNavigation />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
