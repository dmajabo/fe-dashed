import React, { useState, useEffect, lazy } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Container,
  Modal,
  Row,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";

import { IconChevronLeft } from "../Icon";

import { templates } from "./charts";
import { fetchCategories, fetchPrices } from "./data";
import { getOption } from "./options";

const coinIcons = {
  Polygon: "MATIC",
  Avalanche: "AVAX",
  Solana: "SOL",
};

const ChartPicker = ({ modalOpen, setModalOpen, chartPicked }) => {
  const [step, setStep] = React.useState(2);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedChart, setSelectedChart] = useState(templates[0].charts[0]);
  const [selectedChartType, setselectedChartType] = useState(
    templates[0].charts[0].chart_list[0]
  );
  const [chartData, setChartData] = useState();
  const [chartOption, setchartOption] = useState({});
  const [chartProps, setchartProps] = useState({});
  const [loading, setloading] = useState(false);
  const [chartCategory, setChartCategory] = useState(null);

  useEffect(() => {
    if (step == 2) {
      setSelectedTemplate(templates[0]);
    } else if (step == 3) {
      setSelectedChart(selectedTemplate?.charts[0] || []);
      setChartCategory(selectedTemplate?.charts[0].category || null);
    }
    if (step == 4) {
      selectChart(selectedChart?.chart_list[0].chart || []);
    }
    if (step == 5) {
      const fetchData =
        selectedChart.id == "daily-performance-by-sector"
          ? fetchCategories
          : fetchPrices;

      selectedChartType.id == "bubble" &&
        setchartProps({
          xAxisName: "Market Capitalization",
          yAxisName: "Percentage Change",
        });

      setloading(true);
      fetchData().then(data => {
        const chartOption = getOption(selectedChartType.id, data);

        setchartOption(chartOption);
        setloading(false);
      });
    }
  }, [step]);

  const selectChart = chart => {
    setselectedChartType(chart);
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
                  onClick={() => {
                    setSelectedChart(chart);
                    setChartCategory(chart.category || null);
                  }}
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
          {loading ? (
            "loading..."
          ) : (
            <div
              style={{
                width: "100%",
                height: "300px",
                padding: "5px",
                borderRadius: "10px",
                border: "1px solid #414141",
              }}
            >
              <Chart option={chartOption} category={chartCategory} />
            </div>
          )}
        </div>
      );
    }
  };

  const handleNextStep = () => {
    const newStep = step + 1;

    if (step > 4) {
      const isLayer1YTD = selectedChart?.id === "layer-1-performance-by-ytd";
      // close modal and render chart
      // reset step
      const { component: Chart, id } = selectedChartType;
      setModalOpen(false);
      setStep(2);
      chartPicked(() => (
        <Card>
          <CardBody className="d-flex flex-column h-100">
            <CardTitle
              className={isLayer1YTD ? "layer-1-card-title" : ""}
              style={{ marginBottom: "24px" }}
            >
              {id == "pie" && (
                <img
                  src={`/coin_icons/${coinIcons[chartCategory]}.png`}
                  width={32}
                  height={32}
                  className="me-2"
                />
              )}
              {selectedChart?.title}
            </CardTitle>
            <CardSubtitle
              className={isLayer1YTD ? "layer-1-card-subtitle" : ""}
            >
              {selectedChart?.sub_title}
            </CardSubtitle>

            <Chart option={chartOption} category={chartCategory} />
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
