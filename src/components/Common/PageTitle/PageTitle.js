import React from 'react';
import cx from 'classnames'

import './PageTitle.scss'

export default function PageTitle({ text, className }) {
  return (
    <p className={cx('page-title', className)}>
      {text}
    </p>
  )
}