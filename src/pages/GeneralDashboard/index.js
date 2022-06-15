import React from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Scatter from "./globaltemperaturetrends";
import RadarChart from "pages/AllCharts/chartjs/radarchart";
import BTCCard from "./barchartrace";
import BTCPerp from "./btc-perp";

const GeneralDashboard = () => {
  document.title = "General Dashboard | Dashed by Lacuna";

  const [items, setItems] = React.useState({
    left: [
      { id: 1, name: "BTC", component: <BTCCard /> },
      { id: 2, name: "Avg Funding Rates Over Time", component: <Scatter /> },
      { id: 3, name: "Buying and Selling Activity", component: <RadarChart /> },
      {
        id: 4,
        name: "Best BTC Perpetual Funding Rates",
        component: <BTCPerp />,
      },
      {
        id: 5,
        name: "Bitcoin Monthly Performance",
        component: <div>..to do</div>,
      },
    ],
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result,
    });
  }

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dashboards" breadcrumbItem="General" />

          {/* <Row>
            <GridContextProvider onChange={onChange}>
              <div className="container">
                <GridDropZone
                  className="dropzone left"
                  id="left"
                  boxesPerRow={2}
                  rowHeight={300}
                >
                  {items.left.map(item => (
                    <GridItem key={item.name}>
                      <div className="grid-item">
                        <div className="grid-item-content">
                          <CardTitle className="mb-4">
                            {item.name.toUpperCase()}
                          </CardTitle>

                          <Card>{item.component}</Card>
                        </div>
                      </div>
                    </GridItem>
                  ))}
                </GridDropZone>
              </div>
            </GridContextProvider>
          </Row> */}

          <Row>
            <Col lg={12}>
              <Card>
                <BTCCard />
              </Card>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Avg Funding Rates Over Time
                  </CardTitle>
                  <Scatter />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Buying and Selling Activity (NEED DATA)
                  </CardTitle>
                  <RadarChart />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <BTCPerp />
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Bitcoin Monthly Performance (2020 - 2021) (stretch goal)
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GeneralDashboard;
