import React, { useMemo, useState } from 'react'
import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import cx from 'classnames'

import dummy from './dummy.json'
import './TopTrafficSourcesCard.scss'

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

export default function TopTrafficSourcesCard() {
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

  return (
    <Card className="top-traffic-sources">
      <CardBody>
        <h4>Top Traffic Sources</h4>
        <ul className="top-5-sources">
          <li>
            <div className="text-white">Top Sources</div>
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
        <div className="top-traffic-source-chart">
          {chartData.map(item => (
            <div
              key={item.source}
              className={cx('item', hoveringSource?.source === item.source && 'active')}
              onMouseEnter={() => setHoveringSource(item)}
              style={{ height: `${item.percent}%` }}
            >
              {item.daily}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
