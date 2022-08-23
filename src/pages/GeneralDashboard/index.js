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
import PageBreadcrumb from "../../components/Common/PageBreadcrumb";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RiskRatingCard from "./RiskRatingCard";
import BTCFundingRatesCard from "./BTCFundingRatesCard";
import { general_breadcrumb } from "helpers/breadcrumbs";

const ResponsiveGridLayout = WidthProvider(Responsive);

const _contents = [
  {
    i: "0",
    content: () => (
      <Card>
        <BTCCard />
      </Card>
    ),
  },
  {
    i: "1",
    content: () => <RiskRatingCard />,
  },
  {
    i: "2",
    content: () => <BTCFundingRatesCard />,
  },
  {
    i: "3",
    content: () => <LiveFundingRates />,
  },
  {
    i: "4",
    content: () => <BTCPerformance />,
  },
];

const _layout = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 9,
    h: 16,
    minW: 6,
    minH: 16,
  },
  {
    i: "1",
    x: 10,
    y: 0,
    w: 3,
    h: 16,
    minW: 3,
    minH: 16,
  },
  {
    i: "2",
    x: 0,
    y: 16,
    w: 6,
    h: 16,
    minW: 6,
    minH: 16,
  },
  {
    i: "3",
    x: 8,
    y: 16,
    w: 6,
    h: 16,
    minW: 6,
    minH: 16,
  },
];

const _layoutXxxl = [
  ..._layout,
  {
    i: "4",
    x: 0,
    y: 32,
    w: 12,
    h: 25,
    minW: 6,
    minH: 20,
  },
];

const _layoutXxl = [
  ..._layout,
  {
    i: "4",
    x: 0,
    y: 32,
    w: 12,
    h: 20,
    minW: 6,
    minH: 16,
  },
];

const _layoutXl = [
  ..._layout,
  {
    i: "4",
    x: 0,
    y: 32,
    w: 12,
    h: 16,
    minW: 6,
    minH: 16,
  },
];

const _layoutSmall = [
  { i: "0", x: 0, y: 0, w: 12, h: 16, minW: 12, minH: 16 },
  { i: "1", x: 0, y: 16, w: 12, h: 12, minW: 6, minH: 12 },
  { i: "2", x: 0, y: 28, w: 12, h: 16, minW: 6, minH: 16 },
  { i: "3", x: 0, y: 34, w: 12, h: 16, minW: 12, minH: 16 },
];

const _layoutLg = [
  ..._layoutSmall,
  { i: "4", x: 0, y: 50, w: 12, h: 14, minW: 12, minH: 14 },
];

const _layoutMd = [
  ..._layoutSmall,
  { i: "4", x: 0, y: 50, w: 12, h: 12, minW: 12, minH: 12 },
];

const _elements = {
  a: <BTCCard />,
  b: <RiskRatingCard />,
  c: <BTCFundingRatesCard />,
  d: <LiveFundingRates />,
  e: <BTCPerformance />,
};

const GeneralDashboard = () => {
  document.title = "General Dashboard | Dashed by Lacuna";

  const [modalOpen, setModalOpen] = useState(false);
  const [contents, setContents] = useState(_contents);
  const [layoutXxxl, setlayoutXxxl] = useState(_layoutXxxl);
  const [layoutXxl, setlayoutXxl] = useState(_layoutXxl);
  const [layoutXl, setlayoutXl] = useState(_layoutXl);
  const [layoutLg, setlayoutLg] = useState(_layoutLg);
  const [layoutMd, setlayoutMd] = useState(_layoutMd);
  const [resize, setResize] = useState(0);

  const removeItem = index => {
    setContents(contents.filter(l => l.i !== index));
    setlayoutXxxl(layoutXxxl.filter(l => l.i !== index));
    setlayoutXxl(layoutXxl.filter(l => l.i !== index));
    setlayoutXl(layoutXl.filter(l => l.i !== index));
    setlayoutLg(layoutLg.filter(l => l.i !== index));
    setlayoutMd(layoutMd.filter(l => l.i !== index));
  };

  const addItem = content => {
    const i = contents.length.toString();
    setContents([
      ...contents,
      {
        i,
        content,
      },
    ]);
    setlayoutXxxl([
      ...layoutXxxl,
      {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 6,
        h: 4,
      },
    ]);
    setlayoutXxl([
      ...layoutXxl,
      {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 6,
        h: 4,
      },
    ]);
    setlayoutXl([
      ...layoutXl,
      {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 6,
        h: 4,
      },
    ]);
    setlayoutLg([
      ...layoutLg,
      {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 12,
        h: 4,
      },
    ]);
    setlayoutMd([
      ...layoutMd,
      {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 12,
        h: 4,
      },
    ]);
  };

  const resetChart = () => {
    setContents(_contents);
    setlayoutXxxl(_layoutXxxl);
    setlayoutXxl(_layoutXxl);
    setlayoutXl(_layoutXl);
    setlayoutLg(_layoutLg);
    setlayoutMd(_layoutMd);
    setResize(resize + 1);
  };



  return (
    <div key={resize}>
      <div className="page-content">
        <Container fluid={true}>
          <PageBreadcrumb items={general_breadcrumb} />
          <TitleBar
            title="My Dashboards"
            onAddChart={() => setModalOpen(true)}
            onResetChart={resetChart}
          />

          <ResponsiveGridLayout
            className="layout"
            breakpoints={{
              xxxl: 1800,
              xxl: 1400,
              xl: 1120,
              lg: 992,
              md: 768,
              sm: 576,
              xs: 0,
            }}
            cols={{ xxxl: 12, xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            containerPadding={[0, 24]}
            layouts={{
              xxxl: layoutXxxl,
              xxl: layoutXxl,
              xl: layoutXl,
              lg: layoutLg,
              md: layoutMd,
            }}
            margin={[24, 24]}
            rowHeight={10}
            autoSize
          >
            {contents.map(({ i, content: Content }) => (
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
    </div>
  );
};

export default GeneralDashboard;
