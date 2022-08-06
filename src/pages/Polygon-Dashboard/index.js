import React, { useState } from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row, Button } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import TitleBar from "../../components/Common/TitleBar";
import ActionButtons from "../../components/Common/ChartActionButtons";
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

const _layoutLarge = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 12,
    h: 3.55,
    minW: 12,
    minH: 3.55,
    content: () => (
      <Card>
        <CardBody>
          <CardTitle className="mb-4">
            Polygon Performance (ROI Monthly)
          </CardTitle>
          <RaceChart />
        </CardBody>
      </Card>
    ),
  },
  {
    i: "1",
    x: 0,
    y: 5,
    w: 6,
    h: 4,
    minW: 6,
    minH: 4,
    content: () => (
      <Card>
        <CardBody className="d-flex flex-column">
          <CardTitle className="mb-4">
            <img
              src="/coin_icons/MATIC.png"
              width={32}
              height={32}
              className="me-2"
            />
            Number of Active Addresses + Transactions
          </CardTitle>
          <PolygonTransactions />
        </CardBody>
      </Card>
    ),
  },
  // { i: "c", x: 0, y: 13, w: 6, h: 4 },
  // { i: "d", x: 6, y: 13, w: 6, h: 4 },
];

const _layoutMd = [
  { i: "0", x: 0, y: 0, w: 12, h: 4 },
  { i: "1", x: 0, y: 3, w: 12, h: 4 },
  // { i: "c", x: 0, y: 7, w: 12, h: 4 },
  // { i: "d", x: 0, y: 11, w: 12, h: 4 },
];

const PolygonDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  document.title = "Polygon Ecoystem | Dashed by Lacuna";

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
        x: 0,
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

export default PolygonDashboard;
