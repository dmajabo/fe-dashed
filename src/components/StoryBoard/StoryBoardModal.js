/* eslint-disable no-undef */
import React from "react";
import { useState  } from "react";
import { Modal as ModalComp, ModalBody } from "reactstrap"

const StoryBoardModal = ({ onSelectChart, isOpen, toggle }) => {
  return (
    <ModalComp centered contentClassName="transparent" backdropClassName="transparent" isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <div className="story-board-modal">
          <div className="modal-item" onClick={() => onSelectChart("Price")}>
            <img src="/chart-icons/price-chart.svg" alt="price-chart" />

            <div className="text-content">
              <h3>Price Chart</h3>
              <p className="description">Value over time as lines or candle</p>
            </div>
          </div>
          <div className="modal-item" onClick={() => onSelectChart("Area")}>
            <img src="/chart-icons/area-chart.svg" alt="area-chart" />

            <div className="text-content">
              <h3>Area Chart</h3>
              <p className="description">Value over time as field areas</p>
            </div>
          </div>
          <div className="modal-item" onClick={() => onSelectChart("Bar")}>
            <img src="/chart-icons/bar-chart.svg" alt="bar-chart" />

            <div className="text-content">
              <h3>Price Chart</h3>
              <p className="description">Value category as bars</p>
            </div>
          </div>
          <div className="modal-item" onClick={() => onSelectChart("Pie")}>
            <img src="/chart-icons/pie-chart.svg" alt="pie-chart" />

            <div className="text-content">
              <h3>Pie Chart</h3>
              <p className="description">Radical Hierarchy</p>
            </div>
          </div>
          <div className="modal-item" onClick={() => onSelectChart("Line")}>
            <img src="/chart-icons/line-chart.svg" alt="line-chart" />

            <div className="text-content">
              <h3>Line Chart</h3>
              <p className="description">Value over time as lines</p>
            </div>
          </div>
          <div className="modal-item" onClick={() => onSelectChart("Scatter")}>
            <img src="/chart-icons/scatter-chart.svg" alt="scatter-chart" />

            <div className="text-content">
              <h3>Scatter Plot</h3>
              <p className="description">Value by category as bars</p>
            </div>
          </div>
        </div>
      </ModalBody>
    </ModalComp>
  );
};

export default StoryBoardModal;

export const TickerModal = ({
  isOpen,
  onClose,
  ticker,
  isDisabled,
  onChange,
  toggle
}) => {
  
  const [value, setValue] = useState(ticker)
  const [invalid, setInvalid] = useState(false)
  
  const onSubmit = () => {
    if(value == "Solana" || value == "solaba" || value == "sol" || value == "SOL") {
      if(onChange) onChange('solana')
      setInvalid(false)
    }else{
      setInvalid(true)
    }
  }

  return (
    <ModalComp centered size="md" contentClassName="transparent" backdropClassName="transparent" onClosed={onClose} isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <div className="ticker-modal">
          <div className="ticker-modal-inner">
            <div className="top">
              <img src="/chart-icons/price-chart.svg" alt="price-chart" />

              <div className="text-content">
                <h3 className="title">Price Chart</h3>
                <p className="description">
                  Value over time as lines or candles
                </p>
              </div>
            </div>

            <div className="middle">
              <h3 className="title">Enter Symbol</h3>
              <div className={`input ${invalid ? 'invalid' : ''}`}>
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="ticker"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
                <button onClick={onSubmit} className="ticker-submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </ModalComp>
  );
};
