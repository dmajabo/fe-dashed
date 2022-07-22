import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

import './AvgWalletBalanceVsSpending.scss'

export default function AvgWalletBalanceVsSpending() {
  return (
    <>
      <ChartActionButtons />
      <Card className="statistics-card">
        <CardBody>
          <h4 className="title">Avg Wallet Balance vs Avg Spend (USD)</h4>
          <p className="description">some sort of analysis there to give context</p>
        </CardBody>
      </Card>
    </>
  )
}
