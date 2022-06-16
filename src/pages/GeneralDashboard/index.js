import React from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Scatter from "pages/AllCharts/echart/scatterchart";
import BTCCard from "./btc-card";
import BTCPerp from "./btc-perp";
import BTCPerformance from "./btc-performance";
import RiskRating from "./risk-rating";

const GeneralDashboard = () => {
  document.title = "General Dashboard | Dashed by Lacuna";

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dashboards" breadcrumbItem="General" />

          <Row>
            <Col lg={6}>
              <Card>
                <BTCCard />
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Avg Funding Rates Over Time
                  </CardTitle>
                  <Scatter />
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Bitcoin Monthly Performance (2020 - 2021)
                  </CardTitle>
                  <BTCPerformance />
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <BTCPerp />
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <RiskRating />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GeneralDashboard;
