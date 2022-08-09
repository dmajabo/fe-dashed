import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addProfileDashboard } from "../../store/actions";

class TitleBar extends Component {
  constructor(props) {
    super(props);
  }

  newDash() {
    const demoDash = {
      title: "My Dash",
      route: "/dashboards/my-dash",
    };
    this.props.addProfileDashboard(demoDash);
    this.props.history.push(demoDash.route);
  };

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
            <div className="links">
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
              <a
                to="/dashboards/my-dash"
                className="me-3 font-size-16 fw-bold"
                activeClassName="active"
                onClick={this.newDash}
              >
                + New Dash
              </a>
            </div>
          </div>
          <div className="d-flex gx-5 align-items-center ">
            {/* <a
              href="#"
              className="fw-bold text-white font-size-14 bg-purple me-4"
            >
              Save Dashboard
            </a> */}
            <Button
              color="primary"
              className="rounded-pill d-flex align-items-center justify-content-center btn-add"
              onClick={this.props.onAddChart}
            >
              <i className="bx bx-plus font-size-14"></i>
              <span className="fw-bold px-2 font-size-14">Add New Chart</span>
            </Button>
            <div className="px-3">
              <Button
                color="primary"
                className="rounded-pill d-flex align-items-center justify-content-center btn-add"
                onClick={this.props.onResetChart}
              >
                <i className="bx bx-plus font-size-14"></i>
                <span className="fw-bold px-2 font-size-14">
                  Reset to Defaults
                </span>
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.string,
};

export default withRouter(connect(null, { addProfileDashboard })(TitleBar));
