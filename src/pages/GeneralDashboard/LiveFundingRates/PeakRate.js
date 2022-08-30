import React from "react"
import FundingRate from "./FundingRate"

import './PeakRate.scss'

export default function PeakRate({ label, rate }) {
  return (
    <div className="peak-rate">
      <span className="label">{label}</span>
      <FundingRate rate={rate.annualRate} />
      <img className="symbol" src={rate.symbolLogo} />
      <span className="symbol-name">{rate.symbol}</span>
      <img className="symbol" src={rate.exchangeLogo} />
      <span className="symbol-value">{rate.exchangeName}</span>
    </div>
  )
}
