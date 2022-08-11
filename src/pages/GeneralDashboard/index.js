import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

import { Card } from "reactstrap";

// import Breadcrumbs from "../../components/Common/Breadcrumb";
import TitleBar from "../../components/Common/TitleBar";
import ActionButtons from "../../components/Common/ChartActionButtons";
import ChartPicker from "../../components/Common/ChartPicker";
import BTCCard from "./btc-card";
import BTCPerformance from "./BTCPerformance";
import LiveFundingRates from "./LiveFundingRates/index";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RiskRatingCard from "./RiskRatingCard";
import BTCFundingRatesCard from "./BTCFundingRatesCard";

const ResponsiveGridLayout = WidthProvider(Responsive);

const _layoutLarge = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 9,
    h: 16,
    minW: 6,
    minH: 16,
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
    h: 16,
    minW: 3,
    minH: 16,
    content: () => <RiskRatingCard />,
  },
  {
    i: "2",
    x: 0,
    y: 16,
    w: 6,
    h: 16,
    minW: 6,
    minH: 16,
    content: () => <BTCFundingRatesCard />,
  },
  { i: "3", x: 8, y: 16, w: 6, h: 16, minW: 6, minH: 16, content: () => <LiveFundingRates /> },
  { i: "4", x: 0, y: 32, w: 12, h: 18, minW: 6, minH: 18, content: () => <BTCPerformance /> },
];

const _layoutMd = [
  { i: "0", x: 0, y: 0, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "1", x: 0, y: 16, w: 12, h: 12, minW: 6, minH: 12 },
  { i: "2", x: 0, y: 28, w: 12, h: 16, minW: 6, minH: 16 },
  { i: "3", x: 0, y: 34, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "4", x: 0, y: 50, w: 12, h: 16, minW: 12, minH: 16 },
];

const initialLayouts = {
  xxl: [
    { i: "a", x: 0, y: 0, w: 9, h: 15, minW: 6, minH: 15, maxW: 12, maxH: 20, },
    { i: "b", x: 9, y: 0, w: 3, h: 15, minW: 3, minH: 15, maxW: 4, maxH: 20 },
    { i: "c", x: 0, y: 15, w: 6, h: 15, minW: 6, minH: 15, maxW: 12, maxH: 25 },
    { i: "d", x: 6, y: 15, w: 6, h: 15, minW: 6, minH: 15, maxW: 12, maxH: 25, },
    { i: "e", x: 0, y: 30, w: 6, h: 15, minW: 6, minH: 12, maxW: 12, maxH: 20, },
  ],
  lg: [
    { i: "a", x: 0, y: 0, w: 12, h: 15, minW: 12, minH: 15, maxW: 12, maxH: 20, },
    { i: "b", x: 8, y: 15, w: 4, h: 15, minW: 4, minH: 15, maxW: 6, maxH: 20 },
    { i: "c", x: 0, y: 15, w: 8, h: 15, minW: 6, minH: 15, maxW: 12, maxH: 25 },
    { i: "d", x: 0, y: 30, w: 12, h: 15, minW: 12, minH: 15, maxW: 12, maxH: 25, },
    { i: "e", x: 0, y: 45, w: 12, h: 15, minW: 12, minH: 12, maxW: 12, maxH: 20, },
  ],
};

const _elements = {
  a: <BTCCard />,
  b: <RiskRatingCard />,
  c: <BTCFundingRatesCard />,
  d: <LiveFundingRates />,
  e: <BTCPerformance />,
}

const GeneralDashboard = () => {
  document.title = "General Dashboard | Dashed by Lacuna";

  const [modalOpen, setModalOpen] = useState(false);

  const [layouts, setLayouts] = useState()
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

  const resetChart = () => {
    setlayoutLarge(_layoutLarge);
    setlayoutMd(_layoutMd);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="General" /> */}
          <TitleBar
            title="General Dashboard"
            onAddChart={() => setModalOpen(true)}
            onResetChart={resetChart}
          />

          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ xxl: 1400, xl: 1200, lg: 992, md: 768, sm: 576, xs: 0 }}
            cols={{ xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            containerPadding={[0, 24]}
            layouts={{ xxl: layoutLarge, lg: layoutMd }}
            margin={[24, 24]}
            rowHeight={10}
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
