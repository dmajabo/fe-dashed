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

const getOptions = dimensions => {
  const smallScreen = dimensions.width < 680;

  return {
    backgroundColor: "#141823",
    toolbox: {
      show: true,
      feature: {},
    },
    title: {
      text: [
        "Total TVL",
        `{totalAmount|${currencyFormatter.format(totalAmount)}B}`,
      ].join("\n"),
      left: smallScreen ? "15%" : "58%",
      top: smallScreen ? "50%" : "23%",
      textStyle: {
        color: "#75779A",
        fontWeight: "400",
        fontSize: smallScreen ? 14 : 16,
        lineHeight: smallScreen ? 16 : 19,
        rich: {
          totalAmount: {
            fontWeight: "700",
            fontSize: smallScreen ? 28 : 35,
            lineHeight: smallScreen ? 40 : 55,
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
      x: smallScreen ? "15%" : "58%",
      y: smallScreen ? "63%" : "42%",
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
        marginBottom: smallScreen ? 10 : 20,
        fontWeight: "400",
        fontSize: smallScreen ? 14 : 16,
        lineHeight: smallScreen ? 16 : 19,
        rich: {
          name: {
            width: 35,
          },
          percent: {
            padding: smallScreen ? [0, 10, 0, 10] : [0, 15, 0, 15],
            color: "#75779A",
            fontSize: smallScreen ? 14 : 16,
            lineHeight: smallScreen ? 16 : 19,
            width: 30,
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
        radius: ["0%", "40%"],
        avoidLabelOverlap: false,
        startAngle: 90,
        hoverOffset: 5,
        center: smallScreen ? ["50%", "25%"] : ["30%", "50%"],
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
        emphasis: {
          show: true,
        },
        label: {
          normal: {
            show: true,
            formatter: "{b}",
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
};

let option = {
  backgroundColor: "#141823",
  toolbox: {
    show: true,
    feature: {},
  },
  title: {
    text: [
      "Total TVL",
      `{totalAmount|${currencyFormatter.format(totalAmount)}B}`,
    ].join("\n"),
    left: "58%",
    top: "23%",
    textStyle: {
      color: "#75779A",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 19,
      rich: {
        totalAmount: {
          fontWeight: "700",
          fontSize: 35,
          lineHeight: 55,
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
    x: "58%",
    y: "42%",
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
      marginBottom: 20,
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 19,
      rich: {
        name: {
          width: 35,
        },
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
      name: "Top 25 Polygon Farms by TVL",
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
      emphasis: {
        show: true,
      },
      label: {
        normal: {
          show: true,
          formatter: "{b}",
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
  const divRef = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({ width: 1, height: 2 });

  const handleResize = () => {
    if (divRef.current) {
      const { current } = divRef;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [divRef]);

  return (
    <div ref={divRef} style={{ width: "100%", height: "100%" }}>
      <ReactEcharts
        option={getOptions(dimensions)}
        style={style}
        className="pie-chart"
      />
    </div>
  );
};

export default PolygonFarms;
