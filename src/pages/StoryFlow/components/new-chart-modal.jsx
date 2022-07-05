import React from "react";
import { useState } from "react";
import { usePapaParse } from "react-papaparse";
import { Modal } from "reactstrap";
import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsiveLine } from "@nivo/line";

const NewChartModal = ({ isOpen, onClose }) => {
  const [modalStep, setModalStep] = useState(1);
  const [formattedData, setFormattedData] = useState([]);

  return (
    <div className="new-chart-modal">
      <Modal
        isOpen={isOpen}
        toggle={onClose}
        style={{ minWidth: modalStep >= 3 ? "759px" : "auto" }}
      >
        {modalStep === 1 && (
          <LoadChartOptions setModalStep={step => setModalStep(step)} />
        )}
        {modalStep === 2 && (
          <PasteChart
            onClose={onClose}
            setModalStep={step => setModalStep(step)}
            setFormattedData={data => setFormattedData(data)}
          />
        )}
        {modalStep === 3 && (
          <ChartType
            onClose={onClose}
            setModalStep={step => setModalStep(step)}
          />
        )}
        {modalStep === 4 && (
          <PreviewChart
            onClose={onClose}
            setModalStep={step => setModalStep(step)}
            formattedData={formattedData}
          />
        )}
      </Modal>
    </div>
  );
};

export default NewChartModal;

const LoadChartOptions = ({ setModalStep }) => {
  return (
    <div className="load-chart-option">
      <div className="modal-header">
        <h5 className="modal-title mt-0">1. Load your data</h5>
        <button
          type="button"
          onClick={() => onClose()}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="chart-option">
          <div className="inner" onClick={() => setModalStep(2)}>
            <i className="fas fa-paste"></i> <p>Paste your data</p>
            <i className="fas fa-chevron-right "></i>
          </div>
        </div>
        <div className="chart-option">
          <div className="inner">
            <i className="fas fa-upload"></i> <p>Upload your data</p>
            <i className="fas fa-chevron-right "></i>
          </div>
        </div>

        <div className="chart-option ">
          <div className="inner active">
            <img src="/logo.svg" alt="" /> <p>Use our data</p>
            <i className="fas fa-chevron-right "></i>
          </div>
        </div>

        <div className="chart-option">
          <div className="inner">
            <i className="fas fa-link"></i> <p>From URL</p>
            <i className="fas fa-chevron-right "></i>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          onClick={() => onClose()}
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onClose()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const PasteChart = ({ setModalStep, onClose, setFormattedData }) => {
  const [storyDataString, setStoryDataString] = React.useState("");
  const { readString } = usePapaParse();
  React.useEffect(() => {
    if (storyDataString.trim() !== "") {
      // console.log("story data string input", storyDataString);

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

          // console.log({ dataForChart });

          setFormattedData(dataForChart);
        },
      });
    }
  }, [storyDataString]);
  return (
    <div className="paste-chart">
      <div className="modal-header ">
        <h5 className="modal-title mt-0" onClick={() => setModalStep(1)}>
          <i className="fas fa-chevron-left me-3"></i> Paste Data
        </h5>
        <button
          type="button"
          onClick={() => onClose()}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="moda-body px-2">
        <textarea
          onChange={e => setStoryDataString(e.target.value)}
          className="form-control"
          style={{ height: "200px" }}
          value={storyDataString}
        />
      </div>

      <div className="modal-footer">
        <button
          type="button"
          onClick={() => onClose()}
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!storyDataString}
          onClick={() => setModalStep(3)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const ChartType = ({ setModalStep, onClose }) => {
  return (
    <div className="chart-type">
      <div className="modal-header ">
        <h5 className="modal-title mt-0" onClick={() => setModalStep(2)}>
          <i className="fas fa-chevron-left me-3"></i> 2. Choose Chart
        </h5>
        <button
          type="button"
          onClick={() => onClose()}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        <div className="d-flex gap-4">
          <div className="modal-body-left">
            <img src="/alluvial-chart.svg" alt="" />

            <div className="text-content">
              <h6>Alluvial Diagram </h6>
              <p>
                It shows correlations between categorical dimensions
                representing them as flows, visually linking categories with
                shared items. Each rectangle represents a unique value in the
                selected dimension, its height is proportional to its value.
                Correlations are represented with curved lines whose width is
                proportional to their value.
              </p>
            </div>
          </div>
          <div className="modal-body-right">
            <div className="chart-item">
              <div className="chart-item-inner active">
                <img src="/coin_icons/alluvial-icon.svg" alt="" />
                <div>
                  <p className="text-white">Alluvial Diagram</p>
                  <small className="text-gray">
                    {" "}
                    Correlations, proportions
                  </small>
                </div>
              </div>
            </div>
            <div className="chart-item">
              <div className="chart-item-inner">
                <img src="/coin_icons/barchart-icon.svg" alt="" />
                <div>
                  <p className="text-white">Stacked bar chart</p>
                  <small className="text-gray">Correlations, proportions</small>
                </div>
              </div>
            </div>
            <div className="chart-item">
              <div className="chart-item-inner">
                <img src="/coin_icons/linechart-icon.svg" alt="" />
                <div>
                  <p className="text-white">Scatter Pot chart</p>
                  <small className="text-gray">Correlations, proportions</small>
                </div>
              </div>
            </div>
            <div className="chart-item">
              <div className="chart-item-inner">
                <img src="/coin_icons/dotchart-icon.svg" alt="" />
                <div>
                  <p className="text-white">Circle Packing</p>
                  <small className="text-gray">Proportions</small>
                </div>
              </div>
            </div>
            <div className="chart-item">
              <div className="chart-item-inner">
                <img src="/coin_icons/calenderchart.svg" alt="" />
                <div>
                  <p className="text-white">Calendar Heatmap</p>
                  <small className="text-gray">Time Chunks proportions</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          onClick={() => onClose()}
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setModalStep(4)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const PreviewChart = ({ onClose, setModalStep, formattedData }) => {
  return (
    <div className="preview-chart">
      <div className="modal-header ">
        <h5 className="modal-title mt-0" onClick={() => setModalStep(3)}>
          <i className="fas fa-chevron-left me-3"></i> Paste Data
        </h5>
        <button
          type="button"
          onClick={() => onClose()}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        <div className="modal-body-inner">
          <div className="inner-left">
            <h6 className="fs-18">Customize</h6>
            <hr />

            <h6 className="fw-bold fs-16">Colors</h6>

            <div className="list">
              <div className="list-item">
                <p>Header 1</p>
                <p>#23209485</p>
              </div>
              <div className="list-item">
                <p>Header 2</p>
                <p>#23209485</p>
              </div>
              <div className="list-item">
                <p>Header 3</p>
                <p>#23209485</p>
              </div>
              <div className="list-item">
                <p>Header 4</p>
                <p>#23209485</p>
              </div>
            </div>
          </div>
          <div
            className="inner-right"
            style={{ height: 500, background: "#f5f5f5", borderRadius: 16 }}
          >
            <RenderChartType formattedData={formattedData} />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setModalStep(4)}
        >
          Add Chart
        </button>
      </div>
    </div>
  );
};

const RenderChartType = ({ chartType = "AREA_BUMP", formattedData }) => {
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
