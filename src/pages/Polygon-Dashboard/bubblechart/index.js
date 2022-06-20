import React, { useEffect, createRef } from "react";
import * as d3 from "d3";
import d from "./data";

const height = 600;
const width = 800;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };

export default function bubbleChart() {
  const chartRef = createRef(null);
  useEffect(() => {
    const data = d.map(({ date, value }) => ({ date: new Date(date), value }));
    drawBubbleChart(data);
    return () => {};
  }, []);

  const drawBubbleChart = data => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, d => d.date))
      // .domain([new Date(1880), new Date()])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .nice()
      .range([height - margin.bottom, margin.top]);

    const max = d3.max(data, d => Math.abs(d.value));
    const z = d3.scaleSequential(d3.interpolateRdBu).domain([max, -max]);

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call(g => g.select(".domain").remove());

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "+"))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .selectAll(".tick line")
            .filter(d => d === 0)
            .clone()
            .attr("x2", width - margin.right - margin.left)
            .attr("stroke", "#ccc")
        )
        .call(g =>
          g
            .append("text")
            .attr("fill", "#000")
            .attr("x", 5)
            .attr("y", margin.top)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Anomaly (°C)")
        );

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    svg
      .append("g")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.value))
      .attr("fill", d => z(d.value))
      .attr("r", 2.5);
  };

  return <div ref={chartRef}></div>;
}
