import React, { useEffect, createRef } from "react";
import * as d3 from "d3";
import alldata, { names, datevalues, group_data } from "./data";

const n = 6;
const margin = { top: 0, right: 0, bottom: 6, left: 0 };
const barSize = 60;
const barSpace = 13;
const height = margin.top + (barSize + barSpace) * n + margin.bottom + 20;
const width = 700;

const data = [
  {
    date: "2021-01-04",
    name: "MATIC",
    category: "MATIC",
    value: 93,
    color: "#8247E5",
  },
  {
    date: "2021-01-04",
    name: "BTC",
    category: "BTC",
    value: 46.62,
    color: "#FE1C86",
  },
  {
    date: "2021-01-04",
    name: "ETH",
    category: "ETH",
    value: 76.09,
    color: "#2A5ADA",
  },
  {
    date: "2021-01-04",
    name: "SOL",
    category: "SOL",
    value: 60.04,
    color: "#03AFED",
  },
  {
    date: "2021-01-04",
    name: "FTM",
    category: "FTM",
    value: 30.13,
    color: "#FF3B56",
  },
  {
    date: "2021-01-04",
    name: "DOGE",
    category: "DOGE",
    value: 62.62,
    color: "#4DA1BD",
  },
  {
    date: "2021-01-04",
    name: "AVAX",
    category: "AVAX",
    value: 88.48,
    color: "#4DA1BD",
  },
  {
    date: "2021-01-04",
    name: "ATOM",
    category: "ATOM",
    value: 33.27,
    color: "#972c48",
  },
  {
    date: "2021-01-04",
    name: "BNB",
    category: "BNB",
    value: 49.23,
    color: "#f4bbe8",
  },
  {
    date: "2021-01-04",
    name: "XRP",
    category: "XRP",
    value: 24.07,
    color: "#22e0c4",
  },
  {
    date: "2021-01-04",
    name: "LINK",
    category: "LINK",
    value: 27.46,
    color: "#c699c5",
  },
  {
    date: "2021-01-04",
    name: "DOT",
    category: "DOT",
    value: 112.41,
    color: "#79e22f",
  },
  {
    date: "2021-01-04",
    name: "ONE",
    category: "ONE",
    value: 35.97,
    color: "#8f0d4e",
  },
  {
    date: "2021-01-04",
    name: "MANA",
    category: "MANA",
    value: 22.58,
    color: "#001d68",
  },
  {
    date: "2021-01-04",
    name: "SAND",
    category: "SAND",
    value: 11.46,
    color: "#260f80",
  },
  {
    date: "2021-01-04",
    name: "UNI",
    category: "UNI",
    value: 108.69,
    color: "#838330",
  },
];
// const data = [1, 2, 3, 4];

export default function d3demo() {
  const chartRef = createRef(null);
  useEffect(() => {
    drawBarChart(data);
    // bars(svg);
    return () => {};
  }, []);

  const gradient = (svg, colour, id, x1, x2, off1, off2, op1, op2) => {
    svg
      .append("defs")
      .append("linearGradient")
      .attr("id", id)
      .attr("x1", x1)
      .attr("y1", "0%")
      .attr("x2", x2)
      .attr("y2", "0%");
    const idtag = "#" + id;
    //defines the start
    d3.select(idtag)
      .append("stop")
      .attr("stop-color", "#8247E533")
      .attr("class", "begin")
      .attr("offset", off1)
      .attr("stop-opacity", op1);
    //and the finish
    d3.select(idtag)
      .append("stop")
      .attr("class", "end")
      .attr("stop-color", colour)
      .attr("offset", off2)
      .attr("stop-opacity", op2);
  };

  const drawBarChart = data => {
    const x = d3.scaleLinear().range([height, 0]);
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", height);

    // ticker

    svg
      .append("text")
      .style("font", "bold 40px sans")
      .style("fill", "#888E9D")
      .attr("text-anchor", "end")
      .attr("x", "95%")
      .attr("y", height - 62)
      .attr("dy", "0.32em")
      .text("Dec 2021");

    // bars

    const slice = data.slice(0, n);

    svg
      .selectAll("g")
      .data(slice)
      .enter()
      .append("rect")
      .attr("fill-opacity", 0.6)
      .attr("x", (d, i) => 0)
      .attr("y", (d, i) => i * (barSize + barSpace))
      .attr("width", (d, i) => `${d.value * 0.9}%`)
      .attr("height", (d, i) => barSize)
      .style("fill", function (d) {
        gradient(
          svg,
          d.color,
          "grad" + d.name,
          "0%",
          "100%",
          "0%",
          "100%",
          0.4,
          1
        );
        return "url(#grad" + d.name + ")";
      });

    svg
      .append("g")
      .style("font", "bold 12px white var(--sans-serif)")
      .style("fill", "white")
      .selectAll("text")
      .data(slice)
      .enter()
      .append("text")
      .attr("x", (d, i) => `${d.value * 0.92}%`)
      .attr("y", (d, i) => i * (barSize + barSpace) + 0.5 * barSize)
      .text((d, i) => `${d.name} ${d.value}`);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height - 20})`)
      .attr("margin", "50px")
      .call(d3.axisBottom(x))
      .append("line")
      .attr("x1", "100%");
  };

  return <div ref={chartRef}></div>;
}
