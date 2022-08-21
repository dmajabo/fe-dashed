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
import PackedBubbleChart from "pages/AllCharts/highcharts/PackedBubbleChart";

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
    isResizable: false,
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
  {
    i: "2",
    x: 7,
    y: 5,
    w: 6,
    h: 2,
    // minW: 6,
    // minH: 4,
    content: () => (
      <Card>
        <CardBody style={{height: '100%'}}>
          <PackedBubbleChart />
        </CardBody>
      </Card>
    ),
  },
];

const _layoutMd = [{ i: "0", x: 0, y: 0, w: 12, h: 3.55, isResizable: false }];

const PolygonDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  document.title = "Polygon Ecoystem | Dashed by Lacuna";

  const [layoutLarge, setlayoutLarge] = useState(_layoutLarge);
  const [layoutMd, setlayoutMd] = useState(_layoutMd);

  const removeItem = index => {
    if (index == 2) {
      setlayoutLarge(
        layoutLarge.map(l =>
          l.i == index ? Object.assign({}, l, { content: null }) : l
        )
      );
      setlayoutMd(
        layoutMd.map(l =>
          l.i == index ? Object.assign({}, l, { content: null }) : l
        )
      );
    } else {
      setlayoutLarge(layoutLarge.filter(l => l.i !== index));
      setlayoutMd(layoutMd.filter(l => l.i !== index));
    }
  };

  const addItem = content => {
    const chartAdded =
      layoutLarge.filter(l => l.content).length == layoutLarge.length;
    if (chartAdded) {
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
    } else {
      setlayoutLarge(
        layoutLarge.map(layout =>
          layout.content ? layout : Object.assign({}, layout, { content })
        )
      );
      setlayoutMd(
        layoutMd.map(layout =>
          layout.content ? layout : Object.assign({}, layout, { content })
        )
      );
    }
  };

  const resetChart = () => {
    setlayoutLarge(_layoutLarge);
    setlayoutMd(_layoutMd);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="Polygon Ecosystem" /> */}
          <TitleBar
            title="General Dashboard"
            onAddChart={() => setModalOpen(true)}
            onResetChart={resetChart}
          />

          <ResponsiveGridLayout
            className="layout"
            breakpoints={{
              xxl: 1400,
              xl: 1200,
              lg: 992,
              md: 768,
              sm: 576,
              xs: 0,
            }}
            cols={{ xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            layouts={{ xxl: layoutLarge, lg: layoutMd }}
          >
            {layoutLarge.map(({ i, content: Content }) => (
              <div key={i}>
                {Content ? (
                  <>
                    <ActionButtons onRemove={() => removeItem(i)} />
                    <Content />
                  </>
                ) : (
                  <Card>
                    <CardBody className="d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="btn btn-success btn-rounded"
                      >
                        <i className="bx bx-vial font-size-16 align-middle me-2"></i>
                        Add Chart
                      </button>
                    </CardBody>
                  </Card>
                )}
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
