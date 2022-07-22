import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

import './RevenueByChainCard.scss'

export default function RevenueByChainCard() {
  return (
    <>
      <ChartActionButtons />
      <Card className="statistics-card">
        <CardBody>
          <h4 className="title">Revenue by Chain</h4>
          {/* <p className="description"></p> */}
        </CardBody>
      </Card>
    </>
  )
}
