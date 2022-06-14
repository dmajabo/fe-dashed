import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

class Pie extends Component {
  getOption = () => {
    return {
      toolbox: {
        show: true,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: [
          "AAVE",
          "QUICK",
          "CRV",
          "MESH",
          "SUSHI",
          "UNI",
          "BIFI",
          "STG",
          "QI",
          "BAL",
        ],
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: ["#f46a6a", "#34c38f", "#50a5f1", "#f1b44c", "#556ee6"],
      series: [
        {
          name: "TVL",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 505560000.0, name: "AAVE" },
            { value: 415760000.0, name: "QUICK" },
            { value: 253630000.0, name: "CRV" },
            { value: 191610000.0, name: "MESH" },
            { value: 106250000.0, name: "SUSHI" },
            { value: 96810000.0, name: "UNI" },
            { value: 71650000.0, name: "BIFI" },
            { value: 71510000.0, name: "STG" },
            { value: 70440000.0, name: "QI" },
            { value: 62080000.0, name: "BAL" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };
  render() {
    return (
      <React.Fragment>
        <ReactEcharts style={{ height: "350px" }} option={this.getOption()} />
      </React.Fragment>
    );
  }
}
export default Pie;
