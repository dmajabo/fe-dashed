import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Container } from "reactstrap";

import NavTabs, { NavTabItem } from "components/Common/NavTabs";
import PageSubTitle from "components/Common/PageSubTitle";
import PageTitle from "components/Common/PageTitle";

import GamingActivity from "./GamingActivity";
import GamingOverview from "./GamingOverview";
import GamingSales from "./GamingSales";
import GamingStatistics from "./GamingStatistics";
import TitleBar from "components/Common/TitleBar";
import ChartPicker from "../../components/Common/ChartPicker";
import PageBreadcrumb from "components/Common/PageBreadcrumb";

import { useDispatch, useSelector } from "react-redux";
import { addNewChart, removeNewChart } from "../../store/user/actions";
import { gaming_breadcrumb } from "helpers/breadcrumbs";

export default function GamingDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const newChart = useSelector(state => state.User.newChart);

  const addItem = content => {
    let chartLength = 8 + newChart.length;
    dispatch(
      addNewChart({
        xxl: {
          i: chartLength.toString(),
          x: chartLength % 2 == 0 ? 6 : 0,
          y: Infinity,
          w: 6,
          h: 4,
        },
        content,
        lg: {
          i: chartLength.toString(),
          x: chartLength % 2 == 0 ? 6 : 0,
          y: Infinity,
          w: 12,
          h: 4,
        },
      })
    );
  };

  return (
    <div className="page-content ps-4">
      <Container fluid>
        <PageBreadcrumb items={gaming_breadcrumb} />
        <TitleBar
          title={
            <>
              <PageTitle text="Gaming" />
            </>
          }
          navbar={
            <NavTabs>
              <NavTabItem to="/gaming-dashboard/overview" label="Overview" />
              <NavTabItem to="/gaming-dashboard/sales" label="Sales" />
              {/* <NavTabItem to="/gaming-dashboard/statistics" label="Statistics" />
          <NavTabItem to="/gaming-dashboard/activity" label="Activity" /> */}
            </NavTabs>
          }
          onAddChart={() => setModalOpen(true)}
          onResetChart={() => dispatch(removeNewChart())}
        />
        <ChartPicker
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          chartPicked={addItem}
        />
        <Redirect
          exact
          from="/gaming-dashboard"
          to="/gaming-dashboard/overview"
        />
        <Route path="/gaming-dashboard/overview" component={GamingOverview} />
        <Route path="/gaming-dashboard/sales" component={GamingSales} />
        <Route
          path="/gaming-dashboard/statistics"
          component={GamingStatistics}
        />
        <Route path="/gaming-dashboard/activity" component={GamingActivity} />
      </Container>
    </div>
  );
}
