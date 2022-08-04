import PropTypes from "prop-types";
import React, { Component } from "react";
import "react-drawer/lib/react-drawer.css";

import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import { NavLink } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ChatDropdown from "../CommonForBoth/TopbarDropdown/ChatDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logoDashed from "../../assets/images/logo-light.svg";

import ellipse from "../../assets/images/ellipse.svg";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

import { openModal } from "../../store/actions";

import {
  IconDiscover,
  IconDataStories,
  IconDashboards,
} from "components/Common/Icon";

const menu_items = [
  { to: "/community", title: "Discover", icon: <IconDiscover /> },
  { to: "/general-dashboard", title: "Dashboards", icon: <IconDashboards /> },
  { modal: "storyFlow", title: "Data Stories", icon: <IconDataStories /> },
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      open: false,
      position: "right",
      hoverPosition: null,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.hover = this.hover.bind(this);
    this.openModal = this.props.openModal;
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  hover(index) {
    this.setState({ hoverPosition: index * (160 + 16) });
  }

  unhover() {
    this.setState({ hoverPosition: null });
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0">
            <NavLink to="/" className="">
              <span className="">
                <img src={logoDashed} alt="" style={{ height: 16 }} />
              </span>
            </NavLink>
          </div>
          <div className="navbar-header d-flex justify-content-between align-items-center">
            <div className="d-flex z-10">
              <button
                type="button"
                onClick={this.toggleMenu}
                className="btn btn-sm font-size-16 rounded-circle"
                id="vertical-menu-btn"
              >
                <img src={ellipse} />
                {/* <i className="fa fa-fw fa-bars"></i> */}
              </button>

              <ul
                className="metismenu d-flex align-items-center list-unstyled"
                onMouseLeave={() => this.unhover()}
              >
                {this.state.hoverPosition !== null && (
                  <div
                    className="animated-menu"
                    style={{
                      marginLeft: this.state.hoverPosition,
                    }}
                  ></div>
                )}

                {menu_items.map(({ to, title, icon, modal }, index) => (
                  <li
                    className="header-space"
                    style={{ zIndex: 10, width: 160 }}
                    key={index}
                    onMouseEnter={() => this.hover(index)}
                  >
                    {to ?
                      <NavLink
                        to={to}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <div className="header-main-icon">{icon}</div>
                        <span>{this.props.t(title)}</span>
                      </NavLink>
                      :
                      modal ? <a
                        onClick={() => this.openModal('storyFlow')}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <div className="header-main-icon">{icon}</div>
                        <span>{this.props.t(title)}</span>
                      </a>
                        :
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="header-main-icon">{icon}</div>
                          <span>{this.props.t(title)}</span>
                        </div>
                    }
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-flex justify-content-center align-items-center z-10">

              <div className="">
                <ProfileMenu />
              </div>

              <div className="">
                <NavLink to={"/chat"}>
                  <ChatDropdown />
                </NavLink>
              </div>

              <div className="header-space-sm mt-1">
                <NotificationDropdown />
              </div>

              <NavLink
                to={{ pathname: "https://dream.trade" }}
                target="_blank"
                className="px-3 btn btn-success rounded-pill font-size-14 fw-bold d-flex align-items-center justify-content-center"
              >
                <i className="bx bx-transfer-alt me-2" />
                <span>{this.props.t("Trade")}</span>
              </NavLink>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  t: PropTypes.any,
  toggleMenuCallback: PropTypes.any,
  showRightSidebar: PropTypes.any,
  toggleRightSidebar: PropTypes.func,
  openModal: PropTypes.func,
};

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar } = state.Layout;
  return { layoutType, showRightSidebar };
};

export default connect(mapStatetoProps, {
  toggleRightSidebar,
  openModal
})(withTranslation()(Header));
