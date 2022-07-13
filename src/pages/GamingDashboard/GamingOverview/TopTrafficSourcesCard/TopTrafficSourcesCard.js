import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

export default function TopTrafficSourcesCard() {
  return (
    <>
      <ChartActionButtons />
      <Card>
        <CardBody>
          <h4>Top Traffic Sources</h4>
        </CardBody>
      </Card>
    </>
  )
}
