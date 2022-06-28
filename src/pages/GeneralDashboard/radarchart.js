import React, { useEffect, useState, createRef } from "react";
import * as d3 from "d3";

const data = [
  {
    label: "Sell Pressure",
    value: "70%",
    diff: "3%",
    color: "#F25181",
  },
  {
    label: "Leverage",
    value: "Increasing",
    diff: "9%",
    color: "#F25181",
  },
  {
    label: "Funding (APR)",
    value: "10%",
    diff: "4%",
    color: "#0C8B52",
  },
];

export default function radarchart() {
  const chartRef = createRef(null);
  const [width, setwidth] = useState(300);
  const height = width + 100;
  const [value, setvalue] = useState(40);

  const circle_size = 0.8;
  const start_engle = -Math.PI * circle_size;
  const end_engle = Math.PI * circle_size;
  const i = d3.interpolateNumber(start_engle, end_engle);

  useEffect(() => {
    drawRadarChart(data);
  }, []);

  const drawRadarChart = () => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Text

    svg
      .append("text")
      .style("font-size", "22px")
      // .style("font-weight", "bold")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", 105)
      .text("Medium");

    const meterText = svg
      .append("text")
      .style("font-size", "22px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", 180)
      .text(`${value}%`);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .style("font-size", "14px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "#A6ACC4")
      .attr("x", 0)
      .attr("y", (d, i) => 220 + 40 * (i + 1))
      .text(d => d.label);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "#A6ACC4")
      .attr("x", width - 60)
      .attr("y", (d, i) => 220 + 40 * (i + 1))
      .text(d => d.value);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "#A6ACC4")
      .attr("width", 43)
      .attr("height", 21)
      .style("fill", d => d.color)
      .attr("x", width - 45)
      .attr("y", (d, i) => 220 + 40 * (i + 0.6))
      .attr("rx", 5)
      .append("text")
      .text(d => d.value);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "#D9D9D9")
      .attr("x", width - 15)
      .attr("y", (d, i) => 220 + 40 * (i + 1))
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

    const colors = ["#ECC96C", "#5CC84D"];

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

    const arcGenerator = d3
      .arc()
      .outerRadius(100)
      .innerRadius(80)
      .cornerRadius(20)
      .startAngle(i(0))
      .endAngle(i(1));

    svg
      .append("path")
      .attr("transform", `translate(${width / 2},100)`)
      .attr("d", arcGenerator())
      .style("fill", "#2B2F39");

    const arcProgress = d3
      .arc()
      .outerRadius(100)
      .innerRadius(80)
      .cornerRadius(20)
      .startAngle(i(0))
      .endAngle(i(value / 100));

    const arc = d3
      .arc()
      .outerRadius(100)
      .innerRadius(80)
      .cornerRadius(20)
      .startAngle(i(0));

    svg
      .append("path")
      .attr("transform", `translate(${width / 2},100)`)
      .attr("rx", 4)
      .style("fill", "url(#grad)")
      .attr("d", arcProgress())
      .transition()
      .duration(3000)
      .attrTween("d", function (d) {
        return function (t) {
          const i2 = d3.interpolateNumber(
            i(value / 100),
            i((value + 10) / 100)
          );
          const progress = arc.endAngle(i2(t));
          meterText.text(`${Math.round(value + t * 10)}%`);

          return progress();
        };
      });
  };

  return (
    <div
      style={{
        minWidth: width,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div ref={chartRef}></div>
    </div>
  );
}
