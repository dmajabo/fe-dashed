import React from 'react'
import { Card, CardBody } from 'reactstrap'
import CountUp from 'react-countup'

import ChartActionButtons from 'components/Common/ChartActionButtons'

import ImgUp from '../../../../assets/images/positive.png'
import ImgDown from '../../../../assets/images/negative.png'
import './TotalSalesByChainCard.scss'

export default function TotalSalesByChainCard() {
  const value = 45367
  const change = 12

  return (
    <>
      <ChartActionButtons />
      <Card className="total-sales-by-chain">
        <CardBody>
          <h4 className="title">Total Sales by Chain</h4>
          <p className="value">
            <CountUp
              start={Number(value) - (Number(value) / 10)}
              end={value}
              duration={2.75}
              separator=","
              decimals={0}
              delay={0}
            />
          </p>
          <div className="description">Sales last 90 days</div>
          <div className="change">
            {Number(change) > 0 && (
              <>
                <img className="me-2" src={ImgUp} alt="Up" />
                +
              </>
            )}
            {Number(change) < 0 && (
              <>
                <img className="me-2" src={ImgDown} alt="Down" />
              </>
            )}
            {change} %
          </div>
        </CardBody>
      </Card>
    </>
  )
}
