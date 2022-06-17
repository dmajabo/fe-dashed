import React from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import RaceChart from "./barchart";
import Pie from "pages/AllCharts/echart/piechart";
import LineBar from "pages/AllCharts/echart/linebarchart";
import PolygonFrams from "./polygonFarms";
import PolygonTransactions from "./polygonTransactions";

const PolygonDashboard = () => {
  document.title = "Polygon Ecoystem | Dashed by Lacuna";

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dashboards" breadcrumbItem="Polygon Ecosystem" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Polygon Performance (ROI Monthly)
                  </CardTitle>
                  <RaceChart />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    # of Active Addresses + Transactions
                  </CardTitle>
                  <PolygonTransactions />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Top 5 Polygon Farms by TVL
                  </CardTitle>
                  <PolygonFrams />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PolygonDashboard;
