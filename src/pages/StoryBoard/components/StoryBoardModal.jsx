import React from "react";
import "./storyboardModal.scss";

const StoryBoardModal = ({ onSelectChart }) => {
  return (
    <div className="story-board-modal">
      <div className="modal-item" onClick={() => onSelectChart("Price")}>
        <img src="/chart-icons/price-chart.svg" alt="price-chart" />

        <div className="text-content">
          <p>Price Chart</p>
          <small>Value over time as lines or candle</small>
        </div>
      </div>
      <div className="modal-item" onClick={() => onSelectChart("Area")}>
        <img src="/chart-icons/area-chart.svg" alt="area-chart" />

        <div className="text-content">
          <p>Area Chart</p>
          <small>Value over time as field areas</small>
        </div>
      </div>
      <div className="modal-item" onClick={() => onSelectChart("Bar")}>
        <img src="/chart-icons/bar-chart.svg" alt="bar-chart" />

        <div className="text-content">
          <p>Price Chart</p>
          <small>Value category as bars</small>
        </div>
      </div>
      <div className="modal-item" onClick={() => onSelectChart("Pie")}>
        <img src="/chart-icons/pie-chart.svg" alt="pie-chart" />

        <div className="text-content">
          <p>Pie Chart</p>
          <small>Radical Hierarchy</small>
        </div>
      </div>
      <div className="modal-item" onClick={() => onSelectChart("Line")}>
        <img src="/chart-icons/line-chart.svg" alt="line-chart" />

        <div className="text-content">
          <p>Line Chart</p>
          <small>Value over time as lines</small>
        </div>
      </div>
      <div className="modal-item" onClick={() => onSelectChart("Scatter")}>
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

export const TickerModal = () => {
  return (
    <div className="ticker-modal">
      <div className="ticker-modal-inner">
        <div className="top">
          <img src="/chart-icons/price-chart.svg" alt="price-chart" />

          <div className="text-content">
            <p className="title">Price Chart</p>{" "}
            <small className="description">
              Value over time as lines or candles
            </small>
          </div>
        </div>

        <div className="middle">
          <p className="title">Ticker</p>
          <div className="input">
            <i className="fas fa-search"></i>

            <input type="text" placeholder="ticker" />
          </div>
        </div>
      </div>
    </div>
  );
};
