import React from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

var allData = {
  1: {
    MATIC: 144.65,
    BTC: 113.99,
    ETH: 189.04,
    SOL: 97.19,
    FTM: 562.24,
    DOGE: 1268.06,
    AVAX: 288.35,
    ATOM: 69.54,
    AXS: 305.61,
    BNB: 56.12,
    XRP: 95.23,
    LINK: 77.6,
    DOT: 268.77,
    ONE: 73.8,
    MANA: 78.78,
    SAND: 118.76,
    UNI: 518.76,
  },

  2: {
    MATIC: 1388.74,
    BTC: 192.13,
    ETH: 212.74,
    SOL: 507.11,
    FTM: 2088.51,
    DOGE: 1683.14,
    AVAX: 591.08,
    ATOM: 267.36,
    AXS: 598.73,
    BNB: 640.75,
    XRP: 63.97,
    LINK: 94.49,
    DOT: 674.04,
    ONE: 378.76,
    MANA: 173.39,
    SAND: 480.13,
    UNI: 675.84,
  },
  3: {
    MATIC: 2201.43,
    BTC: 276.08,
    ETH: 356.79,
    SOL: 1001.09,
    FTM: 2008.96,
    DOGE: 2023.25,
    AVAX: 740.12,
    ATOM: 347.89,
    AXS: 2859.15,
    BNB: 1127.8,
    XRP: 150.16,
    LINK: 141.83,
    DOT: 913.11,
    ONE: 3060.66,
    MANA: 1057.4,
    SAND: 1789.96,
    UNI: 978.97,
  },
  4: {
    MATIC: 5143.75,
    BTC: 265.73,
    ETH: 549.26,
    SOL: 2073.7,
    FTM: 3798.8,
    DOGE: 13741.44,
    AVAX: 801.56,
    ATOM: 380.41,
    AXS: 4594.56,
    BNB: 2088.88,
    XRP: 515.15,
    LINK: 210.59,
    DOT: 737.81,
    ONE: 2696.18,
    MANA: 1524.1,
    SAND: 1430.18,
    UNI: 1387,
  },
  5: {
    MATIC: 9989.22,
    BTC: 131.29,
    ETH: 496.58,
    SOL: 1854.68,
    FTM: 1663.33,
    DOGE: 13634.94,
    AVAX: 400.51,
    ATOM: 214.56,
    AXS: 2098.73,
    BNB: 1285.26,
    XRP: 273.06,
    LINK: 116.49,
    DOT: 452.94,
    ONE: 1816.17,
    MANA: 846.45,
    SAND: 754.56,
    UNI: 802.25,
  },
  6: {
    MATIC: 7217.79,
    BTC: 127.93,
    ETH: 410.85,
    SOL: 1487.72,
    FTM: 1151.86,
    DOGE: 9008.21,
    AVAX: 255.66,
    ATOM: 155.93,
    AXS: 4309.68,
    BNB: 982.16,
    XRP: 174.12,
    LINK: 51.32,
    DOT: 265.22,
    ONE: 1229.48,
    MANA: 569.25,
    SAND: 626.44,
    UNI: 624.32,
  },
  7: {
    MATIC: 6597.06,
    BTC: 157.55,
    ETH: 462.39,
    SOL: 1483.13,
    FTM: 1170.32,
    DOGE: 7451.83,
    AVAX: 270.26,
    ATOM: 156.18,
    AXS: 18888.48,
    BNB: 1070.59,
    XRP: 185.37,
    LINK: 73.53,
    DOT: 321.22,
    ONE: 1416.44,
    MANA: 689.73,
    SAND: 1445.75,
    UNI: 666.85,
  },
  8: {
    MATIC: 10622.16,
    BTC: 234.58,
    ETH: 769.5,
    SOL: 6479.34,
    FTM: 6184.49,
    DOGE: 11528.43,
    AVAX: 1287.46,
    ATOM: 435.24,
    AXS: 41279.8,
    BNB: 1676.79,
    XRP: 415.3,
    LINK: 163.97,
    DOT: 687.41,
    ONE: 2537.47,
    MANA: 1143.28,
    SAND: 2470.36,
    UNI: 924.75,
  },
  9: {
    MATIC: 8364.74,
    BTC: 211.54,
    ETH: 652.23,
    SOL: 7911.88,
    FTM: 7483.16,
    DOGE: 8102.11,
    AVAX: 1878.95,
    ATOM: 706.21,
    AXS: 69054.07,
    BNB: 1415.11,
    XRP: 315.89,
    LINK: 116.86,
    DOT: 634.31,
    ONE: 3503.94,
    MANA: 785.21,
    SAND: 2182.51,
    UNI: 807.61,
  },
  10: {
    MATIC: 12278.73,
    BTC: 296.3,
    ETH: 843.81,
    SOL: 9283.19,
    FTM: 14719.43,
    DOGE: 10258.37,
    AVAX: 1758.56,
    ATOM: 674.58,
    AXS: 69477.09,
    BNB: 1746.82,
    XRP: 338.64,
    LINK: 136.04,
    DOT: 878.38,
    ONE: 5961.99,
    MANA: 3228.51,
    SAND: 4032.32,
    UNI: 772.17,
  },
  11: {
    Matic: 11936.06,
    BTC: 309.02,
    ETH: 915.52,
    SOL: 11465.93,
    FTM: 14724.9,
    DOGE: 9756.93,
    AVAX: 2424.72,
    ATOM: 643.34,
    AXS: 80636.22,
    BNB: 2186.79,
    XRP: 380.79,
    LINK: 154.36,
    DOT: 1094.49,
    ONE: 5884.43,
    MANA: 3157.38,
    SAND: 6971.39,
    UNI: 783.87,
  },
};

class RaceChart extends React.Component {
  componentDidMount() {
    const root = am5.Root.new("chartdiv");

    root.numberFormatter.setAll({
      numberFormat: "#a",

      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ],

      // Do not use small number prefixes at all
      smallNumberPrefixes: [],
    });

    var stepDuration = 2000;

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "none",
        wheelY: "none",
      })
    );

    chart.zoomOutButton.set("forceHidden", true);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
      inversed: true,
    });
    // hide grid
    yRenderer.grid.template.set("visible", false);

    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "network",
        renderer: yRenderer,
      })
    );

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        strictMinMax: true,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.set("interpolationDuration", stepDuration / 10);
    xAxis.set("interpolationEasing", am5.ease.linear);

    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        categoryYField: "network",
      })
    );

    // Rounded corners for columns
    series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });

    // Make each column to be of a different color
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueXWorking.formatNumber('#.# a')}",
          fill: root.interfaceColors.get("alternativeText"),
          fontSize: "10px",
          centerX: am5.p100,
          centerY: am5.p50,
          populateText: true,
        }),
      });
    });

    var label = chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "2020-11-09",
        fontSize: "4em",
        opacity: 0.2,
        x: am5.p100,
        y: am5.p100,
        centerY: am5.p100,
        centerX: am5.p100,
      })
    );

    // Get series item by category
    function getSeriesItem(category) {
      for (var i = 0; i < series.dataItems.length; i++) {
        var dataItem = series.dataItems[i];
        if (dataItem.get("categoryY") == category) {
          return dataItem;
        }
      }
    }

    // Axis sorting
    function sortCategoryAxis() {
      // sort by value
      series.dataItems.sort(function (x, y) {
        return y.get("valueX") - x.get("valueX"); // descending
        //return x.get("valueX") - y.get("valueX"); // ascending
      });

      // go through each axis item
      am5.array.each(yAxis.dataItems, function (dataItem) {
        // get corresponding series item
        var seriesDataItem = getSeriesItem(dataItem.get("category"));

        if (seriesDataItem) {
          // get index of series data item
          var index = series.dataItems.indexOf(seriesDataItem);
          // calculate delta position
          var deltaPosition =
            (index - dataItem.get("index", 0)) / series.dataItems.length;
          // set index to be the same as series data item index
          if (dataItem.get("index") != index) {
            dataItem.set("index", index);
            // set deltaPosition instanlty
            dataItem.set("deltaPosition", -deltaPosition);
            // animate delta position to 0
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: stepDuration / 2,
              easing: am5.ease.out(am5.ease.cubic),
            });
          }
        }
      });
      // sort axis items by index.
      // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
      yAxis.dataItems.sort(function (x, y) {
        return x.get("index") - y.get("index");
      });
    }

    var year = 1;

    // update data with values each 1.5 sec
    var interval = setInterval(function () {
      year++;

      if (year > 11) {
        clearInterval(interval);
        clearInterval(sortInterval);
      }

      updateData();
    }, stepDuration);

    var sortInterval = setInterval(function () {
      sortCategoryAxis();
    }, 100);

    function setInitialData() {
      var d = allData[year];

      for (var n in d) {
        series.data.push({ network: n, value: d[n] });
        yAxis.data.push({ network: n });
      }
    }

    function updateData() {
      var itemsWithNonZero = 0;

      if (allData[year]) {
        let labelText = "";

        if (year === 1) {
          labelText = "Jan 2021";
        }
        if (year === 2) {
          labelText = "Feb 2021";
        }
        if (year === 3) {
          labelText = "March 2021";
        }
        if (year === 4) {
          labelText = "April 2021";
        }
        if (year === 5) {
          labelText = "May 2021";
        }
        if (year === 6) {
          labelText = "June 2021";
        }
        if (year === 7) {
          labelText = "July 2021";
        }
        if (year === 8) {
          labelText = "Aug 2021";
        }
        if (year === 9) {
          labelText = "Sept 2021";
        }
        if (year === 10) {
          labelText = "Oct 2021";
        }
        if (year === 11) {
          labelText = "Nov 2021";
        }
        if (year === 12) {
          labelText = "Dec 2021";
        }

        label.set("text", labelText);

        am5.array.each(series.dataItems, function (dataItem) {
          var category = dataItem.get("categoryY");
          var value = allData[year][category];

          if (value > 0) {
            itemsWithNonZero++;
          }

          dataItem.animate({
            key: "valueX",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          });
          dataItem.animate({
            key: "valueXWorking",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          });
        });

        yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
      }
    }

    setInitialData();
    setTimeout(function () {
      year++;
      updateData();
    }, 50);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    this.root = root;
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: "100%", height: "350px" }}></div>;
  }
}

export default RaceChart;
