import React from 'react'
import { Card, CardBody } from 'reactstrap'
import CountUp from 'react-countup'

import ImgUp from '../../../../assets/images/positive.png'
import ImgDown from '../../../../assets/images/negative.png'
import './StatisticsCard.scss'

export default function StatisticsCard({ title, decimals = 0, description, value, change }) {
  return (
    <Card className="statistics-card">
      <CardBody>
        <h4 className="title">{title}</h4>
        <p className="description">{description}</p>
        <div className="d-flex">
          <div className="value">
            <CountUp
              start={Number(value) - (Number(value) / 10)}
              end={value}
              duration={2.75}
              separator=","
              decimals={decimals}
              delay={0}
            />
          </div>
          <div className="change ms-auto">
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
        </div>
      </CardBody>
    </Card>
  )
}
