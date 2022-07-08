import React from "react";
import { useState } from "react";
import RenderChartType from "./RenderChartType";

const PreviewChart = ({ onClose, setModalStep, formattedData, onAddChart }) => {
  const [color, setColor] = useState({
    header1: "#818283",
    header2: "#E792BF",
    header3: "#E6007A",
    header4: "#818283",
    header5: "#9647FD",
    header6: "#F89697",
    header7: "#FF7F88",
    header8: "#66a1ff",
  });

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

                <input
                  type="color"
                  value={color.header1}
                  style={{ backgroundColor: color.header1 }}
                  onChange={e =>
                    setColor({ ...color, header1: e.target.value })
                  }
                />
              </div>
              <div className="list-item">
                <p>Header 2</p>
                <input
                  type="color"
                  value={color.header2}
                  style={{ backgroundColor: color.header2 }}
                  onChange={e =>
                    setColor({ ...color, header2: e.target.value })
                  }
                />
              </div>
              <div className="list-item">
                <p>Header 3</p>
                <input
                  type="color"
                  value={color.header3}
                  onChange={e =>
                    setColor({ ...color, header3: e.target.value })
                  }
                />
              </div>
              <div className="list-item">
                <p>Header 4</p>
                <input
                  type="color"
                  value={color.header4}
                  onChange={e =>
                    setColor({ ...color, header4: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div
            className="inner-right"
            style={{ height: 500, background: "#f5f5f5", borderRadius: 16 }}
          >
            <RenderChartType formattedData={formattedData} colors={color} />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            onAddChart(formattedData, color);
            onClose();
          }}
        >
          Add Chart
        </button>
      </div>
    </div>
  );
};

export default PreviewChart;
