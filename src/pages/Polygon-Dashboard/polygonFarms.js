import React from "react";
import ReactEcharts from "echarts-for-react";

const chartData = require("./polygonFarmsTVLData");
const MAX_COUNTS = 5;
const COLORS = ["#36F097", "#3DFFDC", "#1ED6FF", "#268AFF", "#5A3FFF"];

const data = chartData.data
  .map((x, index) => {
    return {
      value: x.tvl,
      name: x.symbol,
      itemStyle: {
        normal: {
          color: COLORS[index % COLORS.length],
        },
      },
    };
  })
  .slice(0, MAX_COUNTS);

const totalAmount = chartData.totalTVL;

// currency formatter.
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const dataNames = data.map(i => i.name);

const style = {
  height: "100%",
  width: "100%",
};

const options = {
  toolbox: {
    show: true,
    feature: {},
  },
  title: {
    text: [
      "Total TVL",
      `{totalAmount|${currencyFormatter.format(totalAmount)}B}`,
    ].join("\n"),
    textStyle: {
      color: "#75779A",
      fontWeight: "400",
      rich: {
        totalAmount: {
          fontWeight: "700",
          color: "#FFFFFF",
        },
      },
    },
  },
  calculable: true,
  legend: {
    type: "scroll",
    orient: "vertical",
    icon: "circle",
    data: dataNames,
    formatter: name => {
      const index = data.findIndex(x => x.name === name);
      if (index > -1) {
        return [
          `{name|${name}} {percent|${(
            data[index].value /
            (totalAmount * 10)
          ).toFixed(0)}%} ${currencyFormatter.format(data[index].value)}M`,
        ].join("\n");
      }
      return name;
    },
    textStyle: {
      color: "#fff",
      fontWeight: "400",
      rich: {
        percent: {
          color: "#75779A",
        },
      },
    },
  },
  series: [
    {
      name: "Top 25 Polygon Farms by TVL",
      type: "pie",
      animationDuration: 2000,
      animationEasing: "quarticInOut",
      avoidLabelOverlap: false,
      startAngle: 90,
      hoverOffset: 5,
      roseType: false,
      selectedMode: "multiple",
      clockwise: true,
      itemStyle: {
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        shadowColor: "rgba(0, 0, 0, 0.4)",
      },
      select: {
        itemStyle: {
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.4)",
        },
      },
      label: {
        normal: {
          show: true,
          formatter: "{b}",
          edgeDistance: "1%",
          color: "rgba(255, 255, 255, 0.6)",
          fontWeight: "400",
        },
      },
      labelLine: {
        normal: {
          show: true,
          smooth: false,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.6)",
          },
        },
      },
      data: data,
    },
  ],
  media: [
    {
      query: {
        maxHeight: 450,
      },
      option: {
        title: {
          left: "20%",
          top: "48%",
        },
        legend: {
          left: "20%",
          top: "60%",
        },
        series: [
          {
            radius: "30%",
            center: ["50%", "30%"],
          },
        ],
      },
    },
    {
      query: {
        maxHeight: 250,
      },
      option: {
        title: {
          left: "20%",
          top: "38%",
          textStyle: {
            fontSize: 8,
            lineHeight: 12,
            rich: {
              totalAmount: {
                fontSize: 15,
                lineHeight: 25,
              },
            },
          },
        },
        legend: {
          left: "20%",
          top: "60%",
          itemGap: 2,
          itemWidth: 5,
          itemHeight: 5,
          textStyle: {
            fontSize: 8,
            lineHeight: 12,
            rich: {
              name: {
                width: 30,
                fontSize: 10,
                lineHeight: 12,
              },
              percent: {
                padding: [0, 5, 0, 5],
                fontSize: 8,
                lineHeight: 12,
                width: 20,
              },
            },
          },
        },
        series: [
          {
            radius: "30%",
            center: ["50%", "20%"],
            label: {
              normal: {
                fontSize: 8,
                lineHeight: 10,
              },
            },
            labelLine: {
              normal: {
                length: 2,
                length2: 2,
              },
            },
          },
        ],
      },
    },
    {
      query: {
        minWidth: 240,
        maxHeight: 100,
      },
      option: {
        title: {
          left: "50%",
          top: "5%",
          textStyle: {
            fontSize: 8,
            lineHeight: 10,
            rich: {
              totalAmount: {
                fontSize: 12,
                lineHeight: 18,
              },
            },
          },
        },
        legend: {
          left: "50%",
          top: "40%",
          itemGap: 3,
          itemWidth: 5,
          itemHeight: 5,
          textStyle: {
            fontSize: 6,
            lineHeight: 8,
            rich: {
              name: {
                width: 20,
                fontSize: 6,
                lineHeight: 8,
              },
              percent: {
                padding: [0, 5, 0, 5],
                fontSize: 6,
                lineHeight: 8,
                width: 15,
              },
            },
          },
        },
        series: [
          {
            radius: "40%",
            center: ["25%", "50%"],
            label: {
              normal: {
                fontSize: 6,
                lineHeight: 8,
              },
            },
            labelLine: {
              normal: {
                length: 2,
                length2: 2,
              },
            },
          },
        ],
      },
    },
    {
      query: {
        minWidth: 350,
      },
      option: {
        title: {
          left: "58%",
          top: "35%",
          textStyle: {
            fontSize: 10,
            lineHeight: 14,
            rich: {
              totalAmount: {
                fontSize: 18,
                lineHeight: 30,
              },
            },
          },
        },
        legend: {
          left: "58%",
          top: "45%",
          itemGap: 5,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            lineHeight: 14,
            rich: {
              name: {
                width: 30,
                fontSize: 10,
                lineHeight: 12,
              },
              percent: {
                padding: [0, 5, 0, 5],
                fontSize: 10,
                lineHeight: 14,
                width: 20,
              },
            },
          },
        },
        series: [
          {
            radius: "30%",
            center: ["30%", "50%"],
            label: {
              normal: {
                fontSize: 10,
                lineHeight: 12,
              },
            },
            labelLine: {
              normal: {
                length: 3,
                length2: 2,
              },
            },
          },
        ],
      },
    },
    {
      query: {
        minWidth: 350,
        maxHeight: 400,
      },
      option: {
        title: {
          left: "58%",
          top: "20%",
        },
        legend: {
          left: "58%",
          top: "42%",
          itemGap: 3,
          itemWidth: 8,
          itemHeight: 8,
        },
      },
    },
    {
      query: {
        minWidth: 350,
        maxHeight: 200,
      },
      option: {
        title: {
          left: "35%",
          top: "25%",
          textStyle: {
            fontSize: 10,
            lineHeight: 12,
            rich: {
              totalAmount: {
                fontSize: 18,
                lineHeight: 25,
              },
            },
          },
        },
        legend: {
          left: "58%",
          top: "25%",
          itemGap: 3,
          itemWidth: 8,
          itemHeight: 8,
        },
        series: [
          {
            radius: "30%",
            center: ["20%", "50%"],
            label: {
              normal: {
                fontSize: 8,
                lineHeight: 10,
              },
            },
            labelLine: {
              normal: {
                length: 3,
                length2: 2,
              },
            },
          },
        ],
      },
    },
    {
      query: {
        minWidth: 550,
      },
      option: {
        title: {
          left: "58%",
          top: "35%",
          textStyle: {
            fontSize: 16,
            lineHeight: 19,
            rich: {
              totalAmount: {
                fontSize: 35,
                lineHeight: 55,
              },
            },
          },
        },
        legend: {
          left: "58%",
          top: "45%",
          itemGap: 10,
          itemWidth: 25,
          itemHeight: 15,
          textStyle: {
            fontSize: 16,
            lineHeight: 19,
            rich: {
              name: {
                width: 35,
                fontSize: 16,
                lineHeight: 19,
              },
              percent: {
                padding: [0, 15, 0, 15],
                fontSize: 16,
                lineHeight: 19,
                width: 30,
              },
            },
          },
        },
        series: [
          {
            radius: "40%",
            center: ["30%", "50%"],
            label: {
              normal: {
                fontSize: 12,
                lineHeight: 15,
              },
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 5,
              },
            },
          },
        ],
      },
    },
    {
      query: {
        minWidth: 550,
        maxHeight: 600,
      },
      option: {
        title: {
          left: "58%",
          top: "23%",
        },
        legend: {
          left: "58%",
          top: "42%",
        },
      },
    },
    {
      query: {
        minWidth: 550,
        maxHeight: 300,
      },
      option: {
        title: {
          left: "40%",
          top: "20%",
          textStyle: {
            fontSize: 14,
            lineHeight: 16,
            rich: {
              totalAmount: {
                fontSize: 30,
                lineHeight: 40,
              },
            },
          },
        },
        legend: {
          left: "60%",
          top: "20%",
          itemGap: 8,
          itemWidth: 20,
          itemHeight: 13,
          textStyle: {
            fontSize: 14,
            lineHeight: 16,
            rich: {
              name: {
                width: 35,
                fontSize: 14,
                lineHeight: 16,
              },
              percent: {
                padding: [0, 15, 0, 15],
                fontSize: 14,
                lineHeight: 16,
                width: 30,
              },
            },
          },
        },
        series: [
          {
            radius: "40%",
            center: ["20%", "50%"],
            label: {
              normal: {
                fontSize: 10,
                lineHeight: 13,
              },
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 5,
              },
            },
          },
        ],
      },
    },
  ],
};

const PolygonFarms = () => {
  return <ReactEcharts option={options} style={style} className="pie-chart" />;
};

export default PolygonFarms;
