import React from 'react'
import { Card, CardBody } from 'reactstrap'

import ChartActionButtons from 'components/Common/ChartActionButtons'

export default function UserRetentionCard() {
  return (
    <>
      <ChartActionButtons />
      <Card>
        <CardBody>
          <h4>User Retention</h4>
        </CardBody>
      </Card>
    </>
  )
}
