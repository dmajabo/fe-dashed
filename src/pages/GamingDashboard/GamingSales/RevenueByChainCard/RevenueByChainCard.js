import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import * as echarts from 'echarts';

import dummy from './dummy.json'
import './RevenueByChainCard.scss'
import { currencyFormatter } from 'helpers/formatters';

let base = +new Date(2022, 0, 0);
let oneDay = 24 * 3600 * 1000;
let date = [];
let dataSet = [
  [Math.random() * 40000],
  [Math.random() * 30000],
  [Math.random() * 20000],
  [Math.random() * 10000],
];

function addNewData(data) {
  data.push(Math.round((Math.random() - 0.5) * 1000 + data[i - 1]));
}

for (let i = 1; i < 365; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  dataSet.forEach(data => {
    data.push(Math.round((Math.random() - 0.5) * 1000 + data[i - 1]));
  })
}

export default function RevenueByChainCard() {
  const [chart, setChart] = useState()

  useEffect(() => {
    const chartEl = document.getElementById('revenue-by-chain-chart')

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
    var chartDom = document.getElementById('revenue-by-chain-chart');
    var myChart = echarts.init(chartDom, 'dark');
    var option = {
      tooltip: {
        trigger: 'axis',
        formatter: (params, ticket, callback) => {
          const total = params.reduce((pre, cur) => pre + cur.value, 0)

          const tooltip = document.createElement('div')
          tooltip.className = '_tooltip'
          tooltip.innerHTML = `
            <div class="total">${currencyFormatter.format(total)}</div>
            ${params.map(({ value, color, seriesName }) => `
              <div class="serie">
                <div class="tag" style="background-color: ${color}"></div>
                <div class="name">${seriesName}</div>
                <div class="value">$ ${Math.round(value / 1000)}k</div>
              </div>
            `).join('')}
          `

          return tooltip
        },
        valueFormatter: (value) => '$' + Math.floor(value / 1000) + 'k',
        backgroundColor: '#000000',
        borderColor: 'transparent',
      },
      legend: {
        right: 80,
        data: ['Ethereum', 'Solana', 'Polygon', 'Avalanche'],
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        itemStyle: {
          borderCap: 'round'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
          formatter: value => `$${Math.round(value / 1000)}k`
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      backgroundColor: 'transparent',
      series: [
        {
          name: 'Avalanche',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgba(255, 62, 62, 1)'
          },
          data: dataSet[0]
        },
        {
          name: 'Polygon',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgba(149, 72, 252, 1)'
          },
          data: dataSet[1]
        },
        {
          name: 'Solana',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgba(88, 215, 100, 1)'
          },
          data: dataSet[2]
        },
        {
          name: 'Ethereum',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgba(46, 202, 236, 1)'
          },
          data: dataSet[3]
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
    <Card className="revenue-by-chain">
      <CardBody>
        <h4 className="title">Revenue by Chain</h4>
        <div id="revenue-by-chain-chart"></div>
      </CardBody>
    </Card>
  )
}
