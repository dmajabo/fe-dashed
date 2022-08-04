import React from "react";
import move_chart from "../../assets/images/move_chart.svg";
import close_chart from "../../assets/images/close_chart.svg";

export default function ChartActionButtons({ onRemove }) {
  return (
    <div className="card-actions">
      <img className="btn-move" src={move_chart} style={{ height: 20 }} />
      <a onClick={onRemove}>
        <img src={close_chart} onClick={onRemove} />
      </a>
    </div>
  );
}
