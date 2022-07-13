import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

export default function TopTrafficChainCard() {
  return (
    <>
      <ChartActionButtons />
      <Card>
        <CardBody>
          <h4>Top Traffic by Chain</h4>
        </CardBody>
      </Card>
    </>
  )
}
