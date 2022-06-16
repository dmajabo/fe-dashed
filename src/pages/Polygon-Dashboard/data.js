import data from "./lacuna-plans.json";

import * as d3 from "d3";

export const group_data = d3.group(data, d => d.name);

export const names = new Set(data.map(d => d.name));

export const datevalues = Array.from(
  d3.rollup(
    data,
    ([d]) => d.value,
    d => +d.date,
    d => d.name
  )
)
  .map(([date, data]) => [new Date(date), data])
  .sort(([a], [b]) => d3.ascending(a, b));

export function rank(value) {
  const data = Array.from(names, name => ({ name, value: value(name) }));
  data.sort((a, b) => d3.descending(a.value, b.value));
  for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
  return data;
}

export default data;
