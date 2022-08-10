import React, { Component } from "react";
import "react-drawer/lib/react-drawer.css";

import { NavLink } from "react-router-dom";

import logoDashed from "../../assets/images/logo-light.svg";

class HeaderLogo extends Component {
  render() {
    return (
      <React.Fragment>
        <header id="page-topbar" style={{height: "80px"}}>
          <div className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0">
            <NavLink to="/" className="">
              <span className="">
                <img src={logoDashed} alt="" style={{ height: 16 }} />
              </span>
            </NavLink>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default HeaderLogo;
