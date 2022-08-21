import * as d3 from "d3";

export const getOption = (type = "bar", data = []) => {
  switch (type) {
    case "bar": // PolygonTransactions
      return {
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontWeight: "700",
              fontSize: 10,
              lineHeight: 17,
              color: "#5B6178",
              inside: true,
              rotate: 90,
            },
            data: data?.map(({ name }) => name),
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
            },
            axisLabel: {
              formatter: "{value}%",
              fontWeight: "700",
              fontSize: 12,
              lineHeight: 24,
              color: "rgba(255, 255, 255, 0.6)",
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.2)",
                type: [2, 2],
              },
            },
            splitNumber: 5,
          },
          {
            type: "value",
            axisLine: {
              show: false,
            },
            axisLabel: {
              fontWeight: "700",
              fontSize: 12,
              lineHeight: 24,
              color: "rgba(255, 255, 255, 0.6)",
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            splitNumber: 5,
          },
        ],
        series: [
          {
            name: "Market Cap",
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: data?.map(({ market_cap }) => market_cap),
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#36F097",
                },
                {
                  offset: 1,
                  color: "rgba(54, 240, 151, 0.2)",
                },
              ],
              global: false,
            },
          },
          {
            name: "Market Cap change 24h",
            type: "line",
            smooth: true,
            symbol: "none",
            data: data?.map(
              ({ market_cap_change_24h }) => market_cap_change_24h
            ),
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#B987FD",
                },
                {
                  offset: 1,
                  color: "#9548FC",
                },
              ],
              global: false,
            },
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
      const all_market_cap_change_24h = data.map(({ market_cap_change_24h }) =>
        Math.abs(market_cap_change_24h)
      );
      const maxChange24h = Math.max(...all_market_cap_change_24h);
      const minChange24h = Math.min(...all_market_cap_change_24h);
      return {
        grid: {
          left: 35,
          right: 12,
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
          data: data.map(({ market_cap }) => market_cap),
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
          axisLabel: {
            formatter: function (value) {
              return d3.format(".2s")(value).replace("G", "B");
            },
            color: "rgba(255, 255, 255, .6)",
            fontSize: 12,
          },
          boundaryGap: ["20%", "20%"],
        },
        yAxis: {
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
                return data[dataIndex].name;
              }
            },
            fontWeight: "bold",
            color: i == 0 ? "black" : "white",
            position: i == 0 ? "inside" : "bottom",
            fontSize: 10,
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
