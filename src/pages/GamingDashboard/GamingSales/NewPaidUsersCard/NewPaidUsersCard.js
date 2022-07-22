import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

import './NewPaidUsersCard.scss'

export default function NewPaidUsersCard() {
  return (
    <>
      <ChartActionButtons />
      <Card className="statistics-card">
        <CardBody>
          <h4 className="title">New Paid Users</h4>
          <p className="description">some sort of analysis there to give context</p>
        </CardBody>
      </Card>
    </>
  )
}
