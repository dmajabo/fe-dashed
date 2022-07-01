import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";

class TitleBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          id="titlebar"
          className="rounded-4 px- d-flex justify-content-between align-items-center"
        >
          <div>
            <p className="font-size-24 text-white fw-bold">
              {this.props.title}
            </p>
            <div className="d-flex">
              <NavLink
                to="/general-dashboard"
                className="me-3 font-size-16 fw-bold"
                activeClassName="active"
              >
                General Dashboard
              </NavLink>
              <NavLink
                to="/polygon-dashboard"
                className="me-3 font-size-16 fw-bold"
                activeClassName="active"
              >
                Polygon Ecosystem
              </NavLink>
              <NavLink
                to="/nft"
                className="font-size-16 fw-bold"
                activeClassName="active"
              >
                NFTs
              </NavLink>
            </div>
          </div>
          <div className="d-flex gx-5 align-items-center ">
            <a
              href="#"
              className="fw-bold text-white font-size-14 bg-purple me-4"
            >
              Save Dashboard
            </a>
            <Button
              color="primary"
              className="rounded-pill d-flex align-items-center justify-content-center"
              onClick={this.props.onAddChart}
            >
              <i className="bx bx-plus font-size-14"></i>
              <span className="fw-bold px-2 text-white bg-blue font-size-14">
                Add New Chart
              </span>
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.string,
};

export default TitleBar;