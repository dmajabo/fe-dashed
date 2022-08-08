import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import * as echarts from 'echarts';

import './SubscribersCard.scss'

export default function SubscribersCard() {
  const [chart, setChart] = useState()

  const options = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      itemWidth: 24,
      itemHeight: 24,
      textStyle: {
        fontSize: 14,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      type: 'category'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Existing',
        type: 'bar',
        barWidth: 15,
        stack: 'x',
        emphasis: {
          focus: 'series'
        },
        barWidth: 24,
        color: 'rgba(155, 252, 200, 0.5)',
        data: [320, 302, 301, 334, 390, 330, 320, 320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'New',
        type: 'bar',
        barWidth: 15,
        stack: 'x',
        emphasis: {
          focus: 'series'
        },
        barWidth: 24,
        color: 'rgb(155, 252, 200)',
        data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
      },
    ]
  }), []);

  useEffect(() => {
    const el = document.getElementById('overall-subscribers')
    if (chart) {
      chart.clear()
    }

    const newChart = echarts.init(el, 'dark')
    newChart.setOption(options)
    setChart(newChart)
  }, [options])

  useEffect(() => {
    const el = document.querySelector('.overall-subscribers .card-body')

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        chart?.resize({ width: entry.contentRect.width, height: entry.contentRect.height - 32 })
      }
    })

    if (el)
    resizeObserver.observe(el)

    return () => {
      resizeObserver.unobserve(el)
    }
  }, [chart])

  return (
    <Card className="overall-subscribers">
      <CardBody>
        <h4>Overall Subscribers</h4>
        <div id="overall-subscribers"></div>
      </CardBody>
    </Card>
  )
}
