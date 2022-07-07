import React from "react";
import "./storyboardModal.scss";

const StoryBoardModal = () => {
  return (
    <div className="story-board-modal">
      <div className="modal-item active">
        <img src="/chart-icons/price-chart.svg" alt="price-chart" />

        <div className="text-content">
          <p>Price Chart</p>
          <small>Value over time as lines or candle</small>
        </div>
      </div>
      <div className="modal-item">
        <img src="/chart-icons/area-chart.svg" alt="area-chart" />

        <div className="text-content">
          <p>Area Chart</p>
          <small>Value over time as field areas</small>
        </div>
      </div>
      <div className="modal-item">
        <img src="/chart-icons/bar-chart.svg" alt="bar-chart" />

        <div className="text-content">
          <p>Price Chart</p>
          <small>Value category as bars</small>
        </div>
      </div>
      <div className="modal-item">
        <img src="/chart-icons/pie-chart.svg" alt="pie-chart" />

        <div className="text-content">
          <p>Pie Chart</p>
          <small>Radical Hierarchy</small>
        </div>
      </div>
      <div className="modal-item">
        <img src="/chart-icons/line-chart.svg" alt="line-chart" />

        <div className="text-content">
          <p>Line Chart</p>
          <small>Value over time as lines</small>
        </div>
      </div>
      <div className="modal-item">
        <img src="/chart-icons/scatter-chart.svg" alt="scatter-chart" />

        <div className="text-content">
          <p>Scatter Plot</p>
          <small>Value by category as bars</small>
        </div>
      </div>
    </div>
  );
};

export default StoryBoardModal;
