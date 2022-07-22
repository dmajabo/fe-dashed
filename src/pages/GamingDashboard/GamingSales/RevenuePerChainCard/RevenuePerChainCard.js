import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

import './RevenuePerChainCard.scss'

export default function RevenuePerChainCard() {
  return (
    <>
      <ChartActionButtons />
      <Card className="statistics-card">
        <CardBody>
          <h4 className="title">Revenue per Chain</h4>
          <p className="description">some sort of analysis there to give context</p>
        </CardBody>
      </Card>
    </>
  )
}
