import React from "react";
import { ResponsiveSankey } from "@nivo/sankey";

const data = {
  nodes: [
    {
      id: "John",
      nodeColor: "hsl(259, 70%, 50%)",
    },
    {
      id: "Raoul",
      nodeColor: "hsl(317, 70%, 50%)",
    },
    {
      id: "Jane",
      nodeColor: "hsl(306, 70%, 50%)",
    },
    {
      id: "Marcel",
      nodeColor: "hsl(55, 70%, 50%)",
    },
    {
      id: "Ibrahim",
      nodeColor: "hsl(308, 70%, 50%)",
    },
    {
      id: "Junko",
      nodeColor: "hsl(43, 70%, 50%)",
    },
  ],
  links: [
    {
      source: "Raoul",
      target: "Marcel",
      value: 166,
    },
    {
      source: "John",
      target: "Jane",
      value: 180,
    },
    {
      source: "Ibrahim",
      target: "Marcel",
      value: 22,
    },
    {
      source: "Ibrahim",
      target: "Raoul",
      value: 123,
    },
    {
      source: "Ibrahim",
      target: "Jane",
      value: 120,
    },
    {
      source: "Marcel",
      target: "Junko",
      value: 42,
    },
    {
      source: "Jane",
      target: "Marcel",
      value: 182,
    },
    {
      source: "Jane",
      target: "Raoul",
      value: 5,
    },
  ],
};

export default function SankeyChart() {
  return (
    <ResponsiveSankey
      data={data}
      margin={{ top: 13, right: 160, bottom: 40, left: 50 }}
      align="justify"
      colors={{ scheme: "category10" }}
      nodeOpacity={1}
      nodeHoverOthersOpacity={0.35}
      nodeThickness={8}
      nodeBorderWidth={0}
      nodeBorderColor={{
        from: "color",
        modifiers: [["darker", 0.8]],
      }}
      nodeBorderRadius={3}
      linkOpacity={0.7}
      linkHoverOthersOpacity={0.1}
      linkContract={34}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="vertical"
      labelPadding={16}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 130,
          itemWidth: 100,
          itemHeight: 14,
          itemDirection: "right-to-left",
          itemsSpacing: 2,
          itemTextColor: "#999",
          symbolSize: 14,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}
