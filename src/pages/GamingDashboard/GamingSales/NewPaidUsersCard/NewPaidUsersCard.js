import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody } from "reactstrap";
import * as echarts from "echarts";
import moment from "moment";

import ChartRangeNavigation from "components/Common/ChartRangeNavigation";

import "./NewPaidUsersCard.scss";

const range = [
  { id: "year", label: "12 months", days: 365 },
  { id: "3-months", label: "3 months", days: 90 },
  { id: "month", label: "30 days", days: 30 },
  { id: "week", label: "7 days", days: 7 },
  { id: "day", label: "24 hours", days: 1 },
];

// demo data
const n = 365;
const demo_data = [...new Array(n).keys()].map(i => [
  moment()
    .subtract(n - i, "days")
    .format("yyyy-M-D"),
  Math.round(Math.random() * 80),
  Math.round(Math.random() * 100),
]);

export default function NewPaidUsersCard() {
  const [chart, setChart] = useState();
  const [currentRange, setCurrentRange] = useState(range[3].days);

  const options = useMemo(() => ({
    backgroundColor: "transparent",
    dataset: {
      source: [
        ["date", "users", "newUsers"],
        ...demo_data.reverse().slice(0, currentRange),
      ],
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        const price = 70;
        const [date, users, newUsers] = params.data;
        const date_format = moment(date).format("DD MMMM YYYY");
        const content = [
          `<span style="font-size:10px;color:#838383">${date_format}</span>`,
          `${newUsers} new users`,
          `<p style="text-align:center;margin:0">$${price * newUsers}</p>`,
        ].join("<br/>");
        return `<div style="margin-left:-25px;border-radius:4px;background-color:black; padding:12px 8px 2px 8px; text-align:center">${content}</div>`;
      },
      position: function (point, params, dom, rect, size) {
        return [rect.x - rect.width / 2, rect.y - 90];
      },
      backgroundColor: "transparent",
      borderWidth: 0,
      textStyle: {
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: 11,
        textAlign: "center",
        color: "white",
        rich: {
          a: {
            fontSize: 10,
            color: "#838383",
            textAlign: "left",
          },
        },
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
    xAxis: [
      {
        type: "time",
        boundaryGap: ["5%", "2%"],
        splitNumber: 10,
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
        boundaryGap: [0, "10%"],
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

  const onRangeChange = ({ days }) => {
    setCurrentRange(days);
  };

  return (
    <Card className="new-paid-users">
      <CardBody>
        <h4 className="title">New Paid Users</h4>
        <div className="chart">
          <div id="new-paid-users"></div>
          <ChartRangeNavigation range={range} onChange={onRangeChange} />
        </div>
      </CardBody>
    </Card>
  );
}
