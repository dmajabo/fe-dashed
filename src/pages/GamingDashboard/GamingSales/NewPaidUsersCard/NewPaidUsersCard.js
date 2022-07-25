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
    dataset: {
      source: [
        ["date", "users", "newUsers"],
        ["2022-6-10", 52, 24],
        ["2022-6-11", 30, 60],
        ["2022-6-12", 40, 88],
        ["2022-6-13", 44, 60],
        ["2022-6-14", 52, 78],
        ["2022-6-15", 18, 75],
        ["2022-6-16", 36, 76],
      ],
    },
    tooltip: {
      trigger: "item",
      formatter: "{c0} <br/>{a0}",
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
      left: "0%",
      right: "0%",
      bottom: "2%",
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
        type: "time",
        boundaryGap: ["5%", "5%"],
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
        encode: { x: "date", y: "newUsers" },
        color: "#46ED89",
        barCategoryGap: "50%",
        barWidth: "30%",
      },
      {
        name: "Goal",
        type: "bar",
        encode: { x: "date", y: "users" },
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
