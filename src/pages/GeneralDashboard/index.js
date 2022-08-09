import React, { useState } from "react";
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
  { i: "4", x: 0, y: 32, w: 12, h: 15, minW: 6, minH: 15, content: () => <BTCPerformance /> },
];

const _layoutMd = [
  { i: "0", x: 0, y: 0, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "1", x: 0, y: 16, w: 12, h: 12, minW: 6, minH: 12 },
  { i: "2", x: 0, y: 28, w: 12, h: 16, minW: 6, minH: 16 },
  { i: "3", x: 0, y: 34, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "4", x: 0, y: 50, w: 12, h: 16, minW: 12, minH: 16 },
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
            breakpoints={{ lg: 1200, md: 996 }}
            cols={{ lg: 12, md: 12 }}
            layouts={{ lg: layoutLarge, md: layoutMd }}
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
