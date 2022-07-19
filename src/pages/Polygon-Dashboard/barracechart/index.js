import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { sliderBottom } from "d3-simple-slider";
import data from "./data";
import coins_data from "./coins_data";
import "./index.module.css";

function BarChartRace() {
  const chartRef = useRef();
  const [width, setwidth] = useState(500);

  const n = 6;
  const k = 10;
  const barSize = 60;
  const margin = { top: 0, right: 140, bottom: 100, left: 40 };
  const height = margin.top + barSize * n + margin.bottom;
  const duration = 250;
  const names = new Set(data.map(d => d.name));
  const datevalues = Array.from(
    d3.rollup(
      data,
      ([d]) => d.value,
      d => d.date,
      d => d.name
    )
  )
    .map(([date, data]) => [new Date(date), data])
    .sort(([a], [b]) => d3.ascending(a, b));
  const _rank = rank(name => datevalues[0][1].get(name));
  const keyframes = [];
  let ka, a, kb, b;
  for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
      const t = i / k;
      keyframes.push([
        new Date(ka * (1 - t) + kb * t),
        rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t),
      ]);
    }
  }
  keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
  const nameframes = d3.groups(
    keyframes.flatMap(([, data]) => data),
    d => d.name
  );
  const prev = new Map(
    nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a]))
  );
  const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));
  function rank(value) {
    const data = Array.from(names, name => ({ name, value: value(name) }));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
    return data;
  }

  const scale = d3.scaleOrdinal(d3.schemeTableau10);
  const color = d => {
    return scale(d.name);
  };

  const formatNumber = d3.format(",d");
  const formatDate = d3.utcFormat("%b %Y");
  const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right]);
  const y = d3
    .scaleBand()
    .domain(d3.range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(event => {
      const resizeWidth = event[0].contentBoxSize[0].inlineSize;
      const resizeHeight = event[0].contentBoxSize[0].blockSize;
      setwidth(resizeWidth);
    });

    resizeObserver.observe(chartRef.current);
  });
  useEffect(() => {
    drawChart();
  }, [width]);

  const drawChart = async () => {
    d3.select(chartRef.current).select("svg").remove();
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    // .attr("viewBox", [0, 0, width, height]);

    const updateAxis = axis(svg);
    const updateBars = bars(svg);
    const updateLabels = labels(svg);
    const updateIcons = icons(svg);
    const updateTicker = ticker(svg);

    const slider = sliderBottom()
      .min(d3.min(datevalues)[0])
      .max(d3.max(datevalues)[0])
      .step(1000 * 60 * 60 * 7)
      .width(width - margin.right)
      .tickFormat(d3.timeFormat("%b %Y"))
      .on("onchange", val => {
        const keyframe = keyframes.find(
          kf => new Date(kf[0]).getTime() === new Date(val).getTime()
        );

        if (keyframe) {
          const transition = svg
            .transition()
            .duration(duration)
            .ease(d3.easeLinear);
          x.domain([0, keyframe[1][0].value]);

          updateAxis(keyframe, transition);
          updateBars(keyframe, transition);
          updateLabels(keyframe, transition);
          updateIcons(keyframe, transition);
          updateTicker(keyframe, transition);
        }
      });

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height - 40})`)
      .call(slider);

    g.select(".track").attr("visibility", "hidden");
    g.select(".axis").attr("visibility", "hidden");
    g.select(".parameter-value").select("text").style("fill", "white");
    g.select(".track-inset").attr("stroke", "#596088").attr("stroke-width", 3);
    g.select(".parameter-value").select("path").attr("d", "");
    g.select(".parameter-value")
      .append("circle")
      .attr("width", 22)
      .attr("height", 22)
      .attr("r", 11)
      .attr("fill", "white");

    g.call(slider);

    for (const keyframe of keyframes) {
      const transition = svg
        .transition()
        .duration(duration)
        .ease(d3.easeLinear);

      x.domain([0, keyframe[1][0].value]);

      updateAxis(keyframe, transition);
      updateBars(keyframe, transition);
      updateLabels(keyframe, transition);
      updateIcons(keyframe, transition);
      updateTicker(keyframe, transition);

      await transition.end();
    }
  };

  const bars = svg => {
    let bar = svg.append("g").selectAll("rect");

    return ([date, data], transition) =>
      (bar = bar
        .data(data.slice(0, n), d => d.name)
        .join(
          enter =>
            enter
              .append("rect")
              .style("fill", function (d) {
                const coin = coins_data.find(c => c.name == d.name);
                const { color_from, color_to } = coin || {
                  color_from: color(d),
                  color_to: "#8247E533",
                };
                gradient(
                  svg,
                  color_from,
                  color_to,
                  "grad" + d.name,
                  "0%",
                  "100%",
                  "0%",
                  "100%",
                  0.4,
                  1
                );
                return "url(#grad" + d.name + ")";
              })
              .attr("height", y.bandwidth())
              .attr("x", x(0))
              .attr("y", d => y((prev.get(d) || d).rank))
              .attr("rx", 8)
              .attr("width", d => x((prev.get(d) || d).value) - x(0)),
          update => update,
          exit =>
            exit
              .transition(transition)
              .remove()
              .attr("y", d => y((next.get(d) || d).rank))
              .attr("width", d => x((next.get(d) || d).value) - x(0))
        )
        .call(bar =>
          bar
            .transition(transition)
            .attr("y", d => y(d.rank))
            .attr("width", d => x(d.value) - x(0))
        ));
  };

  const labels = svg => {
    let label = svg
      .append("g")
      .style("font-size", "12px")
      .style("font-family", "Inter, sans-serif")
      .style("font-variant-numeric", "tabular-nums")
      .style("fill", "#FFFFFFCC")
      .attr("text-anchor", "end")
      .selectAll("text");

    return ([date, data], transition) =>
      (label = label
        .data(data.slice(0, n), d => d.name)
        .join(
          enter =>
            enter
              .append("text")
              .attr(
                "transform",
                d =>
                  `translate(${x((prev.get(d) || d).value)},${y(
                    (prev.get(d) || d).rank
                  )})`
              )
              .attr("y", barSize / 2)
              .attr("text-anchor", "start")
              .attr("x", 40)
              .text(d => d.name)
              .call(text =>
                text
                  .append("tspan")
                  .attr("fill-opacity", 0.7)
                  .attr("font-weight", "normal")
                  .attr("text-anchor", "start")
                  .attr("x", 80)
              ),
          update => update,
          exit =>
            exit
              .transition(transition)
              .remove()
              .attr(
                "transform",
                d =>
                  `translate(${x((next.get(d) || d).value)},${y(
                    (next.get(d) || d).rank
                  )})`
              )
              .call(g =>
                g
                  .select("tspan")
                  .tween("text", d =>
                    textTween(d.value, (next.get(d) || d).value)
                  )
              )
        )
        .call(bar =>
          bar
            .transition(transition)
            .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
            .call(g =>
              g
                .select("tspan")
                .tween("text", d =>
                  textTween((prev.get(d) || d).value, d.value)
                )
            )
        ));
  };

  const icons = svg => {
    let label = svg.append("g").selectAll("icon");

    return ([date, data], transition) =>
      (label = label
        .data(data.slice(0, n), d => d.name)
        .join(
          enter =>
            enter
              .append("svg:image")
              .attr("xlink:href", d => {
                const icon = coins_data.find(c => c.name == d.name)?.icon;
                return icon;
              })
              .attr("width", 24)
              .attr("height", 24)
              .attr(
                "transform",
                d =>
                  `translate(${x((prev.get(d) || d).value)},${y(
                    (prev.get(d) || d).rank
                  )})`
              )
              .attr("y", y.bandwidth() / 4)
              .attr("x", 9),
          update => update,
          exit =>
            exit
              .transition(transition)
              .remove()
              .attr(
                "transform",
                d =>
                  `translate(${x((next.get(d) || d).value)},${y(
                    (next.get(d) || d).rank
                  )})`
              )
              .call(g =>
                g
                  .select("tspan")
                  .tween("text", d =>
                    textTween(d.value, (next.get(d) || d).value)
                  )
              )
        )
        .call(bar =>
          bar
            .transition(transition)
            .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
            .call(g =>
              g
                .select("tspan")
                .tween("text", d =>
                  textTween((prev.get(d) || d).value, d.value)
                )
            )
        ));
  };

  const textTween = (a, b) => {
    const i = d3.interpolateNumber(a, b);
    return function (t) {
      this.textContent = formatNumber(i(t)) + "%";
    };
  };

  const axis = svg => {
    const g = svg
      .append("g")
      .attr("transform", `translate(-16,${height - 80})`);

    const axis = d3
      .axisBottom(x)
      .ticks(width / 160)
      .tickFormat(function (d) {
        return d + "%";
      })
      .tickSizeOuter(2)
      .tickSizeInner(-barSize * (n + y.padding()) - margin.top);

    return (_, transition) => {
      g.transition(transition).call(axis);
      g.select(".tick:first-of-type text").remove();
      g.selectAll("g.tick line").attr("stroke", "#2B2F39");
      g.select(".domain").remove();
    };
  };

  const ticker = svg => {
    const now = svg
      .append("text")
      .style("font-size", "30px")
      .style("font-weight", "bold")
      .style("font-family", "sequel_100_wide45")
      .style("fill", "#888E9D")
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .attr("x", width - 6)
      .attr("y", margin.top + barSize * (n - 0.45))
      .attr("dy", "0.32em")
      .text(formatDate(keyframes[0][0]));

    return ([date], transition) => {
      transition.end().then(() => now.text(formatDate(date)));
    };
  };

  const gradient = (
    svg,
    color_from,
    color_to,
    id,
    x1,
    x2,
    off1,
    off2,
    op1,
    op2
  ) => {
    svg
      .append("defs")
      .append("linearGradient")
      .attr("id", id)
      .attr("x1", x1)
      .attr("y1", "0%")
      .attr("x2", x2)
      .attr("y2", "0%");
    const idtag = "#" + id;
    d3.select(idtag)
      .append("stop")
      .attr("stop-color", color_to)
      .attr("class", "begin")
      .attr("offset", off1)
      .attr("stop-opacity", op1);
    d3.select(idtag)
      .append("stop")
      .attr("class", "end")
      .attr("stop-color", color_from)
      .attr("offset", off2)
      .attr("stop-opacity", op2);
  };

  return (
    <div>
      <div ref={chartRef} />
    </div>
  );
}

export default BarChartRace;
