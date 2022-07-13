import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavTabItem.scss'

export default function NavTabItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className="nav-tab-item"
      activeClassName="active"
    >
      {label}
    </NavLink>
  )
}
