import React from "react";

import { CardBody, CardTitle, Col, Row } from "reactstrap";

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const BTCPerp = () => {
  const { SearchBar } = Search;

  // Table data
  const products = [
    {
      id: 1,
      name: "AAX Futures",
      price: 29282,
      change: -2.599,
      index: 29053.25,
      basis: -0.7811966395738,
      spread: 0.15,
      fundingRate: -0.007338,
      openInterest: 297652447.25,
      volume: 197673390,
      lastTraded: 1654922025,
    },
    {
      id: 2,
      name: "FTX (Derivatives)",
      price: 29304,
      change: -2.514,
      index: 29300.75875,
      basis: -0.0110607766857767,
      spread: 0.1,
      fundingRate: -0.0024,
      openInterest: 1765720440.87,
      volume: 2808131547.0295,
      lastTraded: 1654922489,
    },
  ];

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
    },
    {
      dataField: "change",
      text: "Change percentage",
      sort: true,
    },
    {
      dataField: "index",
      text: "Index",
      sort: true,
    },
    {
      dataField: "basis",
      text: "Basis",
      sort: true,
    },
    {
      dataField: "spread",
      text: "Spread",
      sort: true,
    },
    {
      dataField: "fundingRate",
      text: "Funding Rate",
      sort: true,
    },
    {
      dataField: "openInterest",
      text: "Open Interest",
      sort: true,
    },
    {
      dataField: "volume",
      text: "Volume",
      sort: true,
    },
    {
      dataField: "lastTraded",
      text: "Last Traded",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: products.length, // replace later with size(customers),
    custom: true,
  };

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  };
  return (
    <CardBody>
      <CardTitle className="mb-4">Best BTC Perpetual Funding Rates</CardTitle>
      <PaginationProvider
        pagination={paginationFactory(pageOptions)}
        keyField="id"
        columns={columns}
        data={products}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={products}
            search
          >
            {toolkitProps => (
              <React.Fragment>
                <Row className="mb-2">
                  <Col md="4">
                    <div className="search-box me-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <SearchBar {...toolkitProps.searchProps} />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    <div className="table-responsive">
                      <BootstrapTable
                        keyField={"id"}
                        responsive
                        bordered={false}
                        striped={false}
                        defaultSorted={defaultSorted}
                        selectRow={selectRow}
                        classes={"table align-middle table-nowrap"}
                        headerWrapperClasses={"thead-light"}
                        {...toolkitProps.baseProps}
                        {...paginationTableProps}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-md-center mt-30">
                  <Col className="inner-custom-pagination d-flex">
                    <div className="d-inline">
                      <SizePerPageDropdownStandalone {...paginationProps} />
                    </div>
                    <div className="text-md-right ms-auto">
                      <PaginationListStandalone {...paginationProps} />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
    </CardBody>
  );
};

export default BTCPerp;
