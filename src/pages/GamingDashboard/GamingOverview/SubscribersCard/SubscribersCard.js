import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

export default function SubscribersCard() {
  return (
    <>
      <ChartActionButtons />
      <Card>
        <CardBody>
          <h4>Overall Subscribers</h4>
        </CardBody>
      </Card>
    </>
  )
}
