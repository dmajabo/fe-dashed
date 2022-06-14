import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class chartapex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [1, -2, -5, 1, 2, 3, 4, 5],
        },
      ],
      options: {
        chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
        colors: [
          function (value) {
            console.log(value)
            if (value < 0) {
              return "#F25181";
            } else {
              return "#30E88F";
            }
          },
        ],
        dataLabels: { enabled: false },
        stroke: { width: [0, 0], curve: "straight" },
        title: { text: "Average Funding Rates Over Time", align: "left" },
        grid: {
          row: { colors: ["transparent", "transparent"], opacity: 0.2 },
        },
        markers: { size: 5 },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          title: { text: "Date" },
        },
        yaxis: { title: { text: "Funding Rates" }, min: -100, max: 50 },
        legend: {
          show: false,
          position: "top",
          horizontalAlign: "right",
          floating: !0,
          offsetY: -25,
          offsetX: -5,
        },
        responsive: [
          {
            breakpoint: 600,
            options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
          },
        ],
      },
    };
  }
  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="380"
          className="apex-charts"
        />
      </React.Fragment>
    );
  }
}

export default chartapex;
