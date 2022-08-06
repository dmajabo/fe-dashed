import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import * as echarts from 'echarts';

import './EngagementScoreCard.scss'

export default function EngagementScoreCard() {
  const [chart, setChart] = useState()

  useEffect(() => {
    const chartEl = document.getElementById('engagement-score-chart')

    const resizeObserver = new ResizeObserver(entries => {
      if (chart) {
        chart.resize()
      }
    })

    resizeObserver.observe(chartEl)

    return () => {
      resizeObserver.unobserve(chartEl)
    }
  }, [chart])

  useEffect(() => {
    var chartDom = document.getElementById('engagement-score-chart');
    var myChart = echarts.init(chartDom, 'dark');
    let option = {
      backgroundColor: 'transparent',
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        indicator: [
          { name: 'Login Frequency', max: 6500 },
          { name: 'Spending\nActivity', max: 16000 },
          { name: 'Playtime per session', max: 30000 },
          { name: 'Wallet\nBalance', max: 38000 },
        ],
        splitArea: {
          show: false
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000],
              name: 'Polygon',
              areaStyle: {
                opacity: 0.2
              }
            },
            {
              value: [5000, 14000, 28000, 26000],
              name: 'Solana',
              areaStyle: {
                opacity: 0.2
              }
            }
          ],
        }
      ]
    };
    myChart.setOption(option);

    setChart(myChart)
  }, [])

  useEffect(() => {
    return () => {
      if (chart?.dispose) {
        chart.dispose()
      }
    }
  }, [chart])

  return (
    <Card className="engagement-score">
      <CardBody>
        <h4 className="title">Engagement Score</h4>
        {/* <p className="description">some sort of analysis there to give context</p> */}
        <div id="engagement-score-chart"></div>
      </CardBody>
    </Card>
  )
}
