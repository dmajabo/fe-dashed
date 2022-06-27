import React from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row, Button } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import TitleBar from "../../components/Common/TitleBar";
import ChartPicker from "../../components/Common/ChartPicker";
import RaceChart from "./barracechart";
import BubbleChart from "./bubblechart";
import Pie from "pages/AllCharts/echart/piechart";
import LineBar from "pages/AllCharts/echart/linebarchart";
import PolygonFrams from "./polygonFarms";
import PolygonTransactions from "./polygonTransactions";

import { Responsive, WidthProvider } from "react-grid-layout";
import * as _ from "lodash";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layoutLarge = [
  { i: "a", x: 0, y: 0, w: 12, h: 4 },
  { i: "b", x: 0, y: 5, w: 12, h: 8 },
  { i: "c", x: 0, y: 13, w: 6, h: 4 },
  { i: "d", x: 6, y: 13, w: 6, h: 4 },
];

const layoutMd = [
  { i: "a", x: 0, y: 0, w: 12, h: 4 },
  { i: "b", x: 0, y: 3, w: 12, h: 4 },
  { i: "c", x: 0, y: 7, w: 12, h: 4 },
  { i: "d", x: 0, y: 11, w: 12, h: 4 },
];

const PolygonDashboard = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  document.title = "Polygon Ecoystem | Dashed by Lacuna";

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="Polygon Ecosystem" /> */}
          <TitleBar
            title="General Dashboard"
            onAddChart={() => setModalOpen(true)}
          />

          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996 }}
            cols={{ lg: 12, md: 12 }}
            layouts={{ lg: layoutLarge, md: layoutMd }}
          >
            <div key="a">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Polygon Performance (ROI Monthly)
                  </CardTitle>
                  <RaceChart />
                </CardBody>
              </Card>
            </div>
            {/* <div key="b">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Polygon Performance (ROI Monthly)
                  </CardTitle>
                  <BubbleChart />
                </CardBody>
              </Card>
            </div> */}

            <div key="c">
              <Card>
                <CardBody className="d-flex flex-column">
                  <CardTitle># of Active Addresses + Transactions</CardTitle>
                  <PolygonTransactions />
                </CardBody>
              </Card>

              {/* <Col lg={6} className="my-4">
            </div>

            <div key="d">
              <Card>
                <CardBody className="d-flex flex-column">
                  <CardTitle>Top 5 Polygon Farms by TVL</CardTitle>
                  <PolygonFrams />
                </CardBody>
              </Card>
            </Col> */}
            </div>
            <div key="d">
              <ChartPicker modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
          </ResponsiveGridLayout>
        </Container>
      </div>
    </>
  );
};

export default PolygonDashboard;
