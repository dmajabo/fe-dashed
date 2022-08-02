import React, { useState } from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

// import Breadcrumbs from "../../components/Common/Breadcrumb";
import TitleBar from "../../components/Common/TitleBar";
import ActionButtons from "../../components/Common/ChartActionButtons";
import ChartPicker from "../../components/Common/ChartPicker";
import Scatter from "pages/AllCharts/echart/scatterchart";
import PolygonFrams from "../../pages/Polygon-Dashboard/polygonFarms";
import RadarChart from "./radarchart";
import BTCCard from "./btc-card";
import BTCPerformance from "./BTCPerformance";
import LiveFundingRates from "./LiveFundingRates/index";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const _layoutLarge = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 9,
    h: 2.75,
    content: () => (
      <Card>
        <BTCCard />
      </Card>
    ),
  },
  {
    i: "1",
    x: 10,
    y: 0,
    w: 3,
    h: 2.75,
    minW: 2,
    minH: 2.25,
    content: () => (
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Risk Rating</CardTitle>
          <RadarChart />
        </CardBody>
      </Card>
    ),
  },
  {
    i: "2",
    x: 0,
    y: 3,
    w: 6,
    h: 5,
    content: () => (
      <Card>
        <CardBody>
          <CardTitle className="mb-4">BTC Funding Rates Over Time</CardTitle>
          <Scatter />
        </CardBody>
      </Card>
    ),
  },
  { i: "3", x: 8, y: 3, w: 6, h: 5, content: () => <LiveFundingRates /> },
  { i: "4", x: 0, y: 8, w: 12, h: 4.5, content: () => <BTCPerformance /> },
];

const _layoutMd = [
  { i: "0", x: 0, y: 0, w: 12, h: 3 },
  { i: "1", x: 0, y: 3, w: 12, h: 3 },
  { i: "2", x: 0, y: 9, w: 12, h: 3 },
  { i: "3", x: 0, y: 12, w: 12, h: 4 },
  { i: "4", x: 0, y: 16, w: 12, h: 2 },
];

const GeneralDashboard = () => {
  document.title = "General Dashboard | Dashed by Lacuna";

  const [modalOpen, setModalOpen] = useState(false);

  const [layoutLarge, setlayoutLarge] = useState(_layoutLarge);
  const [layoutMd, setlayoutMd] = useState(_layoutMd);

  const removeItem = index => {
    setlayoutLarge(layoutLarge.filter(l => l.i !== index));
    setlayoutMd(layoutMd.filter(l => l.i !== index));
  };

  const addItem = content => {
    const i = layoutLarge.length.toString();
    setlayoutLarge([
      ...layoutLarge,
      {
        i,
        x: layoutLarge.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 6,
        h: 4,
        content,
      },
    ]);
    setlayoutMd([
      ...layoutMd,
      {
        i,
        x: layoutLarge.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 12,
        h: 4,
        content,
      },
    ]);
  };

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
            margin={[24, 24]}
            autoSize
          >
            {layoutLarge.map(({ i, content: Content }) => (
              <div key={i}>
                <ActionButtons onRemove={() => removeItem(i)} />
                <Content />
              </div>
            ))}
          </ResponsiveGridLayout>
          <ChartPicker
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            chartPicked={addItem}
          />
        </Container>
      </div>
    </>
  );
};

export default GeneralDashboard;
