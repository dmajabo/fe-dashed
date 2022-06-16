import React, { useEffect, useState, createRef } from "react";
import * as d3 from "d3";

const data = [
  {
    label: "Funding (APR)",
    value: "10%",
    diff: "4%",
    color: "#0C8B52",
  },
  {
    label: "Leverage",
    value: "Increasing",
    diff: "9%",
    color: "#F25181",
  },
  {
    label: "Sell Pressure",
    value: "70%",
    diff: "3%",
    color: "#F25181",
  },
];

const size = 300;
const circle_size = 0.8;

export default function radarchart() {
  const chartRef = createRef(null);
  const [value, setvalue] = useState(50);

  useEffect(() => {
    drawRadarChart(data);
  }, []);

  const drawRadarChart = () => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, size, size]);
    // .attr("width", size)
    // .attr("height", size);

    // Text

    svg
      .append("text")
      .style("font", "bold 29px sans")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", size / 2)
      .attr("y", size / 2 - 20)
      .text("Medium");

    svg
      .append("text")
      .style("font", "bold 29px sans")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", size / 2)
      .attr("y", size / 2 + 20)
      .text(`${value}%`);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .style("font", "14px sans")
      .style("fill", "#A6ACC4")
      .attr("x", 0)
      .attr("y", (d, i) => size - 25 * (i + 1))
      .text(d => d.label);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "end")
      .style("font", "14px sans")
      .style("fill", "#A6ACC4")
      .attr("x", size - 60)
      .attr("y", (d, i) => size - 25 * (i + 1))
      .text(d => d.value);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      // .attr("text-anchor", "end")
      // .style("font", "14px #A6ACC4 sans")
      .style("fill", "#A6ACC4")
      .attr("width", 43)
      .attr("height", 21)
      .style("fill", d => d.color)
      .attr("x", size - 45)
      .attr("y", (d, i) => size - 25 * (i + 1.6))
      .attr("r", 5)
      .append("text")
      .text(d => d.value);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "end")
      .style("font", "14px sans")
      .style("fill", "#D9D9D9")
      .attr("x", size - 15)
      .attr("y", (d, i) => size - 25 * (i + 1))
      .text(d => d.diff);

    // Gradient

    const grad = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "grad")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    const colors = ["#DF894B", "#6BC89E", "#30E88F"];

    grad
      .selectAll("stop")
      .data(colors)
      .enter()
      .append("stop")
      .style("stop-color", function (d) {
        return d;
      })
      .attr("offset", function (d, i) {
        return 100 * (i / (colors.length - 1)) + "%";
      });

    // Circle

    const start_engle = -Math.PI * circle_size;
    const end_engle = Math.PI * circle_size;
    const progress_engle = (Math.PI * (value - 50)) / 100;
    // const progress_engle =
    //   (Math.PI * circle_size * Math.PI * (value - 50)) / 100 +
    //   (Math.PI * (1 - circle_size) * value) / 100;

    console.log(`angles (${start_engle}, ${end_engle}, ${progress_engle})`);

    const arcGenerator = d3
      .arc()
      .outerRadius(100)
      .innerRadius(80)
      .startAngle(start_engle)
      .endAngle(end_engle);
    // .startAngle(-Math.PI * 0.8)
    // .endAngle(Math.PI * 0.8);

    const arcProgress = d3
      .arc()
      .outerRadius(100)
      .innerRadius(80)
      .startAngle(start_engle)
      .endAngle(progress_engle);
    // .endAngle((Math.PI * value) / 100 - 0.8);

    svg
      .append("path")
      .attr("transform", "translate(150,120)")
      .attr("d", arcGenerator());

    svg
      .append("path")
      .attr("transform", "translate(150,120)")
      .attr("rx", 4)
      .style("fill", "url(#grad)")
      .attr("d", arcProgress());
  };

  return <div ref={chartRef}></div>;
}
