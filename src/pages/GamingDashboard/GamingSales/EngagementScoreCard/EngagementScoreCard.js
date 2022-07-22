import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

import './EngagementScoreCard.scss'

export default function EngagementScoreCard() {
  return (
    <>
      <ChartActionButtons />
      <Card className="statistics-card">
        <CardBody>
          <h4 className="title">Engagement Score</h4>
          <p className="description">some sort of analysis there to give context</p>
        </CardBody>
      </Card>
    </>
  )
}
