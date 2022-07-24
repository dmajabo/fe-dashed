import React, { useState } from "react";

const range = [
  { id: "year", label: "12 months", days: 365 },
  { id: "3-months", label: "3 months", days: 90 },
  { id: "month", label: "30 days", days: 30 },
  { id: "week", label: "7 days", days: 7 },
  { id: "day", label: "24 hours", days: 1 },
];

export default function ChartRangeNavigation() {
  const [selected, setselected] = useState(range[3]);

  return (
    <div className="range">
      {range.map((r, index) => (
        <button
          key={index}
          className={selected.id == r.id ? "active" : ""}
          onClick={() => setselected(r)}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
