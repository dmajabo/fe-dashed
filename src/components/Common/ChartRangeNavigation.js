import React, { useState } from "react";

export default function ChartRangeNavigation({
  range,
  defaultIndex = 3,
  btcRange,
  onChange,
}) {
  const [selected, setselected] = useState(range[defaultIndex]);

  const selectRange = r => {
    setselected(r);
    onChange && onChange(r);
  };

  return (
    <div className={`range ${btcRange && "btc-range"}`}>
      {range.map((r, index) => (
        <button
          key={index}
          className={selected.id == r.id ? "active" : ""}
          onClick={() => selectRange(r)}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
