import React, { useCallback, useMemo, useState } from 'react'
import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import CountUp from 'react-countup'
import cx from 'classnames'

import dummy from './dummy.json'
import ImgUp from '../../../../assets/images/positive.png'
import ImgDown from '../../../../assets/images/negative.png'
import './TotalSalesByChainCard.scss'

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

export default function TotalSalesByChainCard() {
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const value = 45367
  const change = 12

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
    <Card className="total-sales-by-chain">
      <CardBody>
        <h4 className="title">Total Sales by Chain</h4>
        <p className="value">
          <CountUp
            start={Number(value) - (Number(value) / 10)}
            end={value}
            duration={2.75}
            separator=","
            decimals={0}
            delay={0}
          />
        </p>
        <div className="description">Sales last 90 days</div>
        <div className="change">
          {Number(change) > 0 && (
            <>
              <img className="me-2" src={ImgUp} alt="Up" />
              +
            </>
          )}
          {Number(change) < 0 && (
            <>
              <img className="me-2" src={ImgDown} alt="Down" />
            </>
          )}
          {change} %
        </div>

        <ul className="top-5-sources">
          <li>
            <div className="text-white">Chains</div>
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
                <img src={item.avatar} alt={item.source} />
                {item.source}
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
