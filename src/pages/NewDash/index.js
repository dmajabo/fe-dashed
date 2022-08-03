import React, { useState } from "react";
import { Card, CardBody, Container } from "reactstrap";

import TitleBar from "../../components/Common/TitleBar";
import ActionButtons from "../../components/Common/ChartActionButtons";
import ChartPicker from "../../components/Common/ChartPicker";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

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

const NewDashPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  document.title = "New Dash | Dashed by Lacuna";

  const [layoutLarge, setlayoutLarge] = useState(_layoutLarge);
  const [layoutMd, setlayoutMd] = useState(_layoutMd);
  const [currentIndex, setcurrentIndex] = useState();

  const chartAdded = layoutLarge.filter(l => l?.content).length > 0;

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

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="Polygon Ecosystem" /> */}
          <TitleBar
            title="My Dashboard"
            onAddChart={() => setModalOpen(true)}
          />

          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996 }}
            cols={{ lg: 12, md: 12 }}
            layouts={{ lg: layoutLarge, md: layoutMd }}
          >
            {layoutLarge.map(({ i, content: Content }) => (
              <div
                key={i}
                className={[chartAdded && !Content && "hidden-card"]}
              >
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

export default NewDashPage;
