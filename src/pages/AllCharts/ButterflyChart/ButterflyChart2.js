import React, { useEffect, useMemo, useState } from "react";
import ReactHighcharts from "react-highcharts";
import axios from "axios";
import cx from "classnames";
import { CardSubtitle } from "reactstrap";

import "./ButterflyChart2.css";

const bannedCoins = [
  "USDT",
  "USDC",
  "USDC",
  "BUSD",
  "WrappedBTC",
  "stETH",
  "DAI",
];

function getPriceChange(start, end) {
  const diff = end.close - start.open;
  return Math.round((diff / start.open) * 100);
}

function scaleValue(value) {
  if (value < -15) {
    // -30- ~ -15 => -1 ~ -0.75
    const diff = ((Math.max(value, -30) + 15) / 15) * 0.25;
    return 32 * (diff - 0.75);
  } else if (value < -5) {
    // -15 ~ -5 => -0.75 ~ -0.625
    const diff = ((value + 5) / 10) * 0.125;
    return 32 * (diff - 0.625);
  } else if (value < 5) {
    // -5 ~ 5 => -0.625 ~ 0.625
    const diff = (value / 5) * 0.625;
    return 32 * diff;
  } else if (value < 15) {
    // 5 ~ 15 => 0.625 ~ -0.75
    const diff = ((value - 5) / 10) * 0.125;
    return 32 * (diff + 0.625);
  } else {
    // 15 ~ 30+ => 0.75 ~ 1
    const diff = ((Math.min(value, 30) - 15) / 15) * 0.25;
    return 32 * (diff + 0.75);
  }
}

function scaleTick(value) {
  if (value <= 20) {
    return value / 4;
  } else if (value === 24) {
    return 15;
  } else if (value === 28) {
    return 20;
  } else {
    return 30;
  }
}

function getGreen(value) {
  if (value < 1) {
    return "#304E2B"
  } else if (value < 3) {
    return "#406839"
  } else if (value < 5) {
    return "#508348"
  } else if (value < 10) {
    return "#619F57"
  } else if (value < 20) {
    return "#73BC67"
  }else{
    return "#85DA77"
  }
}

function getRed(value){
  if (value < 1) {
    return "#591924"
  } else if (value < 3) {
    return "#812435"
  } else if (value < 5) {
    return "#AB3046"
  } else if (value < 10) {
    return "#D63C58"
  } else if (value < 20) {
    return "#FF4F6E"
  }else{
    return "#FF4F6E"
  }
}

export default function CryptoPricesByMarketCap() {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState("lastWeek");

  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD&api_key=d4f8f8f26facb0537c536e5647fb32976c05032cc0cccaf81abf3b33ee25fc5c"
      )
      .then(({ data }) => {
        const { Data } = data;
        const top50Coins = Data.filter(
          coin => !bannedCoins.includes(coin.CoinInfo.Name)
        );

        Promise.all(
          top50Coins.map(coin =>
            axios.get(
              `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin.CoinInfo.Name}&tsym=USD&limit=30&api_key=d4f8f8f26facb0537c536e5647fb32976c05032cc0cccaf81abf3b33ee25fc5c`
            )
          )
        )
          .then(responses => responses.map(res => res.data.Data.Data))
          .then(histories =>
            histories.map((history, index) => ({
              symbol: top50Coins[index].CoinInfo.Name,
              last24: getPriceChange(history[30], history[30]),
              lastWeek: getPriceChange(history[23], history[30]),
              lastMonth: getPriceChange(history[0], history[30]),
            }))
          )
          .then(data => {
            setData(data.sort((a, b) => a.lastWeek - b.lastWeek));
          });
      });
  }, []);

  const config = useMemo(() => {
    const sortedData = data.sort((a, b) => a[dateRange] - b[dateRange]);
    const max =
      sortedData.length > 0
        ? Math.max(
            sortedData[0][dateRange],
            sortedData[sortedData.length - 1][dateRange]
          ) + 15
        : 0;
    const min = -1 * max;

    return {
      chart: {
        type: "bar",
        backgroundColor: "transparent",
        style: {
          fontFamily: "sequel_sansbold_body",
        },
      },
      title: {
        visible: false,
        text: "",
      },
      tooltip: {
        // enabled: false,
        backgroundColor: "#333333",
        borderWidth: 0,
        borderRadius: 4,
        style: {
          color: "white",
        },
        split: true,
        formatter: function () {
          const coin = this.series.data[this.x].dataLabel.text.textStr.replace(
            '"',
            ""
          );

          return [
            `<b style="color:white">${coin}</br>`,
            `<b style="color:#AFAFB7">Change(${
              dateRange == "lastWeek" ? "7 days" : "24h"
            })</b>`,
            `<b style="color: ${this.y > 0 ? "#00C482" : "#FD2249"}">${
              Math.round(this.y * 100) / 100
            }%</b>`,
          ].join("<br/>");
        },
        positioner: function (width, height, point) {
          return {
            x: point.plotX,
            y: point.plotY,
          };
        },
      },
      legend: {
        visible: false,
        itemStyle: {
          color: "#AFAFB7",
          fontSize: "11px",
          transform: "translateY(-3px)",
          // fontFamily: 'var(--bs-body-font-family)',
        },
        itemHoverStyle: {
          color: "#ffffff",
        },
        symbolWidth: 16,
        symbolHeight: 16,
        symbolRadius: 4,
        verticalAlign: "top",
      },
      accessibility: {
        point: {
          valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
        },
      },
      xAxis: [
        {
          visible: false,
          reversed: false,
        },
        {
          // mirror axis on right side
          visible: false,
          opposite: true,
          reversed: false,
          linkedTo: 0,
        },
      ],
      yAxis: {
        title: {
          text: null,
        },
        max,
        min,
        offset: 10,
        gridLineColor: "#222222",
        labels: {
          formatter: function () {
            const color =
              this.value > 0
                ? "#00C482"
                : this.value < 0
                ? "#C41A39"
                : "#FFFFFF";
            return `<span style="color: ${color}">${
              Math.abs(this.value) + "%"
            }</span>`;
          },
        },
        tickAmount: 17,
      },
      plotOptions: {
        series: {
          dataLabels: {
            shape: "square",
            backgroundColor: "transparent",
            style: {
              fontSize: "9px",
              color: "#AFAFB7",
              textOutline: "none",
              textTransform: "uppercase",
            },
          },
          gapSize: 20,
        },
      },
      series: [
        {
          name: "Top 10 Negative",
          // data: [sortedData.slice(0, 10).filter((d) => d[dateRange] < 0)].reverse().map(info => ({
          data: sortedData
            .slice(0, 10)
            .reverse()
            .map(info => ({
              className: "translateY-2",
              y: info[dateRange] < 0 ? info[dateRange] + 0.2 : 0.1,
              dataLabels: {
                enabled: info[dateRange] < 0,
                format: info.symbol,
                // y: 0,
              },
              color:
                info[dateRange] < 0 ? getRed(Math.abs(info[dateRange])) : "transparent",
            })),
          borderWidth: 0,
          borderRadius: 3,
          color: "#FD2249",
          pointWidth: 18,
          grouping: false,
        },
        {
          name: "Top 10 Positive",
          data: sortedData.slice(-10).map(info => ({
            className: "translateY-2-",
            y: info[dateRange] > 0 ? info[dateRange] : 0.1,
            dataLabels: {
              enabled: info[dateRange] > 0,
              format: info.symbol,
              // y: 0,
            },
            color:
              info[dateRange] > 0 ? getGreen(info[dateRange]) : "transparent",
          })),
          borderWidth: 0,
          borderRadius: 3,
          color: "#00C482",
          pointWidth: 18,
          grouping: false,
          left: 10,
        },
      ],
      credits: { enabled: false },
    };
  }, [data, dateRange]);

  return (
    <>
      <CardSubtitle>Based on top 50 coins</CardSubtitle>
      <ReactHighcharts config={config} />
      <div className="btn-group">
        {/* <div className={cx(dateRange === 'lastMonth' && 'active')} onClick={() => setDateRange('lastMonth')}>30 days</div> */}
        <div
          className={cx(dateRange === "lastWeek" && "active")}
          onClick={() => setDateRange("lastWeek")}
        >
          7 days
        </div>
        <div
          className={cx(dateRange === "last24" && "active")}
          onClick={() => setDateRange("last24")}
        >
          24h
        </div>
      </div>
    </>
  );
}
