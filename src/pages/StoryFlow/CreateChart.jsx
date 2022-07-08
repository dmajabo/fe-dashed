import React, { Fragment, useState } from "react";

import NewChartModal from "./components/NewChartModal";
import RenderChartType from "./components/RenderChartType";
import "./new-chart.scss";

const CreateNewChart = () => {
  const [showModal, setShowModal] = useState(false);
  const [colors, setColors] = useState();
  const [formattedChart, setFormattedChart] = useState();

  return (
    <Fragment>
      <div className="new-chart page-content">
        <div className="container-fluid" style={{ paddingBottom: "64px" }}>
          <div className="inner">
            <div className="top">
              <p className="fs-22 mb-0">Fundamentals</p>
              <h4 className="fs-34 my-0 ">insert title</h4>
              <p>
                by <span className="color-lime">@cryptoguy</span> and
                <span> @cryptogirl</span>, March 18
              </p>
            </div>

            <div
              className="add-chart-area"
              style={{ background: formattedChart ? "#f5f5f5" : "inherit" }}
            >
              {formattedChart ? (
                <RenderChartType
                  formattedData={formattedChart}
                  colors={colors}
                />
              ) : (
                <button className="btn" onClick={() => setShowModal(true)}>
                  Add a chart
                </button>
              )}
            </div>
            <p className="text-center">
              add chart = upload data 2. choose chart. 3. customize chart 4.
              preview. 5. add to story
            </p>
          </div>
        </div>
      </div>
      <NewChartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddChart={(formattedData, color) => {
          setFormattedChart(formattedData);
          setColors(color);
        }}
      />
    </Fragment>
  );
};

export default CreateNewChart;
