import React, { useState } from "react";
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

import PolygonFrams from "../../pages/Polygon-Dashboard/polygonFarms";
import PolygonTransactions from "pages/Polygon-Dashboard/polygonTransactions";
import Scatter from "pages/AllCharts/echart/scatterchart";

import img0 from "./../../assets/images/charts/bc-0.png";
import img1 from "./../../assets/images/charts/bc-1.png";
import img2 from "./../../assets/images/charts/bc-2.png";
import img3 from "./../../assets/images/charts/bc-3.png";
import img4 from "./../../assets/images/charts/bc-4.png";
import img5 from "./../../assets/images/charts/bc-5.png";

const chart_list = [
  { preview: img0, component: <PolygonFrams /> },
  { preview: img1, component: <PolygonFrams /> },
  { preview: img2, component: <PolygonFrams /> },
  { preview: img3, component: <PolygonTransactions /> },
  { preview: img4, component: <PolygonFrams /> },
  { preview: img5, component: <Scatter /> },
];

const templates = [
  {
    title: "⛓️ Blockchain Activity",
    charts: [
      { title: "Top Polygon Farms by TVL" },
      { title: "Top Avalanche Farms by TVL", disabled: true },
      { title: "Top Solana Farms by TVL", disabled: true },
    ],
  },
  {
    title: "💹 Market Data",
    charts: [
      { title: "Daily Performance by Sector" },
      { title: "Prices by Market Cap" },
      { title: "Top Layer 1 by YTD" },
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
  const [selectedChart, setSelectedChart] = useState(chart_list[0].component);

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
            {templates.map(({ title, disabled = false }, index) => (
              <>
                <input
                  type="radio"
                  className="btn-check"
                  name="template"
                  id={`template-${index}`}
                  autoComplete="off"
                  defaultChecked={index == 0}
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
            {selectedTemplate.charts.map(({ title }, index) => (
              <>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id={`chart-${index}`}
                  autoComplete="off"
                  defaultChecked={index == 0}
                />
                <label
                  className="btn btn-outline-success"
                  htmlFor={`chart-${index}`}
                  style={{ width: "100%" }}
                >
                  {title}
                </label>
              </>
            ))}

            {/* <h5 style={{ marginTop: "24px" }}>🔥 Trending</h5>
            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="trending-1"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-success"
              htmlFor="trending-1"
              style={{ width: "100%" }}
            >
              Hot Contracts
            </label>

            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="trending-2"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-success"
              htmlFor="trending-2"
              style={{ width: "100%" }}
            >
              Unique Addresses
            </label>

            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="trending-3"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-success"
              htmlFor="trending-3"
              style={{ width: "100%" }}
            >
              Whale Transactions
            </label>

            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="trending-4"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-success"
              htmlFor="trending-4"
              style={{ width: "100%" }}
            >
              Recent Transactions
            </label> */}
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div>
          <h5>Select a Chart</h5>
          <div className="btn-group-vertical" style={{ width: "100%" }}>
            <Row style={{ width: "100%" }}>
              {chart_list.map(({ preview, component }, index) => (
                <Col
                  lg={6}
                  key={index}
                  onClick={() => setSelectedChart(component)}
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="chart"
                    id={`chart-${index}`}
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-success btn-chart"
                    htmlFor={`chart-${index}`}
                    style={{ width: "100%", padding: "4px" }}
                  >
                    <Card style={{ marginBottom: "0px" }}>
                      <CardBody style={{ padding: "8px" }}>
                        <img src={preview} style={{ width: "100%" }} />
                      </CardBody>
                    </Card>
                  </label>
                </Col>
              ))}

              {/* <Col lg={6}>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id="chart-2"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-success btn-chart"
                  htmlFor="chart-2"
                  style={{ width: "100%", padding: "4px" }}
                >
                  <Card style={{ marginBottom: "0px" }}>
                    <CardBody style={{ padding: "8px" }}>
                      <img src={img1} style={{ width: "100%" }} />
                    </CardBody>
                  </Card>
                </label>
              </Col>

              <Col lg={6}>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id="chart-3"
                  autoComplete="off"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-success btn-chart"
                  htmlFor="chart-3"
                  style={{ width: "100%", padding: "4px" }}
                >
                  <Card style={{ marginBottom: "0px" }}>
                    <CardBody style={{ padding: "8px" }}>
                      <img src={img2} style={{ width: "100%" }} />
                    </CardBody>
                  </Card>
                </label>
              </Col>

              <Col lg={6}>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id="chart-4"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-success btn-chart"
                  htmlFor="chart-4"
                  style={{ width: "100%", padding: "4px" }}
                >
                  <Card style={{ marginBottom: "0px" }}>
                    <CardBody style={{ padding: "8px" }}>
                      <img src={img3} style={{ width: "100%" }} />
                    </CardBody>
                  </Card>
                </label>
              </Col>

              <Col lg={6}>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id="chart-5"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-success btn-chart"
                  htmlFor="chart-5"
                  style={{ width: "100%", padding: "4px" }}
                >
                  <Card style={{ marginBottom: "0px" }}>
                    <CardBody style={{ padding: "8px" }}>
                      <img src={img4} style={{ width: "100%" }} />
                    </CardBody>
                  </Card>
                </label>
              </Col>

              <Col lg={6}>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id="chart-6"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-success btn-chart"
                  htmlFor="chart-6"
                  style={{ width: "100%", padding: "4px" }}
                >
                  <Card style={{ marginBottom: "0px" }}>
                    <CardBody style={{ padding: "8px" }}>
                      <img src={img5} style={{ width: "100%" }} />
                    </CardBody>
                  </Card>
                </label>
              </Col> */}
            </Row>
          </div>
        </div>
      );
    }

    if (step === 5) {
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
            {selectedChart}
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
      setModalOpen(false);
      setStep(1);
      chartPicked(() => (
        <Card>
          <CardBody className="d-flex flex-column">
            {/* <CardTitle>Top 5 Polygon Farms by TVL</CardTitle>
            <PolygonFrams /> */}
            {selectedChart}
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
      <OffcanvasHeader toggle={() => setModalOpen(!modalOpen)}>
        Add Chart
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
