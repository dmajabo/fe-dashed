import React from "react";
import { Button } from "reactstrap";
import DashboardNavbar from "./DashboardNavbar";

export default function TitleBar({ title, navbar = <DashboardNavbar />, onAddChart, onResetChart }) {
  return (
    <div
      id="titlebar"
      className="rounded-4 px- d-flex justify-content-between align-items-center"
    >
      <div>
        <p className="font-size-24 text-white fw-bold">
          {title}
        </p>
        {navbar}
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
          onClick={onAddChart}
        >
          <i className="bx bx-plus font-size-14"></i>
          <span className="fw-bold px-2 font-size-14">Add New Chart</span>
        </Button>
        <div className="px-3">
          <Button
            color="primary"
            className="rounded-pill d-flex align-items-center justify-content-center btn-add"
            onClick={onResetChart}
          >
            <i className="bx bx-plus font-size-14"></i>
            <span className="fw-bold px-2 font-size-14">
              Reset to Defaults
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
