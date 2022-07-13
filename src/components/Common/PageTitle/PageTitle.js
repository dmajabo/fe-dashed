import React from 'react';
import cx from 'classnames'

import './PageTitle.scss'

export default function PageTitle({ title, className }) {
  return (
    <p className={cx('page-title', className)}>
      {title}
    </p>
  )
}