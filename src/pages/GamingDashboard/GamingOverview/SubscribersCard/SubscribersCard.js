import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import * as echarts from 'echarts';

import ChartActionButtons from 'components/Common/ChartActionButtons'

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
    legend: {},
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
        name: 'Total',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [1000, 302, 301, 334, 390, 330, 320, 1000, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'Origin',
        type: 'bar',
        barWidth: 5,
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [800, 302, 301, 334, 390, 330, 320, 800, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'Gained',
        type: 'bar',
        barWidth: 5,
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [320, 302, 301, 334, 390, 330, 320, 320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'Lost',
        type: 'bar',
        barWidth: 5,
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [-120, -132, -101, 134, 90, 230, 210, -120, -132, -101, 134, 90, 230, 210]
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
    const el = document.getElementById('overall-subscribers')

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        chart?.resize({ width: entry.contentRect.width, height: entry.contentRect.height })
      }
    })

    resizeObserver.observe(el)

    return () => {
      resizeObserver.unobserve(el)
    }
  }, [chart])

  return (
    <>
      <ChartActionButtons />
      <Card className="overall-subscribers">
        <CardBody>
          <h4>Overall Subscribers</h4>
          <p className="ff-inter text-white">some sort of analysis there to give context</p>
          <div id="overall-subscribers"></div>
        </CardBody>
      </Card>
    </>
  )
}
