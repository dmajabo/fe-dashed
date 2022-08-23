import React, { useState, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { connect } from "react-redux";

import TitleBar from "../../components/Common/TitleBar";
import ActionButtons from "../../components/Common/ChartActionButtons";
import ChartPicker from "../../components/Common/ChartPicker";

import { addProfileDashboard } from "../../store/actions";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import PolygonTransactions from "pages/Polygon-Dashboard/polygonTransactions";

const ResponsiveGridLayout = WidthProvider(Responsive);

const _layoutLarge = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 6,
    h: 3,
  },
  {
    i: "1",
    x: 6,
    y: 0,
    w: 6,
    h: 3,
  },
  {
    i: "2",
    x: 0,
    y: 3,
    w: 6,
    h: 3,
  },
  {
    i: "3",
    x: 6,
    y: 3,
    w: 6,
    h: 3,
  },
];

const _layoutMd = [
  {
    i: "0",
    x: 0,
    y: 0,
    w: 12,
    h: 4,
  },
  {
    i: "1",
    x: 0,
    y: 4,
    w: 12,
    h: 4,
  },
  {
    i: "2",
    x: 0,
    y: 8,
    w: 12,
    h: 4,
  },
  {
    i: "3",
    x: 0,
    y: 12,
    w: 12,
    h: 4,
  },
];

const NewDashPage = ({ addProfileDashboard }) => {
  const [modalOpen, setModalOpen] = useState(false);
  document.title = "New Dash | Dashed by Lacuna";

  const [layoutLarge, setlayoutLarge] = useState(_layoutLarge);
  const [layoutMd, setlayoutMd] = useState(_layoutMd);
  const [currentIndex, setcurrentIndex] = useState();
  const [resized, setResized] = useState(0);

  const filledChartsCount = layoutLarge.filter(l => l?.content).length;
  // const emptyChartsCount = layoutLarge.length - filledChartsCount;
  const chartAdded = filledChartsCount > 0;

  useEffect(() => {
    const demoDash = {
      title: "My Dash",
      route: "/dashboards/my-dash",
    };
    addProfileDashboard(demoDash);
  }, []);

  useEffect(() => {
    if (filledChartsCount % 2 == 0 && filledChartsCount == layoutLarge.length) {
      console.log("addExtraSlots", filledChartsCount);
      addExtraSlots();
    }
  }, [layoutLarge]);

  const addChart = index => {
    setModalOpen(true);
    setcurrentIndex(index);
  };

  const addItem = content => {
    const i =
      currentIndex || layoutLarge.findIndex(l => !l?.content).toString();
    setlayoutLarge(
      layoutLarge.map(layout =>
        layout.i == i ? { ...layout, content } : layout
      )
    );
    setlayoutMd(
      layoutMd.map(layout => (layout.i == i ? { ...layout, content } : layout))
    );
    setcurrentIndex(null);
  };

  const removeItem = index => {
    setlayoutLarge(
      layoutLarge.map(layout =>
        layout.i == index ? { ...layout, content: null } : layout
      )
    );
    setlayoutMd(
      layoutMd.map(layout =>
        layout.i == index ? { ...layout, content: null } : layout
      )
    );
  };

  const addExtraSlots = () => {
    setlayoutLarge([
      ...layoutLarge,
      {
        i: layoutLarge.length.toString(),
        x: 0,
        y: Infinity,
        w: 6,
        h: 3,
      },
      {
        i: (layoutLarge.length + 1).toString(),
        x: 6,
        y: Infinity,
        w: 6,
        h: 3,
      },
    ]);
    setlayoutMd([
      ...layoutMd,
      {
        i: layoutMd.length+"",
        x: 0,
        y: Infinity,
        w: 12,
        h: 4,
      },
      {
        i: layoutMd.length+1+"",
        x: 6,
        y: Infinity,
        w: 12,
        h: 4,
      },
    ]);
  };

  return (
    <>
      <div className="page-content">
        <div className="">{JSON.stringify(layoutLarge)}</div>
        <Container fluid={true}>
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="Polygon Ecosystem" /> */}
          <TitleBar
            title="My Dashboard"
            onAddChart={() => setModalOpen(true)}
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
            onResize={() => setResized(resized + 1)}
          >
            {layoutLarge.map(({ i, content: Content }) => (
              <div
                key={i}
                className={[chartAdded && !Content && filledChartsCount % 2 != 0 && "hidden-card"]}
              >
                {Content ? (
                  <>
                    <ActionButtons onRemove={() => removeItem(i)} />
                    <Content />
                  </>
                ) : (
                  <Card className="card-add-chart">
                    <CardBody className="d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        onClick={() => addChart(i)}
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

export default connect(null, {
  addProfileDashboard,
})(NewDashPage);
