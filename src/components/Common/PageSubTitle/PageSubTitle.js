import React from 'react';
import cx from 'classnames'

import './PageSubTitle.scss'

export default function PageSubTitle({ className, children }) {
  return (
    <p className={cx('page-sub-title', className)}>
      {children}
    </p>
  )
}