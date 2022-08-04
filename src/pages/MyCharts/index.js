import React from "react";
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

import Breadcrumbs from "../../components/Common/Breadcrumb";
import TitleBar from "../../components/Common/TitleBar";
import Bubble from "../AllCharts/echart/bubblechart";

import img0 from "./bc-0.png";
import img1 from "./bc-1.png";
import img2 from "./bc-2.png";
import img3 from "./bc-3.png";
import img4 from "./bc-4.png";
import img5 from "./bc-5.png";

const MyChartsPage = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [showNewChart, setShowNewChart] = React.useState(false);

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
              className="btn btn-outline-primary"
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
              className="btn btn-outline-primary"
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
              className="btn btn-outline-primary"
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
            <input
              type="radio"
              className="btn-check"
              name="template"
              id="template-2"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="template-2"
              style={{ width: "100%" }}
            >
              ⛓️ Blockchain Activity
            </label>
            <input
              type="radio"
              className="btn-check"
              name="template"
              id="template-1"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="template-1"
              style={{ width: "100%" }}
            >
              💹 Market Data
            </label>

            <input
              type="radio"
              className="btn-check"
              name="template"
              id="template-3"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="template-3"
              style={{ width: "100%" }}
            >
              🖼️ NFTS
            </label>

            <input
              type="radio"
              className="btn-check"
              name="template"
              id="template-4"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="template-4"
              style={{ width: "100%" }}
            >
              🔌 Exchange Activity
            </label>
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div>
          <h5>⛓️ Blockchain Activity</h5>
          <div className="btn-group-vertical" style={{ width: "100%" }}>
            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="blockchain-1"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="blockchain-1"
              style={{ width: "100%" }}
            >
              Largest Farms (TVL)
            </label>

            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="blockchain-2"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="blockchain-2"
              style={{ width: "100%" }}
            >
              Inflow / Outflow
            </label>

            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="blockchain-3"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="blockchain-3"
              style={{ width: "100%" }}
            >
              Unusual Activity
            </label>

            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="blockchain-4"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-primary"
              htmlFor="blockchain-4"
              style={{ width: "100%" }}
            >
              Total Value Locked (TVL)
            </label>

            <h5 style={{ marginTop: "24px" }}>🔥 Trending</h5>
            <input
              type="radio"
              className="btn-check"
              name="blockchain"
              id="trending-1"
              autoComplete="off"
              disabled
            />
            <label
              className="btn btn-outline-primary"
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
              className="btn btn-outline-primary"
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
              className="btn btn-outline-primary"
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
              className="btn btn-outline-primary"
              htmlFor="trending-4"
              style={{ width: "100%" }}
            >
              Recent Transactions
            </label>
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
              <Col lg={6}>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id="chart-1"
                  autoComplete="off"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="chart-1"
                  style={{ width: "100%", padding: "4px" }}
                >
                  <Card style={{ marginBottom: "0px" }}>
                    <CardBody style={{ padding: "8px" }}>
                      <img src={img0} style={{ width: "100%" }} />
                    </CardBody>
                  </Card>
                </label>
              </Col>

              <Col lg={6}>
                <input
                  type="radio"
                  className="btn-check"
                  name="chart"
                  id="chart-2"
                  autoComplete="off"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary"
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
                  className="btn btn-outline-primary"
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
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary"
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
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary"
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
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="chart-6"
                  style={{ width: "100%", padding: "4px" }}
                >
                  <Card style={{ marginBottom: "0px" }}>
                    <CardBody style={{ padding: "8px" }}>
                      <img src={img5} style={{ width: "100%" }} />
                    </CardBody>
                  </Card>
                </label>
              </Col>
            </Row>
          </div>
        </div>
      );
    }

    if (step === 5) {
      return (
        <div>
          <h5>Preview</h5>
          <Bubble />
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
      setShowNewChart(true);
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
    <div className="page-content">
      <Container fluid={true}>
        {/* <Breadcrumbs title="Dashboards" breadcrumbItem="My Charts" /> */}
        <TitleBar title="My Charts" onAddChart={() => setModalOpen(true)} />
        <Row>
          <Col lg={4}>
            <Card>
              <CardBody className="my-chart-card">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="btn btn-primary btn-rounded"
                  data-toggle="modal"
                >
                  <i className="bx bx-vial font-size-16 align-middle me-2"></i>
                  Add Chart
                </button>
              </CardBody>
            </Card>
          </Col>

          {showNewChart && (
            <Col lg={4}>
              <Card>
                <CardBody style={{ height: "300px" }}>
                  <Bubble />
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>

        <Offcanvas
          isOpen={modalOpen}
          direction="end"
          toggle={() => setModalOpen(!modalOpen)}
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
                  className="btn btn-primary btn-rounded"
                  data-toggle="modal"
                  style={{ width: "100%" }}
                >
                  {step >= 5 ? "Add Chart" : "Continue"}
                </button>
              </Col>
            </Row>
          </OffcanvasBody>
        </Offcanvas>
      </Container>
    </div>
  );
};

export default MyChartsPage;