import * as d3 from "d3";

const getColor = value => {
  if (value > 5) {
    return "#304E2B";
  } else if (value <= 5 && value > 4) {
    return "#406839";
  } else if (value <= 4 && value > 3) {
    return "#508348";
  } else if (value <= 3 && value > 2) {
    return "#619F57";
  } else if (value <= 2 && value > 1) {
    return "#73BC67";
  } else if (value <= 1 && value > 0) {
    return "#85DA77";
  } else if (value == 0) {
    return "#8BAED8";
  } else if (value < 0 && value >= -1) {
    return "#FF4F6E";
  } else if (value < -1 && value >= -2) {
    return "#D63C58";
  } else if (value < -2 && value >= -3) {
    return "#AB3046";
  } else if (value < -3 && value >= -4) {
    return "#812435";
  } else if (value < -4 && value >= -5) {
    return "#591924";
  } else {
    return "#591924";
  }
};

const formatBubbleChartLabel = label => {
  switch (label) {
    case "Decentralized Exchange (DEX)":
      return "DEX";

    case "Near Protocol Ecosystem":
      return "NEAR\n Ecosystem";

    case "Polygon Ecosystem":
      return "Polygon\n Ecosystem";

    default:
      return label;
  }
};

export const getOption = (type = "bar", data = []) => {
  switch (type) {
    case "bar": // PolygonTransactions
      return {
        xAxis: {
          title: {
            text: null,
          },
          labels: {
            style: {
              color: "white",
              fontFamily: "'sequel_100_wide45', sans-serif",
            },
          },
          lineWidth: 0,
          tickWidth: 0,
          categories: data?.map(({ name }) => name),
        },
        series: [
          {
            type: "column",
            data: data.map(({ name, market_cap, market_cap_change_24h }) => ({
              y: market_cap_change_24h,
              name,
              market_cap,
              color: market_cap_change_24h > 0 ? "#00C482" : "#FD2249",
            })),
          },
        ],
      };
    case "scatter": // Scatter
      return {
        tooltip: {
          trigger: "axis",
          valueFormatter: value => `${Math.round(value * 100) / 100}%`,
        },
        xAxis: {
          data: data?.map(({ name }) => name),
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            inside: true,
            rotate: 90,
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#75779A",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: function (value, index) {
              return value >= 0 ? "#00C482" : value < 0 ? "#FD2249" : "white";
            },
          },
        },
        dataZoom: null,
        series: [
          {
            data: data?.map(
              ({ market_cap_change_24h }) => market_cap_change_24h
            ),
            type: "scatter",
            colorBy: "data",
            itemStyle: {
              color: ({ value }) => {
                return value > 0
                  ? "#00C482"
                  : value < 0
                  ? "#FD2249"
                  : "#919192";
              },
            },
          },
        ],
      };
    case "bubble": // Scatter
      const dataToUse = data.filter(({ name }) => name !== "DeFi Index");

      const all_market_cap_change_24h = dataToUse.map(
        ({ market_cap_change_24h }) => Math.abs(market_cap_change_24h)
      );
      const maxChange24h = Math.max(...all_market_cap_change_24h);
      const minChange24h = Math.min(...all_market_cap_change_24h);
      return {
        grid: {
          left: 55,
          right: 12,
          bottom: 50,
        },
        legend: {
          show: true,
          align: "left",
        },
        tooltip: {
          show: false,
        },
        xAxis: {
          name: "Market Capitalization",
          nameLocation: "middle",
          nameTextStyle: {
            color: "white",
            fontWeight: "bold",
            padding: [20, 0, 0, 0],
          },
          data: dataToUse.map(({ market_cap }) => market_cap),
          axisLine: {
            lineStyle: {
              color: "#484848",
            },
          },
          axisTick: {
            lineStyle: {
              color: "#484848",
            },
          },
          showGrid: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#484848",
            },
          },
          interval: 5000000000,
          min: 5000000000,
          axisLabel: {
            formatter: function (value) {
              return d3.format(".0s")(value).replace("G", "B");
            },
            color: "rgba(255, 255, 255, .6)",
            fontSize: 12,
          },
          boundaryGap: ["20%", "20%"],
          interval: 10,
        },
        yAxis: {
          name: "Percentage Change",
          nameLocation: "middle",
          nameTextStyle: {
            color: "white",
            fontWeight: "bold",
            padding: [0, 0, 25, 0],
          },
          interval: 3,
          minInterval: 3,
          maxInterva: 3,
          axisLine: {
            lineStyle: {
              color: "#484848",
            },
          },
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#484848",
            },
          },
          axisLabel: {
            formatter: "{value}%",
            color: function (value, index) {
              return value >= 0 ? "#00C482" : value < 0 ? "#FD2249" : "white";
            },
            fontSize: 12,
          },
          boundaryGap: ["30%", "30%"],
        },
        dataZoom: {
          type: "inside",
        },
        series: [...new Array(2).keys()].map(i => ({
          symbolSize: function (value) {
            return (
              40 +
              (Math.abs(value) / (maxChange24h + Math.abs(minChange24h))) * 10
            );
          },
          label: {
            show: true,
            formatter: function ({ value, name, dataIndex }) {
              if (i == 0) {
                return `${value > 0 ? "+" : ""}${
                  Math.round(value * 100) / 100
                }${value == 0 ? "" : "%"}`;
              } else {
                return formatBubbleChartLabel(dataToUse[dataIndex].name);
              }
            },
            fontWeight: "bold",
            color: i == 0 ? "black" : "white",
            position: i == 0 ? "inside" : "bottom",
            fontSize: 10,
          },
          data: dataToUse.map(
            ({ market_cap_change_24h }) => market_cap_change_24h
          ),
          type: "scatter",
          colorBy: "data",
          itemStyle: {
            color: ({ value }) => {
              return value > 0 ? "#00C482" : value < 0 ? "#FD2249" : "#919192";
            },
          },
        })),
      };
    case "packed-bubble":
      return {
        title: {
          visible: false,
          text: "",
        },
        tooltip: {
          pointFormat: "${point.price:.2f}",
        },
        legend: {
          itemStyle: {
            color: "white",
          },
        },
        plotOptions: {
          enableMouseTracking: false,
          packedbubble: {
            minSize: "50%",
            maxSize: "100%",
            zMin: Math.min(
              ...data.map(({ market_cap_change_24h }) =>
                Math.abs(market_cap_change_24h)
              )
            ),
            zMax: Math.max(
              ...data.map(({ market_cap_change_24h }) =>
                Math.abs(market_cap_change_24h)
              )
            ),
            layoutAlgorithm: {
              splitSeries: false,
              gravitationalConstant: 0.02,
            },
            dataLabels: {
              enabled: true,
              format: "{point.change:.2f}% <br/> {point.name}",
              style: {
                color: "white",
                textOutline: "none",
                fontWeight: "600",
                fontSize: 10,
              },
            },
            marker: {
              fillOpacity: 1,
            },
          },
        },
        series: data.map(
          ({ name, market_cap_change_24h: value, current_price: price }) => ({
            name,
            color: getColor(value),
            data: [
              {
                name,
                value: Math.abs(value),
                change: value,
                price,
              },
            ],
            states: {
              inactive: {
                opacity: 0.9,
              },
            },
          })
        ),
        credits: { enabled: false },
      };
    default:
      return {};
  }
};
