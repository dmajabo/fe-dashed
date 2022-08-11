import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { Container } from "reactstrap";

import NavTabs, { NavTabItem } from 'components/Common/NavTabs';
import PageSubTitle from 'components/Common/PageSubTitle';
import PageTitle from 'components/Common/PageTitle';

import GamingActivity from './GamingActivity';
import GamingOverview from './GamingOverview';
import GamingSales from './GamingSales';
import GamingStatistics from './GamingStatistics';
import TitleBar from 'components/Common/TitleBar';


export default function GamingDashboard() {
  return (
    <div className="page-content ps-4">
      <Container fluid>
        <TitleBar
          title={(
            <>
              <PageTitle text="Your game metrics" />
              <PageSubTitle>
                powered by Bolt<sup>TM</sup>
              </PageSubTitle>
            </>
          )}
          navbar={(
            <NavTabs>
              <NavTabItem to="/gaming-dashboard/overview" label="Overview" />
              <NavTabItem to="/gaming-dashboard/sales" label="Sales" />
              {/* <NavTabItem to="/gaming-dashboard/statistics" label="Statistics" />
          <NavTabItem to="/gaming-dashboard/activity" label="Activity" /> */}
            </NavTabs>
          )}
        />
        <Redirect exact from="/gaming-dashboard" to="/gaming-dashboard/overview" />
        <Route path="/gaming-dashboard/overview" component={GamingOverview} />
        <Route path="/gaming-dashboard/sales" component={GamingSales} />
        <Route path="/gaming-dashboard/statistics" component={GamingStatistics} />
        <Route path="/gaming-dashboard/activity" component={GamingActivity} />
      </Container>
    </div>
  )
}
