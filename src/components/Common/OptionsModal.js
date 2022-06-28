import React, { useState } from "react";
import { Modal } from "reactstrap";
import { Link } from "react-router-dom";

import vector_dashboard from "./../../assets/images/vector-dashboard.svg";
import vector_datastory from "./../../assets/images/vector-data-story.svg";

export default function OptionsModal({ visible, onDismiss }) {
  return (
    <Modal
      isOpen={visible}
      toggle={onDismiss}
      centered
      size={"lg"}
      className="options-modal"
    >
      <div className="">
        <div className="options-modal-content">
          <button
            type="button"
            onClick={onDismiss}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <Link to={"/"}>
            <div className="option-card">
              <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <img src={vector_dashboard} alt="" className="" />
              </div>
              <div className="option-card-button d-flex justify-content-center align-items-center">
                <a to="/" className="font-size-18 text-white">
                  Create Dashboard
                </a>
              </div>
            </div>
          </Link>
          <Link to="/story-flow">
            <div className="option-card">
              <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <img src={vector_datastory} alt="" className="" />
              </div>
              <div className="option-card-button d-flex justify-content-center align-items-center">
                <a className="font-size-18 text-white">Create Data Story</a>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
