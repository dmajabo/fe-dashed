import React from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsiveLine } from "@nivo/line";
import { darken } from "polished";
const RenderChartType = ({
  chartType = "AREA_BUMP",
  formattedData,
  colors = {
    header1: "#818283",
    header2: "#E792BF",
    header3: "#E6007A",
    header4: "#818283",
    header5: "#9647FD",
    header6: "#F89697",
    header7: "#FF7F88",
    header8: "#66a1ff",
  },
}) => {
  if (chartType === "AREA_BUMP") {
    return (
      <ResponsiveAreaBump
        data={formattedData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={16}
        colors={{ scheme: "purple_red" }}
        blendMode="multiply"
        defs={[
          {
            id: "eth",
            type: "linearGradient",
            colors: [
              { offset: 0, color: colors.header1 },
              { offset: 100, color: darken(0.8, colors.header1) }, //#131313
            ],
          },
          {
            id: "dot",
            type: "linearGradient",
            colors: [
              { offset: 0, color: colors.header2 },
              { offset: 100, color: darken(0.7, colors.header2) }, //"#E6007A"
            ],
          },
          {
            id: "ada",
            type: "linearGradient",
            colors: [
              { offset: 0, color: colors.header3 },
              { offset: 100, color: darken(0.7, colors.header3) },
            ],
          },
          {
            id: "sol",
            type: "linearGradient",
            colors: [
              { offset: 0, color: colors.header4 },
              { offset: 100, color: darken(0.7, colors.header4) },
            ],
          },
          {
            id: "avax",
            type: "linearGradient",
            colors: [
              { offset: 0, color: colors.header5 },
              { offset: 100, color: darken(0.7, colors.header5) },
            ],
          },
          {
            id: "trx",
            type: "linearGradient",
            colors: [
              { offset: 0, color: colors.header5 },
              { offset: 100, color: darken(0.7, colors.header5) },
            ],
          },
          {
            id: "atom",
            type: "linearGradient",
            colors: [
              { offset: 0, color: "#66a1ff" },
              { offset: 100, color: "#5064fb" },
            ],
          },
        ]}
        fill={[
          {
            match: {
              id: "ETH",
            },
            id: "eth",
          },
          {
            match: {
              id: "DOT",
            },
            id: "dot",
          },
          {
            match: {
              id: "ADA",
            },
            id: "ada",
          },
          {
            match: {
              id: "SOL",
            },
            id: "sol",
          },
          {
            match: {
              id: "AVAX",
            },
            id: "avax",
          },
          {
            match: {
              id: "TRX",
            },
            id: "trx",
          },
          {
            match: {
              id: "ATOM",
            },
            id: "atom",
          },
        ]}
        startLabel="id"
        endLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
      />
    );
  }

  if (chartType === "LINE") {
    return (
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          enable: false,
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Market Cap",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  }
};

export default RenderChartType;
