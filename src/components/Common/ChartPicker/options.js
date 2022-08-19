import * as d3 from "d3";

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
      return {
        grid: {
          bottom: 40,
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
            color: "rgba(255, 255, 255, .6)",
            fontFamily: "sequel_100_wide45",
          },
          nameGap: 30,
          data: data.map(({ market_cap }) => market_cap),
          axisLine: {
            lineStyle: {
              color: "#484848",
            },
          },
          axisTick: {
            // show: false,
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
          axisLabel: {
            formatter: function (value) {
              return d3.format(".2s")(value).replace("G", "B");
            },
            color: "rgba(255, 255, 255, .6)",
            fontSize: 14,
          },
        },
        yAxis: {
          name: "Percentage Change",
          nameTextStyle: {
            color: "rgba(255, 255, 255, .6)",
            fontFamily: "sequel_100_wide45",
            align: "left",
          },
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
            fontSize: 14,
          },
        },
        dataZoom: {
          type: "inside",
        },
        series: [...new Array(2).keys()].map(i => ({
          symbolSize: function (value) {
            return 1.1 * (Math.abs(value) * 5 + 40);
          },
          label: {
            show: true,
            formatter: function ({ value, name, dataIndex }) {
              if (i == 0) {
                return `${value > 0 ? "+" : ""}${
                  Math.round(value * 100) / 100
                }${value == 0 ? "" : "%"}`;
              } else {
                return data[dataIndex].name;
              }
            },
            fontWeight: "bold",
            color: i == 0 ? "black" : "white",
            position: i == 0 ? "inside" : "bottom",
            fontSize: 12,
          },
          data: data.map(({ market_cap_change_24h }) => market_cap_change_24h),
          type: "scatter",
          colorBy: "data",
          itemStyle: {
            color: ({ value }) => {
              return value > 0 ? "#00C482" : value < 0 ? "#FD2249" : "#919192";
            },
          },
        })),
      };
    default:
      return {};
  }
};
