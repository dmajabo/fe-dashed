import React from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

// import Breadcrumbs from "../../components/Common/Breadcrumb";
import TitleBar from "../../components/Common/TitleBar";
import ChartPicker from "../../components/Common/ChartPicker";
import Scatter from "pages/AllCharts/echart/scatterchart";
import RadarChart from "./radarchart";
import BTCCard from "./btc-card";
import BTCPerp from "./btc-perp";
import BTCPerformance from "./BTCPerformance";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layoutLarge = [
  { i: "a", x: 0, y: 0, w: 9, h: 3 },
  { i: "b", x: 9, y: 0, w: 3, h: 3 },
  { i: "c", x: 0, y: 3, w: 8, h: 5 },
  { i: "d", x: 8, y: 3, w: 4, h: 5 },
  { i: "e", x: 0, y: 8, w: 12, h: 4 },
  { i: "f", x: 0, y: 8, w: 6, h: 4 },
];


const layoutMd = [
  { i: "a", x: 0, y: 0, w: 12, h: 3 },
  { i: "b", x: 0, y: 3, w: 12, h: 6 },
  { i: "c", x: 0, y: 9, w: 12, h: 3 },
  { i: "d", x: 0, y: 12, w: 12, h: 4 },
  { i: "e", x: 0, y: 16, w: 12, h: 2 },
  { i: "f", x: 0, y: 8, w: 6, h: 4 },
];

const GeneralDashboard = () => {
  document.title = "General Dashboard | Dashed by Lacuna";

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="General" /> */}
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
                <BTCCard />
              </Card>
            </div>

            <div key="b">
              <Card>
                <CardBody>
                  <CardTitle
                    style={{ color: "white", fontSize: 22 }}
                    className="mb-4"
                  >
                    Risk Rating
                  </CardTitle>
                  <RadarChart />
                </CardBody>
              </Card>
            </div>

            <div key="c">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    BTC Funding Rates Over Time
                  </CardTitle>
                  <Scatter />
                </CardBody>
              </Card>
            </div>

            <div key="d">
              <Card>
                <BTCPerp />
              </Card>
            </div>

            <div key="e">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Bitcoin Monthly Performance (2020 - 2021)
                  </CardTitle>
                  <BTCPerformance />
                </CardBody>
              </Card>
            </div>
            <div key="f">
              <ChartPicker modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>

            {/* <Col lg={6}>
              <Card>
                <RiskRating />
              </Card>
            </Col> */}
          </ResponsiveGridLayout>
        </Container>
      </div>
    </>
  );
};

export default GeneralDashboard;
