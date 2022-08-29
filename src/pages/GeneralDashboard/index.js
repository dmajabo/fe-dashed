import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";

import {
  addChart,
  removeChartByIndex,
  resetChart,
} from "../../store/general-dashboard/actions";

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

const _elements = {
  a: <BTCCard />,
  b: <RiskRatingCard />,
  c: <BTCFundingRatesCard />,
  d: <LiveFundingRates />,
  e: <BTCPerformance />,
};

const GeneralDashboard = () => {
  const dispatch = useDispatch();
  const { contents, layoutXxxl, layoutXxl, layoutXl, layoutLg, layoutMd } =
    useSelector(state => state.GeneralChartSetting);
  document.title = "General Dashboard | Dashed by Lacuna";

  const [modalOpen, setModalOpen] = useState(false);

  const [layouts, setLayouts] = useState();
  const [resize, setResize] = useState(0);

  const removeItem = index => {
    dispatch(removeChartByIndex(index));
  };

  const addItem = content => {
    const i = contents.length.toString();

    let newChartData = {
      content: {
        i,
        content,
      },
      xxxl: {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 6,
        h: 20,
      },
      xxl: {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 6,
        h: 20,
      },
      xl: {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 6,
        h: 14,
      },
      lg: {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 12,
        h: 12,
      },
      md: {
        i,
        x: contents.length % 2 == 0 ? 6 : 0,
        y: Infinity,
        w: 12,
        h: 12,
      },
    };

    dispatch(addChart(newChartData));
  };

  const handleResetChart = () => {
    dispatch(resetChart());
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
            onResetChart={handleResetChart}
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
            containerPadding={[0, 0]}
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
