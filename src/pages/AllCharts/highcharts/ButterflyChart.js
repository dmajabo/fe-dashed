import React from "react";
import ReactHighcharts from "react-highcharts";
import Highcharts from "highcharts";

const config = {
  title: {
    text: "Butterfly Chart Example",
  },
  subtitle: {
    text: '<a href="http://stackoverflow.com">stackoverflow.com</a>',
  },
  chart: {
    type: "columnrange",
    inverted: true,
    marginTop: 100,
  },
  legend: {
    verticalAlign: "top",
    y: 60,
    x: -25,
    itemDistance: 50,
  },
  xAxis: {
    categories: ["G7", "A8", "V9", "V4", "V3", "V1", "V5"],
    crossing: 118,
    lineWidth: 0,
    tickLength: 0,
  },
  yAxis: {
    gridLineWidth: 0,
    tickInterval: 50,
    min: 0,
    max: 250,
    // lineWidth: 1,
    title: {
      text: null,
    },
  },
  plotOptions: {
    series: {
      grouping: false,
    },
  },
  series: [
    {
      name: "South",
      color: "blue",
      data: [
        [55, 100],
        [60, 100],
        [65, 100],
        [55, 100],
        [75, 100],
        [52, 100],
        [60, 100],
      ],
    },
    {
      name: "North",
      color: "orange",
      data: [
        [120, 170],
        [120, 150],
        [120, 175],
        [120, 130],
        [120, 125],
        [120, 148],
        [120, 145],
      ],
    },
  ],
  //   xAxis: {
  //     categories: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //   },
  //   series: [
  //     {
  //       data: [
  //         29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
  //         295.6, 454.4,
  //       ],
  //     },
  //   ],
};

var categories = [
  "0-4",
  "5-9",
  "10-14",
  "15-19",
  "20-24",
  "25-29",
  "30-34",
  "35-39",
  "40-44",
  "45-49",
  "50-54",
  "55-59",
  "60-64",
  "65-69",
  "70-74",
  "75-79",
  "80-84",
  "85-89",
  "90-94",
  "95-99",
  "100 + ",
];

export default function ButterflyChart() {
  return (
    <ReactHighcharts
      config={{
        chart: {
          type: "bar",
          inverted: true,
          backgroundColor: "transparent",
        },

        title: {
          text: "Historical Market Cap Snapshots",
          align: "left",
          style: { color: "white", fontWeight: "bold" },
        },
        subtitle: {
          text: "Aug 2021 - August 2022 (indexed by Billions i.e. 300B, 10b, .5b)",
          align: "left",
          style: { color: "white" },
        },
        xAxis: [
          {
            categories: categories,
            reversed: false,
            labels: {
              step: 1,
            },
          } /*{ // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }*/,
        ],
        yAxis: {
          gridLineColor: "transparent",
          title: {
            text: null,
          },
        },

        plotOptions: {
          series: {
            stacking: "normal",
          },
        },

        series: [
          {
            name: "Male",
            color: "#affea2",
            data: [
              -2.2, -2.2, -2.3, -2.5, -2.7, -3.1, -3.2, -3.0, -3.2, -4.3, -4.4,
              -3.6, -3.1, -2.4, -2.5, -2.3, -1.2, -0.6, -0.2, -0.0, -0.0,
            ],
          },
          {
            name: "Female",
            data: [
              2.1, 2.0, 2.2, 2.4, 2.6, 3.0, 3.1, 2.9, 3.1, 4.1, 4.3, 3.6, 3.4,
              2.6, 2.9, 2.9, 1.8, 1.2, 0.6, 0.1, 0.0,
            ],
          },
        ],
        credits: { enabled: false },
      }}
    />
  );
}
