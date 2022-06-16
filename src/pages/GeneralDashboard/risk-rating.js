import * as React from "react";
import { CardBody, CardTitle, Col, Row } from "reactstrap";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { last } from "lodash";

class GradientSVG extends React.Component {
  render() {
    let { startColor, endColor, idCSS, rotation } = this.props;

    let gradientTransform = `rotate(${rotation})`;

    return (
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={idCSS} gradientTransform={gradientTransform}>
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

const RiskRating = () => {
  return (
    <CardBody>
      <CardTitle className="mb-4">Risk Rating</CardTitle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          paddingBottom: "24px",
          flexDirection: "column",
        }}
      >
        <CircularProgressbarWithChildren
          value={55}
          styles={buildStyles({
            pathTransition: 1,
            trailColor: "#384461",
          })}
          strokeWidth={16}
        >
          <div
            style={{
              fontSize: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: 12,
                fontSize: 28,
                fontWeight: 400,
              }}
            >
              Medium
            </h3>
            <h4 style={{ margin: 0, fontSize: 32, fontWeight: 500 }}>55%</h4>
          </div>
        </CircularProgressbarWithChildren>

        <Row style={{ marginTop: 48, width: "100%" }}>
          <Col lg={6}>
            <h5>Funding (APR)</h5>
          </Col>
          <Col lg={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ paddingRight: 16 }}>10%</div>
              <div>
                <div
                  className="badge bg-success"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="bx bx-up-arrow-alt"
                    style={{ fontSize: "16px" }}
                  ></i>
                  4%
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: 12, width: "100%" }}>
          <Col lg={6}>
            <h5>Leverage</h5>
          </Col>
          <Col lg={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ paddingRight: 16 }}>Increasing</div>
              <div>
                <div
                  className="badge bg-danger"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="bx bx-up-arrow-alt"
                    style={{ fontSize: "16px" }}
                  ></i>
                  9%
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: 12, width: "100%" }}>
          <Col lg={6}>
            <h5>Sell Pressure</h5>
          </Col>
          <Col lg={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ paddingRight: 16 }}>70%</div>
              <div>
                <div
                  className="badge bg-danger"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="bx bx-up-arrow-alt"
                    style={{ fontSize: "16px" }}
                  ></i>
                  3%
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <GradientSVG
        idCSS="pathway"
        startColor="#6BC89E"
        endColor="#E587BC"
        rotation={90}
      />
    </CardBody>
  );
};

export default RiskRating;
