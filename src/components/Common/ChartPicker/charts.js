import PolygonFrams from "../../../pages/Polygon-Dashboard/polygonFarms";
import PolygonTransactions from "pages/Polygon-Dashboard/polygonTransactions";
import Scatter from "pages/AllCharts/echart/scatterchart";
import BubbleChart from "pages/AllCharts/echart/bubblechart";
import SankeyChart from "pages/AllCharts/nivo/SankeyChart";
import ButterflyChart from "pages/AllCharts/ButterflyChart/ButterflyChart";

import stackedArea from "../../../assets/images/charts/stacked-area.svg";
import scatterPlot from "../../../assets/images/charts/scatter-plot.svg";
import sankey from "../../../assets/images/charts/sankey.svg";
import radar from "../../../assets/images/charts/radar.svg";
import pie from "../../../assets/images/charts/pie.svg";
import line from "../../../assets/images/charts/line.svg";
import guage from "../../../assets/images/charts/guage.svg";
import donut from "../../../assets/images/charts/donut.svg";
import circle from "../../../assets/images/charts/circle.svg";
import butterfly from "../../../assets/images/charts/butterfly.svg";
import bubble from "../../../assets/images/charts/bubble.svg";
import bar from "../../../assets/images/charts/bar.svg";
import linebar from "../../../assets/images/charts/linebar.svg";
import packedBubble from "../../../assets/images/charts/packed-bubble.svg"

export const chart_list = {
  circle: {
    id: "circle",
    title: "Circle Pack",
    preview: circle,
    component: PolygonFrams,
  },
  bubble: {
    id: "bubble",
    title: "Bubble Chart",
    preview: bubble,
    component: Scatter,
  },
  line: {
    id: "line",
    title: "Line",
    preview: line,
    component: PolygonFrams,
  },
  pie: {
    id: "pie",
    title: "Pie",
    preview: pie,
    component: PolygonFrams,
  },
  bar: {
    id: "bar",
    title: "Bar",
    preview: bar,
    component: PolygonTransactions,
  },
  stacked: {
    id: "stacked",
    title: "Stacked Area",
    preview: stackedArea,
    component: PolygonFrams,
  },
  scatter: {
    id: "scatter",
    title: "Scatter",
    preview: scatterPlot,
    component: Scatter,
  },
  sankey: {
    id: "sankey",
    title: "Bump Chart",
    preview: sankey,
    component: SankeyChart,
  },
  butterfly: {
    id: "butterfly",
    title: "Butterfly",
    preview: butterfly,
    component: ButterflyChart,
  },
  linebar: {
    id: "linebar",
    title: "line + bar",
    preview: linebar,
    component: PolygonTransactions,
  },
  packedbubble: {
    id: "scatter",
    title: "Packed Bubble",
    preview: packedBubble,
    component: Scatter,
  },
};

export const templates = [
  {
    id: "blockchain-activity",
    title: "⛓️ Blockchain Activity",
    charts: [
      {
        id: 1,
        title: "Top Polygon Farms by TVL",
        chart_list: [
          {
            chart: chart_list.pie,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bar,
            disabled: true,
          },
          {
            chart: chart_list.linebar,
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        title: "Top Avalanche Farms by TVL",
        chart_list: [
          {
            chart: chart_list.pie,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bar,
            disabled: true,
          },
          {
            chart: chart_list.linebar,
            disabled: true,
          },
        ],
        disabled: true,
      },
      {
        id: 3,
        title: "Top Solana Farms by TVL",
        chart_list: [
          {
            chart: chart_list.pie,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bar,
            disabled: true,
          },
          {
            chart: chart_list.linebar,
            disabled: true,
          },
        ],
        disabled: true,
      },
    ],
  },
  {
    id: "market-data",
    title: "💹 Market Data",
    charts: [
      {
        id: 1,
        title: "Daily Performance by Sector",
        chart_list: [
          {
            chart: chart_list.bubble,
          },
          {
            chart: chart_list.packedbubble,
            disabled: true,
          },
          {
            chart: chart_list.bar,
          },
          {
            chart: chart_list.butterfly,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        title: "Gainers / Losers",
        chart_list: [
          {
            chart: chart_list.butterfly,
          },
          {
            chart: chart_list.scatter,
            disabled: true,
          },
          {
            chart: chart_list.bubble,
          },
          {
            chart: chart_list.circle,
            disabled: true,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
        ],
      },
      {
        id: 3,
        title: "Layer 1 Performance by YTD",
        chart_list: [
          {
            chart: chart_list.butterfly,
          },
          {
            chart: chart_list.sankey,
          },
          {
            chart: chart_list.line,
            disabled: true,
          },
          {
            chart: chart_list.stacked,
            disabled: true,
          },
          {
            chart: chart_list.bubble,
            disabled: true,
          },
          {
            chart: chart_list.scatter,
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    title: "🖼️ NFTS",
    disabled: true,
  },
  {
    title: "🔌 Exchange Activity",
    disabled: true,
  },
];
