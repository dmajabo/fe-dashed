import React, { useMemo } from "react"

export default function FundingRate({ rate }) {
  const color = useMemo(() => {
    if (!rate) {
      return 'var(--bs-body-color)'
    }

    const numberRate = Number(rate)

    if (numberRate < -14) return '#A2FFA1'
    if (numberRate < 0) return '#FF4869'
    if (numberRate < 14) return '#FF4869'
    return '#FF4869'
  }, [rate])

  return (
    <span style={{ color }}>{rate ? `${Number(rate).toFixed(2)}%` : '-' }</span>
  )
}
