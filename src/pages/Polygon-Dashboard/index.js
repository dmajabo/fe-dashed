import React from "react";
import { useState } from "react";
import { Container } from "reactstrap";
import { Card, CardBody } from "reactstrap";

import ActionButtons from "../../components/Common/ChartActionButtons";
import ChartPicker from "../../components/Common/ChartPicker";
import TitleBar from "../../components/Common/TitleBar";

import {
  addChart,
  removeChartByIndex,
  resetChart,
} from "../../store/polygon-dashboard/actions";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const PolygonDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  document.title = "Polygon Ecoystem | Dashed by Lacuna";
  const dispatch = useDispatch();
  const { layoutLarge, layoutMd } = useSelector(
    state => state.PolygonChartSetting
  );
  const [resize, setResize] = useState(0);

  const removeItem = index => {
    dispatch(removeChartByIndex(index));
  };

  const addItem = content => {
    const i = layoutLarge.length.toString();

    dispatch(
      addChart({
        xxl: {
          i,
          x: layoutLarge.length % 2 == 0 ? 6 : 0,
          y: Infinity,
          w: 6,
          h: 3,
          content,
        },
        lg: {
          i,
          x: 0,
          y: 28,
          w: 12,
          h: 3,
          minW: 6,
          minH: 3,
          content,
        },
      })
    );
  };

  const handleResetChart = () => {
    dispatch(resetChart());
    setResize(resize + 1);
  };

  return (
    <div key={resize}>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="Polygon Ecosystem" /> */}
          <TitleBar
            title="General Dashboard"
            onAddChart={() => setModalOpen(true)}
            onResetChart={handleResetChart}
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
                  <Card className="card-add-chart">
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
    </div>
  );
};

export default PolygonDashboard;
