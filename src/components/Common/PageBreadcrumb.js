import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

function PageBreadcrumb({ items = [] }) {
  return (
    <Breadcrumb listClassName="m-0 ">
      {items.map(({ title, to }, index) => (
        <BreadcrumbItem key={index}>
          <Link to={to}>{title}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default PageBreadcrumb;
