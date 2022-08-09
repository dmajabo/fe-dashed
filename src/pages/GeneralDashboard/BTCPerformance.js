import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as moment from "moment";
import { Card, CardBody, CardTitle } from "reactstrap";
import BTCHistoricalData from "./BTC_Historical_2020-2021.json";
import "./BTCPerformance.scss";

const data = BTCHistoricalData.filter(
  v =>
    moment(v.Date, "MM/DD/YY").isAfter("2019-12-31") &&
    moment(v.Date, "MM/DD/YY").isBefore("2022-01-01")
).sort((a, b) => moment(a).valueOf() - moment(b).valueOf());

const BTCPerformance = () => {
  const [chartSize, setChartSize] = useState();

  useEffect(() => {
    const cardEl = document.getElementsByClassName("btc-montly-performance")[0];
    const tableEl = cardEl.getElementsByClassName("card-body")[0];

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Reduce title height
        setChartSize({
          width: entry.contentRect.width,
          height: Math.max(entry.contentRect.height, 0) - 48,
        });
      }
    });

    resizeObserver.observe(tableEl);

    return () => {
      resizeObserver.unobserve(tableEl);
    };
  }, []);

  return (
    <Card className="btc-montly-performance">
      <CardBody>
        <CardTitle className="mb-4">
          Bitcoin Monthly Performance (2020 - 2021)
        </CardTitle>
        <div className="" style={{ background: "transparent" }}>
          <HeatMapChart
            data={data}
            showColorLegend={true}
            dimensions={{
              x: d => new Date(d.Date),
              y: d => d["Daily Change"] / 100,
              yFormat: "+%",
              weekday: "sunday",
              cellSize: 15,
            }}
            options={{
              legendTitle: "Daily change",
              tickFormat: "+%",
              legendWidth: 600,
              legendHeight: 60,
            }}
            size={chartSize}
          />
        </div>
        <div id="heatmap-tooltip"></div>
      </CardBody>
    </Card>
  );
};

const formatDate = d3.utcFormat("%B %-d, %Y");

const HeatMapChart = ({
  data = [],
  showColorLegend = false,
  colorOption = d3.scaleLinear().range(["#D1285A", "#35EA93"]),
  dimensions: {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    // width = 928, // width of the chart, in pixels,
    cellSize = 17, // width and height of an individual day, in pixels
    weekday = "monday", // either: weekday, sunday, or monday
    formatDay = i => "SMTWTFS"[i], // given a day number in [0, 6], the day-of-week label
    formatMonth = "%b", // format specifier string for months (above the chart)
    yFormat, // format specifier string for values (in the title)
  } = {},
  options: {
    legendTitle,
    tickSize = 6,
    legendWidth = 320,
    legendHeight = 44 + tickSize,
    legendSpacingTop = 20,
    legendSpacingRight = 20,
    legendSpacingBottom = 10 + tickSize,
    legendSpacingLeft = 0,
    ticks = legendWidth / 64,
    tickFormat,
    tickValues,
  } = {},
  size = { width: 100, height: 100 },
}) => {
  const svgRef = React.useRef(null);

  const ramp = (color, n = 256) => {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  };

  const drawChart = () => {
    const cellSpacingY = 2,
      cellSpacingX = 2,
      monthSpacing = 10,
      monthLabelSpacing = 15,
      weekDayLabelSpacing = 20,
      yearSpacing = 18;
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements

    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const I = d3.range(X.length);

    const countDay = weekday === "sunday" ? i => i : i => (i + 6) % 7;
    const timeWeek = weekday === "sunday" ? d3.utcSunday : d3.utcMonday;
    const weekDays = weekday === "weekday" ? 5 : 7;
    const height =
      (cellSize + cellSpacingY) * weekDays +
      cellSpacingY +
      yearSpacing +
      monthLabelSpacing +
      20;
    const width =
      ((cellSize + cellSpacingX) * 6 + cellSpacingX + monthSpacing) * 12 +
      weekDayLabelSpacing +
      50;

    // Compute a color scale. This assumes a diverging color scheme where the pivot
    // is zero, and we want symmetric difference around zero.
    const max = d3.quantile(Y, 0.9975, Math.abs);
    const color = d3
      .scaleSequential([-0.05, 0.05], colorOption)
      .unknown("none");

    // Construct formats.
    formatMonth = d3.utcFormat(formatMonth);
    const formatValue = color.tickFormat(100, yFormat);

    // Group the index by year, in reverse input order. (Assuming that the input is
    // chronological, this will show years in reverse chronological order.)
    const years = d3.groups(I, i => X[i].getUTCFullYear()).reverse();

    const chartHeight =
      height * years.length +
      legendHeight +
      legendSpacingTop +
      legendSpacingBottom;

    const svg = svgEl
      .attr("width", size.width)
      .attr("height", size.height)
      .attr("viewBox", [0, 0, width, chartHeight])
      .attr("style", `width: 100%;`)
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

    const tooltip = d3.select("#heatmap-tooltip");

    const year = svg
      .selectAll("g")
      .data(years)
      .join("g")
      .attr(
        "transform",
        (d, i) => `translate(50, ${height * i + monthLabelSpacing + 20})`
      );

    year
      .append("text")
      .attr("x", 0)
      .attr("y", -monthLabelSpacing)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .attr("class", "year")
      .text(([key]) => key);

    year
      .append("g")
      .attr("text-anchor", "end")
      .selectAll("text")
      .data(weekday === "weekday" ? d3.range(1, 6) : d3.range(7))
      .join("text")
      .attr("x", 0)
      .attr("y", i => i * (cellSize + cellSpacingY) + cellSpacingY)
      .attr("dy", cellSize - (cellSize - 10))
      .attr("class", "weekday")
      .text(formatDay);

    const monthContainerWidth = (cellSize + cellSpacingX) * 6 + cellSpacingX;
    const monthContainerHeight =
      (cellSize + cellSpacingY) * weekDays + cellSpacingY;

    year
      .append("g")
      .selectAll("rect")
      .data(([, I]) => d3.utcMonths(d3.utcMonth(X[I[0]]), X[I[I.length - 1]]))
      .join("rect")
      .attr("width", monthContainerWidth)
      .attr("height", monthContainerHeight)
      .attr("x", (d, i) => {
        return (monthContainerWidth + monthSpacing) * i + weekDayLabelSpacing;
      })
      .attr("y", 0)
      .attr("fill", "#000000")
      .attr("opacity", "0");

    const cell = year
      .append("g")
      .selectAll("rect")
      .data(
        weekday === "weekday"
          ? ([, I]) => I.filter(i => ![0, 6].includes(X[i].getUTCDay()))
          : ([, I]) => I
      )
      .join("rect")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", i => {
        const monthNumber = moment(X[i]).month();
        const monthContainerPositionX =
          (monthContainerWidth + monthSpacing) * monthNumber +
          cellSpacingX +
          weekDayLabelSpacing;
        const cellPositionX =
          timeWeek.count(d3.utcYear(X[i]), d3.utcMonth(X[i])) *
            (cellSize + cellSpacingX) +
          cellSpacingX +
          weekDayLabelSpacing;
        const offsetX = monthContainerPositionX - cellPositionX;
        return (
          timeWeek.count(d3.utcYear(X[i]), X[i]) * (cellSize + cellSpacingX) +
          cellSpacingX +
          weekDayLabelSpacing +
          offsetX
        );
      })
      .attr("y", i => {
        const weekdayIndex = countDay(X[i].getUTCDay());
        return weekdayIndex * (cellSize + cellSpacingY) + cellSpacingY;
      })
      .attr("fill", i => color(Y[i]))
      .on("mouseover", (e, i) => {
        tooltip.style("visibility", "visible");
        tooltip.style("left", `${e.offsetX}px`);
        tooltip.style("top", `${e.offsetY + 80}px`);
        tooltip.html(`
          <div class="date">${formatDate(X[i])}</div>
          <div class="d-flex align-items-center">
            <span class="indicator" style="background-color: ${color(
              Y[i]
            )}"></span>
            ${formatValue(Y[i])}
          </div>
        `);
      })
      .on("mousemove", e => {
        tooltip.style("left", `${e.offsetX}px`);
        tooltip.style("top", `${e.offsetY + 80}px`);
      })
      .on("mouseout", i => {
        return tooltip.style("visibility", "hidden");
      });

    const month = year
      .append("g")
      .selectAll("g")
      .data(([, I]) => d3.utcMonths(d3.utcMonth(X[I[0]]), X[I[I.length - 1]]))
      .join("g");

    month
      .append("text")
      .attr(
        "x",
        (d, i) => (monthContainerWidth + monthSpacing) * i + weekDayLabelSpacing
      )
      .attr("y", -monthLabelSpacing)
      .attr("class", "month")
      .text(formatMonth);

    if (showColorLegend) {
      const legendColors = d3.scaleDiverging(
        [-0.05, 0, 0.05],
        d3.scaleLinear().range(["#D1285A", "#35EA93"])
      );

      const legned = svg
        .append("g")
        .attr(
          "transform",
          (d, i) => `translate(50, ${height * years.length + legendSpacingTop})`
        );

      let tickAdjust = g =>
        g
          .selectAll(".tick line")
          .attr("y1", legendSpacingTop + legendSpacingBottom - legendHeight);
      let x;

      // Continuous
      if (legendColors.interpolate) {
        const n = Math.min(
          legendColors.domain().length,
          legendColors.range().length
        );

        x = legendColors
          .copy()
          .rangeRound(
            d3.quantize(
              d3.interpolate(
                legendSpacingLeft,
                legendWidth - legendSpacingRight
              ),
              n
            )
          );

        legned
          .append("image")
          .attr("x", legendSpacingLeft)
          .attr("y", legendSpacingTop)
          .attr("width", legendWidth - legendSpacingLeft - legendSpacingRight)
          .attr("height", legendHeight - legendSpacingTop - legendSpacingBottom)
          .attr("preserveAspectRatio", "none")
          .attr(
            "xlink:href",
            ramp(
              legendColors.copy().domain(d3.quantize(d3.interpolate(0, 1), n))
            ).toDataURL()
          );
      }

      // Sequential
      else if (legendColors.interpolator) {
        x = Object.assign(
          legendColors
            .copy()
            .interpolator(
              d3.interpolateRound(
                legendSpacingLeft,
                legendWidth - legendSpacingRight
              )
            ),
          {
            range() {
              return [legendSpacingLeft, legendWidth - legendSpacingRight];
            },
          }
        );

        legned
          .append("image")
          .attr("x", legendSpacingLeft)
          .attr("y", legendSpacingTop)
          .attr("width", legendWidth - legendSpacingLeft - legendSpacingRight)
          .attr("height", legendHeight - legendSpacingTop - legendSpacingBottom)
          .attr("preserveAspectRatio", "none")
          .attr("xlink:href", ramp(legendColors.interpolator()).toDataURL());

        // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
          if (tickValues === undefined) {
            const n = Math.round(ticks + 1);
            tickValues = d3
              .range(n)
              .map(i => d3.quantile(legendColors.domain(), i / (n - 1)));
          }
          if (typeof tickFormat !== "function") {
            tickFormat = d3.format(
              tickFormat === undefined ? ",f" : tickFormat
            );
          }
        }
      }

      // Threshold
      else if (legendColors.invertExtent) {
        const thresholds = legendColors.thresholds
          ? legendColors.thresholds() // scaleQuantize
          : legendColors.quantiles
          ? legendColors.quantiles() // scaleQuantile
          : legendColors.domain(); // scaleThreshold

        const thresholdFormat =
          tickFormat === undefined
            ? d => d
            : typeof tickFormat === "string"
            ? d3.format(tickFormat)
            : tickFormat;

        x = d3
          .scaleLinear()
          .domain([-1, legendColors.range().length - 1])
          .rangeRound([legendSpacingLeft, legendWidth - legendSpacingRight]);

        legned
          .append("g")
          .selectAll("rect")
          .data(legendColors.range())
          .join("rect")
          .attr("x", (d, i) => x(i - 1))
          .attr("y", legendSpacingTop)
          .attr("width", (d, i) => x(i) - x(i - 1))
          .attr("height", legendHeight - legendSpacingTop - legendSpacingBottom)
          .attr("fill", d => d);

        tickValues = d3.range(thresholds.length);
        tickFormat = i => thresholdFormat(thresholds[i], i);
      }

      // Ordinal
      else {
        x = d3
          .scaleBand()
          .domain(s.domain())
          .rangeRound([legendSpacingLeft, legendWidth - legendSpacingRight]);

        legned
          .append("g")
          .selectAll("rect")
          .data(legendColors.domain())
          .join("rect")
          .attr("x", x)
          .attr("y", legendSpacingTop)
          .attr("width", Math.max(0, x.bandwidth() - 1))
          .attr("height", legendHeight - legendSpacingTop - legendSpacingBottom)
          .attr("fill", legendColors);

        tickAdjust = () => {};
      }

      legned
        .append("g")
        .attr("transform", `translate(0,${legendHeight - legendSpacingBottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(
              ticks,
              typeof tickFormat === "string" ? tickFormat : undefined
            )
            .tickFormat(
              typeof tickFormat === "function" ? tickFormat : undefined
            )
            .tickSize(tickSize)
            .tickValues(tickValues)
        )
        .call(tickAdjust)
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .append("text")
            .attr("x", legendSpacingLeft)
            .attr(
              "y",
              legendSpacingTop + legendSpacingBottom - legendHeight - 15
            )
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .attr("class", "title color-legend-title")
            .text(legendTitle)
        );
    }

    Object.assign(svg.node(), { scales: { color } });
  };

  React.useEffect(() => {
    drawChart();
  }, [data, size]);

  return <svg ref={svgRef} width="100%" />;
};

export default BTCPerformance;
