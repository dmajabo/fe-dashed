import React, { useEffect, useState, createRef } from "react";
import { Card, CardBody, CardTitle } from 'reactstrap'
import * as d3 from "d3";

const data = [
  {
    label: "Funding (APR)",
    value: "10%",
    diff: "4%",
    color: "#9DE890",
  },
  {
    label: "Leverage",
    value: "Increasing",
    diff: "9%",
    color: "#EF923B",
  },
  {
    label: "Sell Pressure",
    value: "70%",
    diff: "3%",
    color: "#EF923B",
  },
];

const transitions = [0, 50];
const loop_transition = [48, 52];
const throttle_duration = 1000;

export default function RiskRatingCard() {
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
    const card = document.querySelector(".card.risk-rating");
    const resizeObserver = new ResizeObserver(event => {
      const { width, height } = event[0].target.getBoundingClientRect()
      setwidth(width - 48); // padding
      setheight(height - 48 - 48); // padding + title
    });

    resizeObserver.observe(card);
  });

  useEffect(() => {
    d3.select(chartRef.current).select("svg").remove();
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, 300, 400])
      .attr("width", Math.min(width, 300))
      .attr("height", height);

    const outerRadius = 150; // width / 2.5;
    const innerRadius = outerRadius - (sm ? 20 : 25);
    const offsetX = width / 2 - outerRadius;

    // Text
    svg
      .append("text")
      .style("font-size", sm ? "18px" : "23px")
      // .style("font-weight", "bold")
      .style("font-family", "sequel_100_wide45, sans-serif")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", 150)
      .attr("y", outerRadius)
      .text("Medium");

    const meterText = svg
      .append("text")
      .style("font-size", sm ? "20px" : "25px")
      .style("font-family", "sequel_100_wide45, sans-serif")
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("x", 150)
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

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "#ACACAC")
      .attr("x", 300 - 56)
      .attr("y", (d, i) => 2 * innerRadius + 80 + 28 * i)
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
      .attr("x", 300 - 43)
      .attr("y", (d, i) => 2 * innerRadius + 65 + 28 * i)
      .attr("rx", 5);
    // .append("text")
    // .text(d => d.value);

    svg
      .selectAll("p")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .style("font-family", "Inter, sans-serif")
      .style("fill", "#15171F")
      .attr("x", 300 - 12)
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
      .attr("transform", `translate(${outerRadius},${outerRadius})`)
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
      .attr("transform", `translate(${outerRadius},${outerRadius})`)
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

    values.map(({ from, to }, index) => {
      const tr = progressCircle
        .transition()
        .delay(index * throttle_duration)
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

      function repeat() {
        progressCircle
          .transition()
          .delay(500)
          .duration(throttle_duration)
          .attrTween("d", function (d) {
            return function (t) {
              const i2 = d3.interpolateNumber(
                i(loop_transition[0] / 100),
                i(loop_transition[1] / 100)
              );
              const iv = d3.interpolateNumber(
                loop_transition[0],
                loop_transition[1]
              );
              const progress = arc.endAngle(i2(t));
              meterText.text(`${Math.round(iv(t))}%`);
              return progress();
            };
          })
          .transition()
          .delay(1000)
          .duration(throttle_duration)
          .attrTween("d", function (d) {
            return function (t) {
              const i2 = d3.interpolateNumber(
                i(loop_transition[1] / 100),
                i(loop_transition[0] / 100)
              );
              const iv = d3.interpolateNumber(
                loop_transition[1],
                loop_transition[0]
              );
              const progress = arc.endAngle(i2(t));
              meterText.text(`${Math.round(iv(t))}%`);
              return progress();
            };
          })
          .on("end", repeat);
      }
      if (index == values.length - 1) {
        tr.on("end", repeat);
      }
    });
  }, [width, height])

  return (
    <Card className="risk-rating">
      <CardBody>
        <CardTitle className="mb-4">Risk Rating</CardTitle>
        <div className="d-flex align-items-center justify-content-center">
          <div ref={chartRef}></div>
        </div>
      </CardBody>
    </Card>
  );
}
