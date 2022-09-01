import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import _ from "lodash";
import Loader from "components/Loader";
import { supabase } from "supabaseClient";

const MAX_COUNTS = 5;
const COLORS = ["#36F097", "#3DFFDC", "#1ED6FF", "#268AFF", "#5A3FFF"];
const PROTOCAL_URL = "protocols";
const CHAIN_URL = "chains";

// categories
//   - Polygon
//   - Avalanche
//   - Solana

// currency formatter.
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const style = {
  height: "100%",
  width: "100%",
};

const _options = {
  toolbox: {
    show: true,
    feature: {},
  },
  textStyle: {
    fontFamily: "sequel_sansbold_body",
  },
  title: {
    text: "",
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
                fontSize: 14,
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
                color: "#919192",
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
              totaltvl: {
                color: "#919192",
                fontSize: 17,
              },
              totalAmount: {
                fontSize: 17,
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
              totaltvl: {
                color: "#919192",
                fontSize: 17,
              },
              totalAmount: {
                fontSize: 17,
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
            fontSize: 15,
            lineHeight: 19,
            rich: {
              totaltvl: {
                color: "#919192",
              },
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
            fontSize: 15,
            lineHeight: 19,
            rich: {
              name: {
                width: 100,
                fontSize: 15,
                lineHeight: 19,
              },
              percent: {
                padding: [0, 15, 0, 15],
                fontSize: 15,
                lineHeight: 19,
                width: 30,
                color: "#919192",
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
            fontSize: 13,
            lineHeight: 16,
            rich: {
              totalAmount: {
                fontSize: 28,
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
            fontSize: 13,
            lineHeight: 16,
            rich: {
              totaltvl: {
                color: "#919192",
              },
              name: {
                width: 100,
                fontSize: 13,
                lineHeight: 16,
              },
              percent: {
                padding: [0, 15, 0, 15],
                fontSize: 13,
                lineHeight: 16,
                width: 30,
                color: "#919192",
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

const PolygonFarms = ({ category }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getChartData = () => {
    Promise.all([getApiData(PROTOCAL_URL), getApiData(CHAIN_URL)])
      .then(res => {
        if (res[0].status !== 200 || res[1].status !== 200) {
          throw new Error("api call failed.");
        }

        const protocols = res[0].data;

        const filteredData = [];
        const groupData = {};
        _.map(
          _.filter(
            protocols,
            v =>
              _.some(v.chains, x => x === category) &&
              v.category !== "Chain" &&
              v.category !== "Bridge"
          ),
          v => {
            if (v.parentProtocol) {
              if (groupData[v.parentProtocol]) {
                groupData[v.parentProtocol].push(v);
              } else {
                groupData[v.parentProtocol] = [v];
              }
            } else {
              filteredData.push({
                ...v,
                value: v.chainTvls[category] || 0,
              });
            }
          }
        );

        Object.keys(groupData).forEach(key => {
          filteredData.push({
            symbol:
              groupData[key].length === 1 ? groupData[key][0].symbol : key,
            data: groupData[key],
            value: _.sumBy(groupData[key], x => x.chainTvls[category] || 0),
          });
        });

        const chains = res[1].data;
        const totalTvl = _.find(chains, v => v.name === category)?.tvl || 0;
        const subTvl = _.sumBy(filteredData, v => {
          if (!v.data) {
            return v.category === "Liquid Staking" ||
              v.category === "Yield" ||
              v.category === "Yield Aggregator"
              ? v.value
              : 0;
          } else {
            return _.sumBy(v.data, x =>
              x.category === "Liquid Staking" ||
              x.category === "Yield" ||
              x.category === "Yield Aggregator"
                ? x.chainTvls[category]
                : 0
            );
          }
        });

        setChartData({
          data: _.sortBy(filteredData, v => v.value).reverse(),
          totalTVL: totalTvl || _.sumBy(filteredData, v => v.value),
          subTvl: subTvl || 0,
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChartData();

    const interval = setInterval(() => {
      getChartData();
    }, 3 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getFormatValue = amount => {
    let value = amount / 1000000000;
    const suffixes = ["B", "M", "K"];
    let formartValue = { value: amount, suffix: "" };

    for (let i = 0; i < 3; i++) {
      if (value > 0.99) {
        formartValue = { value, suffix: suffixes[i] };
        break;
      }
      value = value * 1000;
    }

    return formartValue;
  };

  const getOptions = () => {
    const newOptions = _.cloneDeep(_options);

    const data = chartData.data
      .map((x, index) => {
        return {
          value: x.value,
          name: x.symbol !== "-" && x.symbol ? x.symbol : x.name,
          itemStyle: {
            normal: {
              color: COLORS[index % COLORS.length],
            },
          },
        };
      })
      .slice(0, MAX_COUNTS);
    const totalTVL = chartData.totalTVL - chartData.subTvl;
    const sumTvl = _.sumBy(data, "value");
    const dataNames = data.map(i => i.name);

    newOptions.title.text = [
      `{totaltvl|Total TVL}`,
      `{totalAmount|${currencyFormatter.format(
        getFormatValue(totalTVL).value
      )}${getFormatValue(totalTVL).suffix}}`,
    ].join("\n");

    newOptions.legend.data = dataNames;
    newOptions.legend.formatter = name => {
      const index = data.findIndex(x => x.name === name);
      if (index > -1) {
        const formartValue = getFormatValue(data[index].value);
        return [
          `{name|${name}} {percent|${(
            (data[index].value * 100) /
            sumTvl
          ).toFixed(0)}%} ${currencyFormatter.format(formartValue.value)}${
            formartValue.suffix
          }`,
        ].join("\n");
      }
      return name;
    };

    newOptions.series[0].data = data;

    return newOptions;
  };

  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );

  return (
    <ReactEcharts
      lazyUpdate={true}
      option={getOptions()}
      style={style}
      className="pie-chart"
    />
  );
};

const getApiData = url =>
  supabase.functions.invoke(url, {
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
  });

export default PolygonFarms;
