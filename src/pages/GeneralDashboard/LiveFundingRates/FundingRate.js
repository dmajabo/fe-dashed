import React, { useMemo } from "react"

export default function FundingRate({ rate }) {
  const color = useMemo(() => {
    if (!rate) {
      return 'var(--bs-body-color)'
    }

    const numberRate = Number(rate)

    if (numberRate < -14) return '#7DFF7A'
    if (numberRate < 0) return '#2BC128'
    if (numberRate < 14) return '#A9001E'
    return '#FB2047'
  }, [rate])

  return (
    <span style={{ color }}>{rate ? `${Number(rate).toFixed(2)}%` : '-' }</span>
  )
}
