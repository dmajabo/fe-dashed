import React from "react";
import ReactHighcharts from "react-highcharts";

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

const ColumnChart = ({ option: customOption }) => {
  return (
    <ReactHighcharts
      config={Object.assign({}, options, customOption)}
      style={style}
      className="bar-chart"
    />
  );
};

export default ColumnChart;
