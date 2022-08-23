import React from 'react';
import NavTabs, { NavTabItem } from "./NavTabs";

export default function DashboardNavbar() {
  return (
    <NavTabs>
      <NavTabItem to="/general-dashboard" label="General Dashboard" />
      <NavTabItem to="/polygon-dashboard" label="Polygon Ecosystem" />
      <NavTabItem to="/gaming-dashboard" label="Gaming" />
      <NavTabItem to="/dashboards/my-dash" label="+ New Dash" />
    </NavTabs>
  )
}
