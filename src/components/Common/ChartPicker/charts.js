import PolygonFrams from "../../../pages/Polygon-Dashboard/polygonFarms";
import PolygonTransactions from "pages/Polygon-Dashboard/polygonTransactions";
import Scatter from "pages/AllCharts/echart/scatterchart";
import SankeyChart from "pages/AllCharts/nivo/SankeyChart";
import ButterflyChart from "pages/AllCharts/ButterflyChart/ButterflyChart";
import ButterflyChart2 from "pages/AllCharts/ButterflyChart/ButterflyChart2";
import BumpChart from "pages/AllCharts/BumpChart";
import BubbleChart from "pages/AllCharts/BubbleChart";
import PackedBubbleChart from "pages/AllCharts/highcharts/PackedBubbleChart";
import ColumnChart from "pages/AllCharts/ColumnChart/ColumnChart";

import stackedArea from "../../../assets/images/charts/stacked-area.svg";
import scatterPlot from "../../../assets/images/charts/scatter-plot.svg";
import sankey from "../../../assets/images/charts/sankey.svg";
import pie from "../../../assets/images/charts/pie.svg";
import line from "../../../assets/images/charts/line.svg";
import circle from "../../../assets/images/charts/circle.svg";
import butterfly from "../../../assets/images/charts/butterfly.svg";
import bubble from "../../../assets/images/charts/bubble.svg";
import bar from "../../../assets/images/charts/bar.svg";
import linebar from "../../../assets/images/charts/linebar.svg";
import packedBubble from "../../../assets/images/charts/packed-bubble.svg";

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
  bubble2: {
    id: "bubble2",
    title: "Bubble Chart",
    preview: bubble,
    component: BubbleChart,
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
    component: ColumnChart,
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
    component: BumpChart,
  },
  butterfly: {
    id: "butterfly",
    title: "Butterfly",
    preview: butterfly,
    component: ButterflyChart,
  },
  butterfly2: {
    id: "butterfly2",
    title: "Butterfly",
    preview: butterfly,
    component: ButterflyChart2,
  },
  linebar: {
    id: "linebar",
    title: "line + bar",
    preview: linebar,
    component: PolygonTransactions,
  },
  packedbubble: {
    id: "packed-bubble",
    title: "Packed Bubble",
    preview: packedBubble,
    component: PackedBubbleChart,
  },
};

export const templates = [
  {
    id: "blockchain-activity",
    title: "⛓️ Blockchain Activity",
    charts: [
      {
        id: 'top-polygon-farms-by-tvl',
        title: "Top Polygon Farms by TVL",
        category: "Polygon",
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
        id: 'top=avalanche-farms-by-tvl',
        title: "Top Avalanche Farms by TVL",
        category: "Avalanche",
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
        id: 'top-solana-farms-by-tvl',
        title: "Top Solana Farms by TVL",
        category: "Solana",
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
        id: 'daily-performance-by-sector',
        title: "Daily Performance by Sector",
        chart_list: [
          {
            chart: chart_list.bubble,
          },
          {
            chart: chart_list.packedbubble,
          },
          {
            chart: chart_list.bar,
          },
          {
            chart: chart_list.butterfly2,
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
        id: 'gainers-losers',
        title: "Gainers / Losers",
        chart_list: [
          {
            chart: chart_list.butterfly2,
          },
          {
            chart: chart_list.scatter,
            disabled: true,
          },
          {
            chart: chart_list.bubble2,
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
        id: 'layer-1-performance-by-ytd',
        title: "Layer 1 Performance by YTD",
        sub_title: "Based on top 10 layer-1 protocols by market capitalization",
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
