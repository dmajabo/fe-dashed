import React, { useEffect, useState, createRef } from "react";
import * as d3 from "d3";

const width = 300;
const height = width + 200;

export default function index() {
  const chartRef = createRef(null);

  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

    // An arc function with all values bound except the endAngle. So, to compute an
    // SVG path string for a given angle, we pass an object with an endAngle
    // property to the `arc` function, and it will return the corresponding string.
    const arc = d3.arc().innerRadius(80).outerRadius(100).cornerRadius(20);

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Add the background arc, from 0 to 100% (tau).
    const background = g
      .append("path")
      .datum({
        endAngle: tau,
      })
      .style("fill", "#ddd")
      .attr("d", arc);

    const data = [0.2, 0.3, 0.51];
    const c = d3
      .scaleThreshold()
      .domain([0.201, 0.501, 1])
      .range(["green", "orange", "red"]);

    const pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d;
      });

    g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("class", "arc")
      .style("fill", function (d) {
        return c(d.value);
      })
      .attr("d", arc);
  };

  return <div ref={chartRef}></div>;
}
