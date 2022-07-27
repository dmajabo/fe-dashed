import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import chatIcon from "../../../assets/images/chat-icon.svg";

//i18n
import { withTranslation } from "react-i18next";

class ChatDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }));
  }
  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="dropdown d-inline-block"
          tag="li"
        >
          <DropdownToggle
            className="btn noti-icon"
            tag="button"
            id="page-header-notifications-dropdown"
          >
            <img src={chatIcon} />
            {/* <span className="badge badge-chat rounded-pill">4</span> */}
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0"> {this.props.t("Messages")} </h6>
                </Col>
                <div className="col-auto">
                  <a href="#" className="small">
                    {" "}
                    View All
                  </a>
                </div>
              </Row>
            </div>

            <SimpleBar style={{ height: "230px" }}></SimpleBar>
            <div className="p-2 border-top d-grid">
              <Link
                className="btn btn-sm btn-link font-size-14 text-center"
                to="#"
              >
                <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
                <span key="t-view-more">{this.props.t("View More..")}</span>
              </Link>
            </div>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

ChatDropdown.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(ChatDropdown);
