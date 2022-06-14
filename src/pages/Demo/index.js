import React from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

const DemoPage = () => {
  document.title = "Demo | Dashed by Lacuna";

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dashed" breadcrumbItem="Demo" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Line with Data Labels</CardTitle>
                  yo
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Dashed Line</CardTitle>
                  yo
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DemoPage;
