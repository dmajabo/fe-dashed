import * as React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalHeader,
  ModalFooter,
  Row,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import { connect } from "react-redux";

import { usePapaParse } from "react-papaparse";

import { ResponsiveAreaBump, ResponsiveBump } from "@nivo/bump";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

import { format } from "date-fns";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";

import Breadcrumbs from "../../components/Common/Breadcrumb";

// https://nivo.rocks/sankey/

/**
 *  
 * 7. Go to create data story, click blank
8. Click add chart (Illuvial diagram) and load data from template
9. Paste in data (CSV)
10. It shows a data CSV table
11. Click to accept data
12. It shows a preview of the chart
13. Click accept
14. It shows the finished static image that is in Rawgraphs, data viz style
15. Show what it’s like to the edit the text header.
16. Presentation end.
 */

const StoryFlowPage = ({ showSidebar, toggleSidebar }) => {
  const [showModal, setShowModal] = React.useState(true);
  const [modalStep, setModalStep] = React.useState(1);
  const [storyTitle, setStoryTitle] = React.useState("Story title");
  const [storyDataString, setStoryDataString] = React.useState("");
  const [formattedData, setFormattedData] = React.useState([]); // to work only with area bump and line
  const [chartType, setChartType] = React.useState("AREA_BUMP"); // AREA_BUMP or LINE

  const { readString } = usePapaParse();

  React.useEffect(() => {
    toggleMenuCallback();
  }, []);

  React.useEffect(() => {
    if (storyDataString.trim() !== "") {
      console.log("story data string input", storyDataString);

      readString(storyDataString, {
        worker: true,
        complete: results => {
          /**
           * results formatting:
           *
           * [ ['Date', 'ETH', 'BTC', 'MATIC'],
           *   [2020, 50, 120, 10]
           *   [2021, 100, 150, 20],
           *   [2022, 200, 300, 30]
           * ]
           */

          /**
           *  end result data formatting
           *
           * [
           *    {id: "BTC", data: [{ x: 2021 , y: 0 }, {x: 2022, y: 0}]},
           *    {id: "ETH", data: [{ x: 2021, y: 0, {x: 2022, y: 0} }]},
           * ]
           *
           * x should be the date, y is the numerical value
           */

          /** What do we know?
           *
           *  first item in our results array are the column headers.
           *  we can use those for the Id
           *
           *  we can loop over the first item in the results array,
           *  but skip the first index (which is date)
           */

          const columnHeaders = results.data[0];
          columnHeaders.shift(); // removes the "time" header

          results.data.shift();

          const dataForChart = columnHeaders.map((column, index) => {
            /**
             *  1. loop over results.data
             *  2. each iteration will give us back an array
             *  3. that arrays first item will be the date, or our "x" value
             *  4. we can access the columns value by using our index + 1 (b/c we removed date header)
             *
             * */

            let dataForColumn = results.data.map(data => {
              return {
                x: data[0],
                y: Number(data[index + 1]),
              };
            });

            return {
              id: column,
              data: [...dataForColumn],
            };
          });

          console.log({ dataForChart });

          setFormattedData(dataForChart);
        },
      });
    }
  }, [storyDataString]);

  React.useEffect(() => {
    const editor = new MediumEditor("#editor", {
      placeholder: {
        /* This example includes the default options for placeholder,
               if nothing is passed this is what it used */
        text: "Type something...",
        hideOnClick: true,
      },
      toolbar: {
        buttons: [
          "bold",
          "italic",
          {
            name: "h1",
            action: "append-h2",
            aria: "header type 1",
            tagNames: ["h2"],
            contentDefault: "<b>H1</b>",
            classList: ["custom-class-h1"],
            attrs: {
              "data-custom-attr": "attr-value-h1",
            },
          },
          {
            name: "h2",
            action: "append-h3",
            aria: "header type 2",
            tagNames: ["h3"],
            contentDefault: "<b>H2</b>",
            classList: ["custom-class-h2"],
            attrs: {
              "data-custom-attr": "attr-value-h2",
            },
          },
          "quote",
          "anchor",
        ],
      },
    });
  }, []);

  const renderChartType = () => {
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
                { offset: 0, color: "red" }, //#818283
                { offset: 100, color: "yellow" }, //#131313
              ],
            },
            {
              id: "dot",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#E792BF" },
                { offset: 100, color: "#E6007A" },
              ],
            },
            {
              id: "ada",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#E6007A" },
                { offset: 100, color: "#0133AD" },
              ],
            },
            {
              id: "sol",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#9647FD" },
                { offset: 100, color: "#1BF7A0" },
              ],
            },
            {
              id: "avax",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#F89697" },
                { offset: 100, color: "#E84142" },
              ],
            },
            {
              id: "trx",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#FF7F88" },
                { offset: 100, color: "#FF0013" },
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

  const toggleMenuCallback = () => {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
      window.dispatchEvent(new Event('resize'));
    }
  };

  return (
    <div className="page-content">
      <Container
        className="story"
        fluid={true}
        style={{ paddingBottom: "64px" }}
      >
        <Breadcrumbs title="Dashboards" breadcrumbItem="Story Flow" />

        <div className="editor" id="editor">
          <h1>{storyTitle}</h1>
          <h6>
            By <span style={{ color: "#00ff85" }}>@WebD00D</span> on{" "}
            {format(Date.now(), "MMM dd, yyyy")}
          </h6>
          {modalStep === 3 && !showModal && (
            <>
              <hr />
              <div className="chart-here">
                <div style={{ height: "300px", background: "#f5f5f5" }}>
                  {renderChartType()}
                </div>
              </div>
            </>
          )}
          <hr />

          <h4>A captivating headline for your story</h4>
          <p>
            Choose a clear central message. A great story usually progresses
            towards a central moral or message...
          </p>
        </div>
      </Container>
    </div>
  );
};

export default StoryFlowPage;
