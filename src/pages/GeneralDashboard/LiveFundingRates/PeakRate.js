import React from "react"
import FundingRate from "./FundingRate"

import './PeakRate.scss'

export default function PeakRate({ label, rate }) {
  return (
    <div className="peak-rate">
      <span className="label">{label}</span>
      <img className="symbol" src={rate.symbolLogo} />
      <span>{rate.symbol}</span>
      <img className="symbol" src={rate.exchangeLogo} />
      <span>{rate.exchangeName}</span>
      <FundingRate rate={rate.annualRate} />
    </div>
  )
}
