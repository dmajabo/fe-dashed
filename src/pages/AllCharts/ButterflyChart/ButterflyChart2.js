import React, { useEffect, useMemo, useState } from "react";
import ReactHighcharts from "react-highcharts";
import axios from "axios";
import cx from 'classnames';
import { CardSubtitle } from "reactstrap";

import './ButterflyChart2.css';

const bannedCoins = [
  'USDT', 'USDC', 'USDC', 'BUSD', 'WrappedBTC', 'stETH', 'DAI'
]

function getPriceChange(start, end) {
  const diff = start.open - end.close
  return Math.round(diff / start.open * 100)
}

function scaleValue(value) {
  if (value < -15) {
    // -30- ~ -15 => -1 ~ -0.75
    const diff = (Math.max(value, -30) + 15) / 15 * 0.25
    return 32 * (diff - 0.75)
  } else if (value < -5) {
    // -15 ~ -5 => -0.75 ~ -0.625
    const diff = (value + 5) / 10 * 0.125
    return 32 * (diff - 0.625)
  } else if (value < 5) {
    // -5 ~ 5 => -0.625 ~ 0.625
    const diff = value / 5 * 0.625
    return 32 * diff
  } else if (value < 15) {
    // 5 ~ 15 => 0.625 ~ -0.75
    const diff = (value - 5) / 10 * 0.125
    return 32 * (diff + 0.625)
  } else {
    // 15 ~ 30+ => 0.75 ~ 1
    const diff = (Math.min(value, 30) - 15) / 15 * 0.25
    return 32 * (diff + 0.75)
  }
}

function scaleTick(value) {
  if (value <= 20) {
    return value / 4
  } else if (value === 24) {
    return 15
  } else if (value === 28) {
    return 20
  } else {
    return 30
  }
}

function getColor(value) {
  if (value < -20) {
    return '#FD2249'
  } else if (value < -10) {
    return '#E21E41'
  } else if (value < -5) {
    return '#C41A39'
  } else if (value < -1) {
    return '#A0162E'
  } else if (value < 0) {
    return '#710F21'
  } else if (value < 1) {
    return '#003E29'
  } else if (value < 3) {
    return '#00583A'
  } else if (value < 5) {
    return '#007C52'
  } else if (value < 10) {
    return '#009865'
  } else if (value < 20) {
    return '#00AF74'
  } else {
    return '#00C482'
  }
}

export default function CryptoPricesByMarketCap() {
  const [data, setData] = useState([])
  const [dateRange, setDateRange] = useState('lastWeek')

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD&api_key=d4f8f8f26facb0537c536e5647fb32976c05032cc0cccaf81abf3b33ee25fc5c')
      .then(({ data }) => {
        const { Data } = data
        const top50Coins = Data.filter(coin => !bannedCoins.includes(coin.CoinInfo.Name))

        Promise.all(top50Coins.map(coin => axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin.CoinInfo.Name}&tsym=USD&limit=30&api_key=d4f8f8f26facb0537c536e5647fb32976c05032cc0cccaf81abf3b33ee25fc5c`)))
          .then(responses => responses.map(res => res.data.Data.Data))
          .then(histories => histories.map((history, index) => ({
            symbol: top50Coins[index].CoinInfo.Name,
            last24: getPriceChange(history[30], history[30]),
            lastWeek: getPriceChange(history[24], history[30]),
            lastMonth: getPriceChange(history[0], history[30]),
          })))
          .then(data => {
            setData(data.sort((a, b) => a.lastWeek - b.lastWeek))
          })
      });
  }, [])

  const config = useMemo(() => {
    const sortedData = data.sort((a, b) => a[dateRange] - b[dateRange])

    return {
      chart: {
        type: 'bar',
        backgroundColor: "transparent",
      },
      title: {
        visible: false,
        text: ""
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        itemStyle: {
          color: '#fffffff0',
          fontSize: '10px',
          transform: 'translateY(-3px)',
          fontFamily: 'var(--bs-body-font-family)',
        },
        itemHoverStyle: {
          color: '#ffffff',
        },
        symbolWidth: 16,
        symbolHeight: 16,
        symbolRadius: 4,
        verticalAlign: 'top',
      },
      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
        }
      },
      xAxis: [{
        visible: false,
        reversed: false,
      }, { // mirror axis on right side
        visible: false,
        opposite: true,
        reversed: false,
        linkedTo: 0,
      }],
      yAxis: {
        title: {
          text: null
        },
        max: 32,
        min: -32,
        offset: 10,
        gridLineColor: '#222222',
        labels: {
          formatter: function () {
            const color = this.value > 0 ? '#00C482' : this.value < 0 ? '#C41A39' : '#FFFFFF'
            return `<span style="color: ${color}">${scaleTick(Math.abs(this.value)) + '%'}</span>`;
          },
        },
        tickAmount: 17,
      },

      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            shape: 'square',
            backgroundColor: 'transparent',
            style: {
              color: '#ffffff',
              textOutline: 'none',
              textTransform: 'uppercase',
            }
          }
        }
      },
      series: [{
        name: 'Top 10 Negative',
        data: sortedData.slice(0, 10).reverse().map(info => ({
          className: 'translateY-2',
          y: scaleValue(info[dateRange]) + 0.2,
          dataLabels: {
            enabled: true,
            format: info.symbol,
            // y: 0,
          },
          color: getColor(info[dateRange])
        })),
        borderWidth: 0,
        borderRadius: 3,
        color: '#FD2249',
        pointWidth: 18,
        grouping: false,
      }, {
        name: 'Top 10 Positive',
        data: sortedData.slice(-10).map(info => ({
          className: 'translateY-2-',
          y: Math.abs(scaleValue(info[dateRange])),
          dataLabels: {
            enabled: true,
            format: info.symbol,
            // y: 0,
          },
          color: getColor(info[dateRange])
        })),
        borderWidth: 0,
        borderRadius: 3,
        color: '#00C482',
        pointWidth: 18,
        grouping: false,
        left: 10
      }]
    }
  }, [data, dateRange])

  return (
    <>
      <CardSubtitle>Based on top 50 coins</CardSubtitle>
      <ReactHighcharts
        config={config}
      />
      <div className="btn-group">
        <div className={cx(dateRange === 'lastMonth' && 'active')} onClick={() => setDateRange('lastMonth')}>30 days</div>
        <div className={cx(dateRange === 'lastWeek' && 'active')} onClick={() => setDateRange('lastWeek')}>7 days</div>
        <div className={cx(dateRange === 'last24' && 'active')} onClick={() => setDateRange('last24')}>24h</div>
      </div>
    </>
  )
}
