import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import * as d3 from 'd3'

import ChartActionButtons from 'components/Common/ChartActionButtons'

import dummy from './dummy.json'

export default function UserRetentionCard() {
  const divRef = useRef()
  const [chartSize, setChartSize] = useState({ width: 800, height: 600 })

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Reduce title height
        setChartSize({ width: entry.contentRect.width, height: entry.contentRect.height })
      }
    })

    resizeObserver.observe(divRef.current)

    return () => {
      resizeObserver.unobserve(divRef.current)
    }
  }, [])

  useEffect(() => {
    const data = dummy
    const gridWidth = chartSize.width
    const gridHeight = chartSize.height
    const dateFormat = d3.utcFormat("%b %d, %Y")
    const leftMargin = 140
    const maxCohorts = 15
    const numCohorts = d3.max(data, d => d.period_number)


    const allCohorts = Array.from(new d3.InternSet(data.map(d => d.cohort_date))).sort(d3.descending);
    const visibleCohorts = new d3.InternMap(allCohorts.slice(0, maxCohorts + 1).map(d => [d, true]));
    const visibleData = data.filter(d => visibleCohorts.has(d.cohort_date));

    const userCounts = new d3.InternMap(visibleData.filter(d => d.period_number === 0).map(({ cohort_date, users }) => [cohort_date, users]))
    const retentionCohorts = visibleData.filter(d => d.period_number > 0);

    const cohortDates = Array.from(new d3.InternSet(retentionCohorts.map(d => d.cohort_date))).sort(d3.ascending);
    const periodNumbers = Array.from(new Set(retentionCohorts.map(d => d.period_number))).sort(d3.ascending);

    const margin = { top: 20, right: 10, bottom: 0, left: leftMargin };

    const x = d3.scaleBand()
      .domain(periodNumbers)
      .rangeRound([margin.left, gridWidth - margin.right]);

    const y = d3.scaleBand()
      .domain(cohortDates)
      .rangeRound([margin.top, gridHeight - margin.bottom]);

    const color = d3.scaleSequential(d3.interpolateYlGnBu)
      .domain([0, d3.max(retentionCohorts, d => d.percentage)]);

    const label = d => d3.format(".1%")(d.percentage);

    // Put inside a div to enable horizontal scrolling on a small screen
    const div = d3.select(divRef.current)
      .style("overflow-x", "auto")
      .style("font-variant-numeric", "tabular-nums");

    div.selectAll("*").remove(); // Clear svg content before adding new elements

    const svg = div.append("svg")
      .attr("viewBox", [0, 0, gridWidth, gridHeight])
      .attr("width", gridWidth);

    // Background rect that you can click on to clear the selection
    svg.append("rect")
      .attr("width", gridWidth)
      .attr("height", gridHeight)
      .attr("fill", "transparent")

    const g = svg.append("g")
      .attr("shape-rendering", "crispEdges")
      .style("cursor", "default");

    const row = g.selectAll(".row")
      .data(d3.groups(retentionCohorts, d => d.cohort_date))
      .join("g")
      .attr("class", "row")
      .attr("transform", ([cohort_date, _]) => `translate(0,${y(cohort_date)})`)
      .on("mouseenter", rowEnter)
      .on("mouseleave", rowLeave);

    // Background for row labels, to catch mouse events
    row.append("rect")
      .attr("width", x(1))
      .attr("height", y.bandwidth())
      .attr("fill", "transparent");

    const rowLabel = row.append("g")
      .attr("font-size", "10px")
      .attr("font-family", "var(--sans-serif)")
      .attr("fill", "white")

    rowLabel
      .append("text")
      .text(([cohort_date, _]) => dateFormat(new Date(cohort_date)))
      .attr("x", 2)
      .attr("y", y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("color", "white");

    rowLabel
      .append("text")
      .text(([cohort_date, _]) => d3.format(",")(userCounts.get(cohort_date)))
      .attr("x", margin.left - 7)
      .attr("y", y.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dy", "0.35em")

    const rowHighlight = g.append("rect")
      .style("display", "none")
      .attr("x", 0.5)
      .attr("height", y.bandwidth() - 0.5)
      .attr("stroke", "#bbb")
      .attr("fill", "none")
      .attr("pointer-events", "none");

    const cell = row.selectAll(".cell")
      .data(([_, values]) => values)
      .join("g")
      .attr("class", "cell")
      .attr("transform", d => `translate(${x(d.period_number)},0)`)
      .on("mouseenter", cellEnter)
      .on("mouseleave", cellLeave)

    cell.append("rect")
      .attr("fill", d => color(d.percentage))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth());

    cell.append("text")
      .text(label)
      .attr("fill", d => d3.lab(color(d.percentage)).l < 55 ? "white" : "black")
      .attr("x", x.bandwidth() - 5)
      .attr("y", y.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dy", "0.35em")
      .attr("font-size", "10px")
      .attr("font-family", "var(--sans-serif)");

    cell.append("title")
      .text(d => `${dateFormat(new Date(d.period_date))}`)

    svg.append("g")
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x))
      .call(g => g.selectAll(".domain, .tick line").remove())
      .call(g => g.selectAll("text").attr("font-family", "var(--sans-serif)"));

    const cellHighlight = g.append("rect")
      .style("display", "none")
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("stroke-width", 2)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("pointer-events", "none");

    function highlightCell(datum) {
      cellHighlight
        .attr("x", x(datum.period_number))
        .attr("y", y(datum.cohort_date))
        .style("display", null);
    }

    function highlightRow(cohort) {
      rowHighlight
        .attr("y", d => y(cohort) + 0.5)
        .attr("width", () => {
          return x(d3.max(retentionCohorts.filter(d => +cohort === +d.cohort_date), 0)) + x.bandwidth() - 0.5
        })
        .style("display", null);
    }

    function rowEnter(_, datum) {
      highlightRow(datum[0]);
    }

    function rowLeave() {
      rowHighlight.style("display", "none");
      cellLeave();
    }

    function cellEnter(_, datum) {
      highlightCell(datum);
    }

    function cellLeave() {
      cellHighlight.style("display", "none");
    }
  }, [chartSize])

  return (
    <>
      <ChartActionButtons />
      <Card>
        <CardBody>
          <h4>User Retention</h4>
          <div ref={divRef}></div>
        </CardBody>
      </Card>
    </>
  )
}
