import React from "react";

const Loader = ({ type = "spinner" }) => {
  return (
    <div className="d-flex justify-content-center">
      {type == "dot" ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Loader;
