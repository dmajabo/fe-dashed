import React from "react";
import move_chart from "../../assets/images/move_chart.svg";
import close_chart from "../../assets/images/close_chart.svg";

export default function ChartActionButtons() {
  return (
    <div className="card-actions">
      <img src={move_chart} style={{ height: 20 }} />
      <img src={close_chart} />
    </div>
  );
}
