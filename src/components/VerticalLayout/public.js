import React, { Component } from "react";

// Layout Related Components
import HeaderLogo from "./HeaderLogo";
import Footer from "./Footer";

class LayoutPublic extends Component {

  render() {
    return (
      <React.Fragment>
        <div id="layout-wrapper">
          <HeaderLogo />

          <div className="main-content">{this.props.children}</div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default LayoutPublic;
