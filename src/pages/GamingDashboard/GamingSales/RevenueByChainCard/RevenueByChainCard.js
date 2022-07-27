import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import * as echarts from 'echarts';

import ChartActionButtons from 'components/Common/ChartActionButtons'

import dummy from './dummy.json'
import './RevenueByChainCard.scss'

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
    var option;

    const chains = [
      'Solana',
      'Ethereum',
      'Polygon',
      'Avalanche',
    ];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(chains, function (chain) {
      var datasetId = 'dataset_' + chain;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1950 },
              { dimension: 'Chain', '=': chain }
            ]
          }
        }
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: chain,
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.value[3] + ': ' + params.value[0];
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'Year',
          y: 'Income',
          label: ['Chain', 'Income'],
          itemName: 'Year',
          tooltip: ['Income']
        }
      });
    });
    option = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: dummy.data,
        },
        ...datasetWithFilters
      ],
      backgroundColor: 'transparent',
      legend: {
        data: ['Solana', 'Ethereum', 'Polygon', 'Avalanche']
      },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle'
      },
      yAxis: {
      },
      grid: {
        right: 140
      },
      series: seriesList
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
    <>
      <ChartActionButtons />
      <Card className="revenue-by-chain">
        <CardBody>
          <h4 className="title">Revenue by Chain</h4>
          <div id="revenue-by-chain-chart"></div>
        </CardBody>
      </Card>
    </>
  )
}
