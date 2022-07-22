import React from 'react'

import './NavTabs.scss'

export default function NavTabs({ children }) {
  return (
    <nav className='ds__nav-tabs'>
      {children}
    </nav>
  )
}
