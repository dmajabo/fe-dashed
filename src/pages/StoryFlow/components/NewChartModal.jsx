import React from "react";
import { useState } from "react";
import { Modal } from "reactstrap";
import PreviewChart from "./PreviewChart";
import PasteChart from "./PasteChart";

const NewChartModal = ({ isOpen, onClose, onAddChart }) => {
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
          <LoadChartOptions
            setModalStep={step => setModalStep(step)}
            onClose={onClose}
          />
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
            modalStep={modalStep}
          />
        )}
        {modalStep === 4 && (
          <PreviewChart
            onClose={onClose}
            setModalStep={step => setModalStep(step)}
            formattedData={formattedData}
            onAddChart={onAddChart}
          />
        )}
      </Modal>
    </div>
  );
};

export default NewChartModal;

const LoadChartOptions = ({ setModalStep, onClose }) => {
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

const ChartType = ({ setModalStep, onClose, modalStep }) => {
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
              <div
                className="chart-item-inner active"
                onClick={() => setModalStep(modalStep + 1)}
              >
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
