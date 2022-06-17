import React from "react";
import ReactEcharts from "echarts-for-react";

const data = [
  {
    value: 2512,
    name: "Farm 1",
    itemStyle: {
      normal: {
        color: "#5A3FFF",
      },
    },
  },
  {
    value: 5025,
    name: "Farm 2",
    itemStyle: {
      normal: {
        color: "#268AFF",
      },
    },
  },
  {
    value: 10050,
    name: "Farm 3",
    itemStyle: {
      normal: {
        color: "#1ED6FF",
      },
    },
  },
  {
    value: 12562,
    name: "Farm 4",
    itemStyle: {
      normal: {
        color: "#3DFFDC",
      },
    },
  },
  {
    value: 20100,
    name: "Farm 5",
    itemStyle: {
      normal: {
        color: "#36F097",
      },
    },
  },
];

const totalAmount = data.reduce((partialSum, x) => partialSum + x.value, 0);
// currency formatter.
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const dataNames = data.map(i => i.name);

const style = {
  height: "500px",
  width: "100%",
};

let option = {
  backgroundColor: "#111217",
  toolbox: {
    show: true,
    feature: {},
  },
  title: {
    text: [
      "Total TVL",
      `{totalAmount|${currencyFormatter.format(totalAmount)}}`,
    ].join("\n"),
    left: "60%",
    top: "25%",
    textStyle: {
      color: "#75779A",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 19,
      rich: {
        totalAmount: {
          fontWeight: "700",
          fontSize: 35,
          lineHeight: 42,
          color: "#FFFFFF",
          marginTop: 6,
        },
      },
    },
  },
  calculable: true,
  legend: {
    type: "scroll",
    orient: "vertical",
    icon: "circle",
    x: "60%",
    y: "42%",
    data: dataNames,
    formatter: name => {
      const index = data.findIndex(x => x.name === name);
      if (index > -1) {
        return [
          `Farm {percent|${((data[index].value * 100) / totalAmount).toFixed(
            0
          )}%} ${currencyFormatter.format(data[index].value)}`,
        ].join("\n");
      }
      return name;
    },
    textStyle: {
      color: "#fff",
      marginBottom: 20,
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 19,
      rich: {
        percent: {
          padding: [0, 15, 0, 15],
          color: "#75779A",
          fontSize: 16,
          lineHeight: 19,
          width: 30,
        },
      },
    },
  },
  series: [
    {
      name: "Polygon Farms by TVL",
      type: "pie",
      animationDuration: 2000,
      animationEasing: "quarticInOut",
      radius: ["0%", "50%"],
      avoidLabelOverlap: false,
      startAngle: 90,
      hoverOffset: 5,
      center: ["30%", "50%"],
      roseType: "radius",
      selectedMode: "multiple",
      clockwise: false,
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
      emphasis: {
        show: true,
      },
      label: {
        normal: {
          show: true,
          formatter: "{b}", // {c} data: [{value:},]
          edgeDistance: "1%",
          color: "rgba(255, 255, 255, 0.6)",
          fontWeight: "400",
          fontSize: 12,
          lineHeight: 15,
        },
        emphasis: {
          show: true,
        },
      },
      labelLine: {
        normal: {
          show: true,
          smooth: false,
          length: 5,
          length2: 5,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.6)",
          },
        },
        emphasis: {
          show: true,
        },
      },
      data: data,
    },
  ],
};

const PolygonFarms = () => {
  return <ReactEcharts option={option} style={style} className="pie-chart" />;
};

export default PolygonFarms;
