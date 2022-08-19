import React from "react";
import ReactHighcharts from "react-highcharts";

const data = [
  {
    date: "01/21",
    wallets: 3545,
    transactions: 3203420,
  },
  {
    date: "02/21",
    wallets: 2341,
    transactions: 4203420,
  },
  {
    date: "03/21",
    wallets: 5678,
    transactions: 7205420,
  },
  {
    date: "04/21",
    wallets: 6429,
    transactions: 6203420,
  },
  {
    date: "05/21",
    wallets: 1234,
    transactions: 4203420,
  },
  {
    date: "06/21",
    wallets: 7890,
    transactions: 5203420,
  },
  {
    date: "07/21",
    wallets: 10000,
    transactions: 8203420,
  },
  {
    date: "08/21",
    wallets: 5698,
    transactions: 7203420,
  },
  {
    date: "09/21",
    wallets: 8901,
    transactions: 6903420,
  },
  {
    date: "10/21",
    wallets: 4210,
    transactions: 6203420,
  },
  {
    date: "11/21",
    wallets: 8901,
    transactions: 5000000,
  },
  {
    date: "12/21",
    wallets: 9654,
    transactions: 15045000,
  },
  {
    date: "01/22",
    wallets: 10021,
    transactions: 12045000,
  },
  {
    date: "02/22",
    wallets: 10918,
    transactions: 11045000,
  },
  {
    date: "03/22",
    wallets: 11000,
    transactions: 9045000,
  },
  {
    date: "04/22",
    wallets: 13000,
    transactions: 10045000,
  },
  {
    date: "05/22",
    wallets: 11800,
    transactions: 12045000,
  },
];

const style = {
  height: "100%",
  width: "100%",
};

let options = {
  chart: {
    type: "column",
    backgroundColor: "transparent",
  },
  containerProps: {
    style: {
      width: "100%",
      height: "100%",
      fontFamily: "'sequel_100_wide45', sans-serif",
    },
  },
  tooltip: {
    borderColor: "none",
    backgroundColor: "#484848",
    style: {
      color: "white",
      fontFamily: "'sequel_100_wide45', sans-serif",
    },
    formatter: function () {
      return (
        "<b>" +
        this.key +
        "<br/> Percentage Change: " +
        this.y.toFixed(2) +
        "%" +
        "</b><br/>" +
        "Market Cap: " +
        Intl.NumberFormat("en", { notation: "compact" }).format(
          this.point.market_cap
        )
      );
    },
  },
  legend: {
    enabled: false,
  },

  title: {
    text: null,
  },
  xAxis: {
    title: {
      text: "Sectors",
      offset: 60,
      style: {
        fontWeight: "bold",
        color: "white",
        fontFamily: "'sequel_100_wide45', sans-serif",
      },
    },
    labels: {
      style: {
        color: "white",
        fontFamily: "'sequel_100_wide45', sans-serif",
      },
    },
    lineWidth: 0,
    tickWidth: 0,
    categories: data.map(x => x.date),
  },
  yAxis: {
    title: {
      text: "Percentage Change",
      offset: 80,
      style: {
        fontWeight: "bold",
        color: "white",
        fontFamily: "'sequel_100_wide45', sans-serif",
      },
    },
    gridLineColor: "#2a2a2a",
    labels: {
      style: {
        color: "white",
        fontFamily: "'sequel_100_wide45', sans-serif",
      },
      formatter: function () {
        return `${this.value}%`;
      },
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: "normal",
    },
    column: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  series: [
    {
      data: data.map(({ transactions, date }) => ({
        y: transactions,
        name: date,
        color: "#00C482",
      })),
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 755,
        },
        chartOptions: {
          xAxis: {
            title: {
              offset: 160,
            },
          },
        },
      },
      {
        condition: {
          maxHeight: 300,
        },
        chartOptions: {
          xAxis: {
            title: {
              offset: 90,
            },
          },
        },
      },
    ],
  },
};

const PolygonTransactions = ({ option: customOption }) => {
  return (
    <ReactHighcharts
      config={Object.assign({}, options, customOption)}
      style={style}
      className="bar-chart"
    />
  );
};

export default PolygonTransactions;
