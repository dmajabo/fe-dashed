import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import cx from 'classnames'

import dummy from './dummy.json'
import './TopTrafficChainCard.scss'

const sortOptions = [
  {
    label: 'Monthly Users',
    key: 'monthly'
  },
  {
    label: 'Weekly Users',
    key: 'weekly'
  },
  {
    label: 'Daily Users',
    key: 'daily'
  },
]

export default function TopTrafficChainCard() {
  const [chart, setChart] = useState()
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const topSource = useMemo(() => {
    let source
    dummy.data.forEach(item => {
      if (!source || item[sortBy.key] > source[sortBy.key]) {
        source = item
      }
    })

    return source
  }, [sortBy])

  const chartData = useMemo(() => {
    if (topSource) {
      return dummy.data.map(item => ({
        ...item,
        percent: Number(item[sortBy.key] / topSource[sortBy.key] * 100)
      }))
    }
    return []
  }, [sortBy])

  const top5Sources = useMemo(() => {
    return chartData.slice().sort((a, b) => b[sortBy.key] - a[sortBy.key]).slice(0, 5)
  }, [sortBy, chartData])

  const [hoveringSource, setHoveringSource] = useState(top5Sources[0])

  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("top-traffic-chain-chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
      radius: am5.percent(90),
      innerRadius: am5.percent(50),
      layout: root.horizontalLayout
    }));

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(am5percent.PieSeries.new(root, {
      name: "Series",
      valueField: "users",
      categoryField: "source"
    }));

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(dummy.data.map(item => ({ ...item, users: item.monthly })));

    // Disabling labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = chart.children.push(am5.Legend.new(root, {
      centerY: am5.percent(50),
      y: am5.percent(50),
      layout: root.verticalLayout
    }));
    // set value labels align to right
    legend.valueLabels.template.setAll({ textAlign: "right", fill: 'white' })
    // set width and max width of labels
    legend.labels.template.setAll({
      fill: 'white',
      maxWidth: 80,
      width: 80,
      oversizedBehavior: "wrap"
    });

    legend.data.setAll(series.dataItems);


    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    setChart({
      root,
      chart,
      series,
      legend
    })

    return () => {
      root.dispose()
    }
  }, [])

  useEffect(() => {
    chart?.series.data.setAll(dummy.data.map(item => ({ ...item, users: item[sortBy.key] })))
    chart?.legend.data.setAll(chart?.series.dataItems);
    chart?.series.appear(1000, 100)
  }, [sortBy])

  return (
    <Card className="top-traffic-chain">
      <CardBody>
        <h4>Top Traffic by Chain</h4>
        <p className="ff-inter">Polygon has increased by 2%</p>
        <div id="top-traffic-chain-chart"></div>
        <ul className="top-5-sources">
          <li>
            <div className="text-white">Top Chains</div>
            <div>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  {sortBy.label}
                </DropdownToggle>
                <DropdownMenu>
                  {sortOptions.map(option => (
                    <DropdownItem key={option.key} onClick={() => setSortBy(option)}>
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </li>
          {top5Sources.map(item => (
            <li
              key={item.source}
              className={cx('item', hoveringSource?.source === item.source && 'active')}
              onMouseEnter={() => setHoveringSource(item)}
            >
              <div>
                <div className="chip">{item.source}</div>
              </div>
              <div>
                <div className="chip" style={{ width: `${item.percent}%` }}>{item[sortBy.key]}</div>
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
