import React from "react";
import { Container } from "reactstrap";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Breadcrumbs from "../../components/Common/Breadcrumb";

const ResponsiveGridLayout = WidthProvider(Responsive);

const MockContent = () => (
  <div
    style={{
      border: "1px dashed #f5f5f5",
      width: "100%",
      height: "calc(100% - 48px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Hello, world.
  </div>
);

const LayoutExample = () => {
  document.title = "Layout Example | Dashed by Lacuna";

  // { i: "b", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4, static: false },

  const layoutLarge = [
    { i: "a", x: 0, y: 0, w: 6, h: 2 },
    { i: "b", x: 6, y: 0, w: 6, h: 2 },
    { i: "c", x: 0, y: 0, w: 3, h: 2 },
    { i: "d", x: 3, y: 0, w: 3, h: 2 },
    { i: "e", x: 6, y: 0, w: 3, h: 2 },
    { i: "f", x: 9, y: 0, w: 3, h: 2 },
    { i: "g", x: 0, y: 0, w: 12, h: 2 },
  ];

  const layoutMd = [
    { i: "a", x: 0, y: 0, w: 4, h: 2 },
    { i: "b", x: 4, y: 0, w: 6, h: 2 },
    { i: "c", x: 0, y: 0, w: 2, h: 2 },
    { i: "d", x: 2, y: 0, w: 2, h: 2 },
    { i: "e", x: 4, y: 0, w: 2, h: 2 },
    { i: "f", x: 6, y: 0, w: 4, h: 2 },
    { i: "g", x: 0, y: 0, w: 10, h: 2 },
  ];

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dashboards" breadcrumbItem="General" />
          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996 }}
            cols={{ lg: 12, md: 10 }}
            layouts={{ lg: layoutLarge, md: layoutMd }}
          >
            <div key="a">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card #1</CardTitle>
                  <MockContent />
                </CardBody>
              </Card>
            </div>
            <div key="b">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card #2</CardTitle>
                  <MockContent />
                </CardBody>
              </Card>
            </div>
            <div key="c">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card #3</CardTitle>
                  <MockContent />
                </CardBody>
              </Card>
            </div>
            <div key="d">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card #4</CardTitle>
                  <MockContent />
                </CardBody>
              </Card>
            </div>
            <div key="e">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card #5</CardTitle>
                  <MockContent />
                </CardBody>
              </Card>
            </div>
            <div key="f">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card #6</CardTitle>
                  <MockContent />
                </CardBody>
              </Card>
            </div>
            <div key="g">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card #7</CardTitle>
                  <MockContent />
                </CardBody>
              </Card>
            </div>
          </ResponsiveGridLayout>
        </Container>
      </div>
    </>
  );
};

export default LayoutExample;
