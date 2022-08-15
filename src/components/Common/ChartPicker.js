import React, { useState, useEffect, lazy } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  Row,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import axios from "axios";
import * as echarts from "echarts";
import * as d3 from "d3";

import PolygonFrams from "../../pages/Polygon-Dashboard/polygonFarms";
import PolygonTransactions from "pages/Polygon-Dashboard/polygonTransactions";
import Scatter from "pages/AllCharts/echart/scatterchart";
import BubbleChart from "pages/AllCharts/echart/bubblechart";
import SankeyChart from "pages/AllCharts/nivo/SankeyChart";
import ButterflyChart from "pages/AllCharts/ButterflyChart/ButterflyChart";

import stackedArea from "../../assets/images/charts/stacked-area.svg";
import scatterPlot from "../../assets/images/charts/scatter-plot.svg";
import sankey from "../../assets/images/charts/sankey.svg";
import radar from "../../assets/images/charts/radar.svg";
import pie from "../../assets/images/charts/pie.svg";
import line from "../../assets/images/charts/line.svg";
import guage from "../../assets/images/charts/guage.svg";
import donut from "../../assets/images/charts/donut.svg";
import circle from "../../assets/images/charts/circle.svg";
import butterfly from "../../assets/images/charts/butterfly.svg";
import bubble from "../../assets/images/charts/bubble.svg";
import bar from "../../assets/images/charts/bar.svg";
import linebar from "../../assets/images/charts/linebar.svg";
import { IconChevronLeft } from "./Icon";

const chart_list = {
  circle: {
    id: "circle",
    title: "Circle Pack",
    preview: circle,
    component: PolygonFrams,
  },
  bubble: {
    id: "bubble",
    title: "Bubble Chart",
    preview: bubble,
    component: Scatter,
  },
  line: {
    id: "line",
    title: "Line",
    preview: line,
    component: PolygonFrams,
  },
  pie: {
    id: "pie",
    title: "Pie",
    preview: pie,
    component: PolygonFrams,
  },
  bar: {
    id: "bar",
    title: "Bar",
    preview: bar,
    component: PolygonTransactions,
  },
  stacked: {
    id: "stacked",
    title: "Stacked Area",
    preview: stackedArea,
    component: PolygonFrams,
  },
  scatter: {
    id: "scatter",
    title: "Scatter",
    preview: scatterPlot,
    component: Scatter,
  },
  sankey: {
    id: "sankey",
    title: "Sankey / Alluvial",
    preview: sankey,
    component: SankeyChart,
  },
  butterfly: {
    id: "butterfly",
    title: "Butterfly",
    preview: butterfly,
    component: ButterflyChart,
  },
  linebar: {
    id: "linebar",
    title: "line + bar",
    preview: linebar,
    component: PolygonTransactions,
  },
};

const templates = [
  {
    id: "blockchain-activity",
    title: "⛓️ Blockchain Activity",
    charts: [
      {
        id: 1,
        title: "Top Polygon Farms by TVL",
        chart_list: [
          {
            chart: chart_list.pie,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bar,
            disabled: true,
          },
          {
            chart: chart_list.linebar,
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        title: "Top Avalanche Farms by TVL",
        chart_list: [
          {
            chart: chart_list.pie,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bar,
            disabled: true,
          },
          {
            chart: chart_list.linebar,
            disabled: true,
          },
        ],
        disabled: true,
      },
      {
        id: 3,
        title: "Top Solana Farms by TVL",
        chart_list: [
          {
            chart: chart_list.pie,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bar,
            disabled: true,
          },
          {
            chart: chart_list.linebar,
            disabled: true,
          },
        ],
        disabled: true,
      },
    ],
  },
  {
    id: "market-data",
    title: "💹 Market Data",
    charts: [
      {
        id: 1,
        title: "Daily Performance by Sector",
        chart_list: [
          {
            chart: chart_list.bubble,
          },
          {
            chart: chart_list.scatter,
          },
          {
            chart: chart_list.bar,
          },
          {
            chart: chart_list.butterfly,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        title: "Prices by Market Cap",
        chart_list: [
          {
            chart: chart_list.butterfly,
          },
          {
            chart: chart_list.scatter,
          },
          {
            chart: chart_list.bubble,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
        ],
      },
      {
        id: 3,
        title: "Top Layer 1 by YTD",
        chart_list: [
          {
            chart: chart_list.butterfly,
          },
          {
            chart: chart_list.sankey,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bubble,
            disabled: true,
          },
          {
            chart: chart_list.scatter,
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    title: "🖼️ NFTS",
    disabled: true,
  },
  {
    title: "🔌 Exchange Activity",
    disabled: true,
  },
];

const ChartPicker = ({ modalOpen, setModalOpen, chartPicked }) => {
  const [step, setStep] = React.useState(2);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedChart, setSelectedChart] = useState(templates[0].charts[0]);
  const [selectedChartType, setselectedChartType] = useState(
    templates[0].charts[0].chart_list[0]
  );
  const [chartData, setChartData] = useState();
  const [chartOption, setchartOption] = useState({});

  const fetchData = async () => {
    const categories = [
      "decentralized-exchange",
      "defi-index",
      "governance",
      "metaverse",
      "polygon-ecosystem",
      "solana-ecosystem",
      "storage",
      "near-protocol-ecosystem",
    ];
    try {
      let { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/categories"
      );
      data = data
        .filter(({ id }) => categories.includes(id))
        .sort((a, b) => a.market_cap - b.market_cap)
        .map(({ market_cap, name, market_cap_change_24h }) => ({
          name,
          market_cap,
          market_cap_change_24h,
        }));

      console.log(data);
      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (step == 2) {
      setSelectedTemplate(templates[0]);
    } else if (step == 3) {
      setSelectedChart(selectedTemplate?.charts[0] || []);
    }
    if (step == 4) {
      selectChart(selectedChart?.chart_list[0].chart || []);
    }
  }, [step]);

  const selectChart = chart => {
    // setSelectedChart(index);
    setselectedChartType(chart);

    // const { id } = chart_list[index];
    let chartOption = {};

    switch (chart.id) {
      case "bar": // PolygonTransactions
        chartOption = {
          xAxis: [
            {
              type: "category",
              boundaryGap: true,
              axisTick: {
                show: false,
              },
              axisLabel: {
                fontWeight: "700",
                fontSize: 10,
                lineHeight: 17,
                color: "#5B6178",
                inside: true,
                rotate: 90,
              },
              data: chartData?.map(({ name }) => name),
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                show: false,
              },
              axisLabel: {
                formatter: "{value}%",
                fontWeight: "700",
                fontSize: 12,
                lineHeight: 24,
                color: "rgba(255, 255, 255, 0.6)",
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.2)",
                  type: [2, 2],
                },
              },
              splitNumber: 5,
            },
            {
              type: "value",
              axisLine: {
                show: false,
              },
              axisLabel: {
                fontWeight: "700",
                fontSize: 12,
                lineHeight: 24,
                color: "rgba(255, 255, 255, 0.6)",
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              splitNumber: 5,
            },
          ],
          series: [
            {
              name: "Market Cap",
              type: "bar",
              xAxisIndex: 0,
              yAxisIndex: 1,
              data: chartData?.map(({ market_cap }) => market_cap),
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#36F097",
                  },
                  {
                    offset: 1,
                    color: "rgba(54, 240, 151, 0.2)",
                  },
                ],
                global: false,
              },
            },
            {
              name: "Market Cap change 24h",
              type: "line",
              smooth: true,
              symbol: "none",
              data: chartData?.map(
                ({ market_cap_change_24h }) => market_cap_change_24h
              ),
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#B987FD",
                  },
                  {
                    offset: 1,
                    color: "#9548FC",
                  },
                ],
                global: false,
              },
            },
          ],
        };
        break;
      case "scatter": // Scatter
        chartOption = {
          xAxis: {
            data: chartData?.map(({ name }) => name),
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              inside: true,
              rotate: 90,
            },
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: "#75779A",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: function (value, index) {
                return value >= 0 ? "#00C482" : value < 0 ? "#FD2249" : "white";
              },
            },
          },
          dataZoom: null,
          series: [
            {
              data: chartData?.map(
                ({ market_cap_change_24h }) => market_cap_change_24h
              ),
              type: "scatter",
              colorBy: "data",
              itemStyle: {
                color: ({ value }) => {
                  return value > 0
                    ? "#00C482"
                    : value < 0
                    ? "#FD2249"
                    : "#919192";
                },
              },
            },
          ],
        };
        break;
      case "bubble": // Scatter
        chartOption = {
          tooltip: {
            show: false,
          },
          xAxis: {
            data: chartData.map(({ market_cap }) => market_cap),
            axisLine: {
              lineStyle: {
                color: "#484848",
              },
            },
            axisTick: {
              // show: false,
              lineStyle: {
                color: "#484848",
              },
            },
            showGrid: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#484848",
              },
            },
            axisLabel: {
              formatter: function (value) {
                return d3.format(".2s")(value).replace("G", "B");
              },
              color: "rgba(255, 255, 255, .6)",
              fontSize: 14,
            },
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: "#484848",
              },
            },
            axisTick: {
              show: true,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#484848",
              },
            },
            axisLabel: {
              formatter: "{value}%",
              color: function (value, index) {
                return value >= 0 ? "#00C482" : value < 0 ? "#FD2249" : "white";
              },
              fontSize: 14,
            },
          },
          dataZoom: {
            type: "inside",
          },
          series: [...new Array(2).keys()].map(i => ({
            symbolSize: function (value) {
              return Math.abs(value) * 5 + 40;
            },
            label: {
              show: true,
              formatter: function ({ value, name, dataIndex }) {
                if (i == 0) {
                  return `${value > 0 ? "+" : ""}${
                    Math.round(value * 100) / 100
                  }${value == 0 ? "" : "%"}`;
                } else {
                  return chartData[dataIndex].name;
                }
              },
              fontWeight: "bold",
              color: i == 0 ? "black" : "white",
              position: i == 0 ? "inside" : "bottom",
              fontSize: 12,
            },
            data: chartData.map(
              ({ market_cap_change_24h }) => market_cap_change_24h
            ),
            type: "scatter",
            colorBy: "data",
            itemStyle: {
              color: ({ value }) => {
                return value > 0
                  ? "#00C482"
                  : value < 0
                  ? "#FD2249"
                  : "#919192";
              },
            },
          })),
        };

        break;
      default:
        break;
    }

    setchartOption(chartOption);
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div>
          <h5>How would you like to create?</h5>
          <div className="btn-group-vertical" style={{ width: "100%" }}>
            <input
              type="radio"
              className="btn-check"
              name="vbtn-radio"
              id="vbtn-radio1"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-success"
              htmlFor="vbtn-radio1"
              style={{ width: "100%" }}
            >
              Preset Template
            </label>
            <input
              type="radio"
              className="btn-check"
              name="vbtn-radio"
              id="vbtn-radio2"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-success"
              htmlFor="vbtn-radio2"
              style={{ width: "100%" }}
            >
              Upload Data
            </label>
            <input
              type="radio"
              className="btn-check"
              name="vbtn-radio"
              id="vbtn-radio3"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-success"
              htmlFor="vbtn-radio3"
              style={{ width: "100%" }}
            >
              Paste Data
            </label>
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div>
          <h5>Select a template</h5>
          <div className="btn-group-vertical" style={{ width: "100%" }}>
            {templates.map(({ id, title, disabled = false }, index) => (
              <>
                <input
                  type="radio"
                  className="btn-check"
                  name="template"
                  id={`template-${index}`}
                  autoComplete="off"
                  checked={selectedTemplate.id == id}
                  disabled={disabled}
                  onChange={() => setSelectedTemplate(templates[index])}
                />
                <label
                  className="btn btn-outline-success"
                  htmlFor={`template-${index}`}
                  style={{ width: "100%" }}
                >
                  {title}
                </label>
              </>
            ))}
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div>
          <h5>{selectedTemplate.title}</h5>
          <div className="btn-group-vertical" style={{ width: "100%" }}>
            {selectedTemplate.charts.map((chart, index) => (
              <>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id={`chart-${index}`}
                  autoComplete="off"
                  checked={chart.id == selectedChart.id}
                />
                <label
                  className="btn btn-outline-success"
                  htmlFor={`chart-${index}`}
                  style={{ width: "100%" }}
                  onClick={() => setSelectedChart(chart)}
                >
                  {chart.title}
                </label>
              </>
            ))}
          </div>
        </div>
      );
    }

    if (step == 4) {
      return (
        <div>
          <div className="chart_list">
            {selectedChart?.chart_list?.map(({ chart, disabled }, index) => (
              <div
                key={index}
                onClick={() => !disabled && selectChart(chart)}
                className={`chart_card_container ${
                  selectedChartType?.id == chart.id && "active"
                } ${disabled && "disabled"}`}
              >
                <div className="chart_card">
                  <img src={chart.preview} alt="" className="" />
                  <p className="chart_title">{chart.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (step === 5) {
      const { component: Chart } = selectedChartType;
      return (
        <div className="d-flex flex-column">
          <h5>Preview</h5>
          <div
            style={{
              width: "100%",
              height: "300px",
              padding: "5px",
              borderRadius: "10px",
              border: "1px solid #414141",
            }}
          >
            <Chart option={chartOption} />
          </div>
        </div>
      );
    }
  };

  const handleNextStep = () => {
    const newStep = step + 1;

    if (step > 4) {
      // close modal and render chart
      // reset step
      const { component: Chart, id } = selectedChartType;
      setModalOpen(false);
      setStep(2);
      chartPicked(() => (
        <Card>
          <CardBody className="d-flex flex-column h-100">
            <CardTitle>
              {id == "pie" && (
                <img
                  src="/coin_icons/MATIC.png"
                  width={32}
                  height={32}
                  className="me-2"
                />
              )}
              {selectedChart.title}
            </CardTitle>
            <Chart option={chartOption} />
          </CardBody>
        </Card>
      ));
    } else {
      // set next step
      setStep(newStep);
    }
  };

  const handlePrevious = () => {
    const newStep = step - 1;

    if (step === 1) {
      // close modal and render chart
      // reset step
      setModalOpen(false);
      setStep(1);
    } else {
      // set next step
      setStep(newStep);
    }
  };

  return (
    <Offcanvas
      isOpen={modalOpen}
      direction="end"
      toggle={() => setModalOpen(!modalOpen)}
      className="offcanvas"
    >
      <OffcanvasHeader className="" toggle={() => setModalOpen(!modalOpen)}>
        <div className="d-flex align-items-center">
          {step > 2 && (
            <IconChevronLeft
              onClick={handlePrevious}
              style={{ marginRight: 16, cursor: "pointer" }}
            />
          )}
          {step == 4 ? "Select Chart" : "Add Chart"}
        </div>
      </OffcanvasHeader>
      <OffcanvasBody>
        {renderStep()}

        <Row style={{ marginTop: "24px" }}>
          <Col lg={6}>
            <button
              type="button"
              onClick={handlePrevious}
              className="btn btn-dark btn-rounded"
              data-toggle="modal"
              style={{ width: "100%" }}
              disabled={step === 1}
            >
              Previous
            </button>
          </Col>
          <Col lg={6}>
            <button
              type="button"
              onClick={handleNextStep}
              className="btn btn-success btn-rounded"
              data-toggle="modal"
              style={{ width: "100%" }}
            >
              {step >= 5 ? "Add Chart" : "Continue"}
            </button>
          </Col>
        </Row>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default ChartPicker;
