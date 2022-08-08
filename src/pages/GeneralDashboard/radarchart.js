import React, { useEffect, useState, createRef } from "react";
import * as d3 from "d3";

const data = [
  {
    label: "Funding (APR)",
    diff: "Medium",
    color: "#FCF99C",
  },
  {
    label: "Leverage",
    diff: "Rising",
    color: "#EF923B",
  },
  {
    label: "Sell Pressure",
    diff: "Light",
    color: "#FCF99C",
  },
];

const transitions = [48, 49, 48, 49, 50, 49, 50, 51, 50, 51, 50, 49, 48, 49];
const throttle_duration = 2000;

export default function radarchart() {
  const chartRef = createRef(null);
  const [width, setwidth] = useState(200);
  const [height, setheight] = useState(250);
  const sm = width < 250;
  const [value, setvalue] = useState(0);

  const circle_size = 0.75;
  const start_engle = -Math.PI * circle_size;
  const end_engle = Math.PI * circle_size;
  const i = d3.interpolateNumber(start_engle, end_engle);

  useEffect(() => {
    drawRadarChart(data);
  }, [width]);

  useEffect(() => {
    const chartContainer = document.getElementById("chartContainer");
    const resizeObserver = new ResizeObserver(event => {
      const resizeWidth = event[0].contentBoxSize[0].inlineSize;
      const resizeHeight = event[0].contentBoxSize[0].blockSize;
      setwidth(resizeWidth > 300 ? 300 : resizeWidth);
      setheight(resizeHeight);
    });

    resizeObserver.observe(chartContainer);
  });

  const drawRadarChart = () => {
    d3.select(chartRef.current).select("svg").remove();
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const outerRadius = width / 2.5;
    const innerRadius = outerRadius - (sm ? 20 : 25);

    // Text

    svg
      .append("text")
      .style("font-size", sm ? "18px" : "23px")
      // .style("font-weight", "bold")
      .style("font-family", "sequel_100_wide45, sans-serif")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", outerRadius)
      .text("Medium");

    const meterText = svg
      .append("text")
      .style("font-size", sm ? "20px" : "25px")
      .style("font-family", "sequel_100_wide45, sans-serif")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", 2 * outerRadius - 30);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .style("font-size", "12px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "#ACACAC")
      .attr("x", 0)
      .attr("y", (d, i) => 2 * innerRadius + 80 + 28 * i)
      .text(d => d.label);

    // svg
    //   .selectAll("p")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .attr("text-anchor", "end")
    //   .style("font-size", "12px")
    //   .style("font-family", "Inter, sans-serif")
    //   .style("fill", "#ACACAC")
    //   .attr("x", width - 56)
    //   .attr("y", (d, i) => 2 * innerRadius + 80 + 28 * i)
    //   .text(d => d.value);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "#A6ACC4")
      .attr("width", 60)
      .attr("height", 21)
      .style("fill", d => d.color)
      .attr("x", width - 60)
      .attr("y", (d, i) => 2 * innerRadius + 65 + 28 * i)
      .attr("rx", 5);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "#15171F")
      .attr("x", width - 30)
      .attr("y", (d, i) => 2 * innerRadius + 80 + 28 * i)
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

    const colors = ["#FF596A", "#FF8C61", "#FFA15D", "#AFFEA2"];

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
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .cornerRadius(20)
      .startAngle(i(0))
      .endAngle(i(1));

    svg
      .append("path")
      .attr("transform", `translate(${width / 2},${outerRadius})`)
      .attr("d", arcGenerator())
      .style("fill", "#2B2F39");

    const arcProgress = d3
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .cornerRadius(20)
      .startAngle(i(0))
      .endAngle(i(value / 100));

    const arc = d3
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .cornerRadius(20)
      .startAngle(i(0));

    const progressCircle = svg
      .append("path")
      .attr("transform", `translate(${width / 2},${outerRadius})`)
      .attr("rx", 4)
      .style("fill", "url(#grad)")
      .attr("d", arcProgress());

    let values = [];

    for (let index = 0; index < transitions.length - 1; index++) {
      values.push({
        from: transitions[index],
        to: transitions[index + 1],
      });
    }

    progressCircle
      .transition()
      .delay(0)
      .duration(throttle_duration)
      .attrTween("d", function (d) {
        return function (t) {
          const i2 = d3.interpolateNumber(i(0 / 100), i(transitions[0] / 100));
          const iv = d3.interpolateNumber(0, transitions[0]);
          const progress = arc.endAngle(i2(t));
          meterText.text(`${Math.round(iv(t))}%`);
          return progress();
        };
      })
      .on("end", repeat);

    function repeat() {
      console.log("repeat");
      values.map(({ from, to }, index) => {
        const tr = progressCircle
          .transition()
          .delay((index + 1) * throttle_duration)
          .duration(throttle_duration)
          .attrTween("d", function (d) {
            return function (t) {
              const i2 = d3.interpolateNumber(i(from / 100), i(to / 100));
              const iv = d3.interpolateNumber(from, to);
              const progress = arc.endAngle(i2(t));
              meterText.text(`${Math.round(iv(t))}%`);
              return progress();
            };
          });
        if (index == values.length - 1) {
          tr.on("end", repeat);
        }
      });
    }

    repeat();
  };

  return (
    <div
      id="chartContainer"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={chartRef}></div>
    </div>
  );
}
