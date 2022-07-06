/* eslint-disable react/jsx-key */
import axios from "axios";
import cx from 'classnames'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useTable, useSortBy, usePagination } from 'react-table'

import Loader from "components/Loader";
import FundingRate from "./FundingRate";
import PeakRate from "./PeakRate";

import ArrowSvg from 'assets/images/arrow.svg'
import { COINGLASS_API } from "helpers/constants";

import "./index.scss";

const sortType = (rowA, rowB, columnId) => {
  const a = rowA.original?.[columnId]?.annualRate
  const b = rowB.original?.[columnId]?.annualRate

  if (a >= b) return 1
  return -1
}

const LiveFundingRates = () => {
  const [fundingRates, setFundingRates] = useState();
  const [lowestRate, setLowestRate] = useState();
  const [highestRate, setHighestRate] = useState();
  const [columnCount, setColumnCount] = useState(5);
  const [sortBy, setSortBy] = useState([]);

  const columns = useMemo(() => [
    {
      Header: 'Symbol',
      accessor: 'symbol',
      Cell: cell => (
        <div className="d-flex align-items-center">
          <img className="symbol" src={cell.row.original.symbolLogo} />
          <span>{cell.row.original.symbol}</span>
        </div>
      )
    },
    {
      Header: 'Binance',
      accessor: row => row.Binance?.annualRate,
      sortType,
      Cell: cell => <FundingRate rate={cell.row.original.Binance?.annualRate} />,
    },
    {
      Header: 'FTX',
      accessor: row => row.FTX?.annualRate,
      sortType,
      Cell: cell => <FundingRate rate={cell.row.original.FTX?.annualRate} />
    },
    {
      Header: 'Okex',
      accessor: row => row.Okex?.annualRate,
      sortType,
      Cell: cell => <FundingRate rate={cell.row.original.Okex?.annualRate} />
    },
    {
      Header: 'Bybit',
      accessor: row => row.Bybit?.annualRate,
      sortType,
      Cell: cell => <FundingRate rate={cell.row.original.Bybit?.annualRate} />
    },
    {
      Header: 'dYdX',
      accessor: row => row.dYdX?.annualRate,
      sortType,
      Cell: cell => <FundingRate rate={cell.row.original.dYdX?.annualRate} />
    },
    {
      Header: 'Gate',
      accessor: row => row.Gate?.annualRate,
      Cell: cell => <FundingRate rate={cell.row.original.Gate?.annualRate} />
    },
    {
      Header: 'Bitget',
      accessor: row => row.Bitget?.annualRate,
      Cell: cell => <FundingRate rate={cell.row.original.Bitget?.annualRate} />
    },
    {
      Header: 'CoinEx',
      accessor: row => row.CoinEx?.annualRate,
      sortType,
      Cell: cell => <FundingRate rate={cell.row.original.CoinEx?.annualRate} />
    },
  ].slice(0, columnCount), [columnCount])

  const tableOptions = useMemo(() => ({
    columns,
    data: fundingRates || [],
    initialState: { pageSize: 10, sortBy },
  }), [fundingRates, columns, sortBy])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    state,
  } = useTable(tableOptions, useSortBy, usePagination)

  useEffect(() => {
    setSortBy(state.sortBy)
  }, [state.sortBy])

  const getFundingRate = useCallback(async () => {
    try {
      const { data } = await axios.get(`${COINGLASS_API}/fundingRate/v2/home`);

      let newHighestRate, newLowestRate;

      setFundingRates(data.data
        .map(coin => {
          const { uMarginList, ...rest } = coin
          const processed = { ...rest }
          uMarginList.forEach(margin => {
            const annualRate = (margin.rate || 0) * 4 * 365

            processed[margin.exchangeName] = margin
            processed[margin.exchangeName].annualRate = annualRate

            if (!!margin.rate) {
              if (!newHighestRate || newHighestRate.annualRate > annualRate) {
                newHighestRate = { symbol: rest.symbol, symbolLogo: rest.symbolLogo, ...processed[margin.exchangeName] }
              }
              if (!newLowestRate || newLowestRate.annualRate < annualRate) {
                newLowestRate = { symbol: rest.symbol, symbolLogo: rest.symbolLogo, ...processed[margin.exchangeName] }
              }
            }
          })

          return processed
        })
      );
      setHighestRate(newHighestRate)
      setLowestRate(newLowestRate)
    } catch (error) {
      console.log('Failed to get funding rates:', error);
    }
  }, []);

  useEffect(() => {
    const getFundingRateInterval = setInterval(getFundingRate, 3000);

    return () => {
      clearInterval(getFundingRateInterval);
    };
  }, [getFundingRate]);

  const calcTableSize = useCallback((width, height) => {
    setColumnCount(Math.floor((width - 150) / 100) + 1)
    setPageSize(Math.floor((height - 42) / 60) - 1)
  }, [setPageSize])

  useEffect(() => {
    const cardEl = document.getElementsByClassName('funding-rates')[0]
    const tableEl = cardEl.getElementsByClassName('table-responsive')[0]

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        calcTableSize(entry.contentRect.width, entry.contentRect.height)
      }
    })

    resizeObserver.observe(tableEl)

    return () => {
      resizeObserver.unobserve(tableEl)
    }
  }, [calcTableSize])

  return (
    <Card className="funding-rates">
      <CardBody>
        <CardTitle>Live Funding Rates</CardTitle>
        <CardSubtitle>This table shows average annualized funding rate</CardSubtitle>
        <div className="table-responsive position-relative">
          {!fundingRates && (
            <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center">
              <Loader />
            </div>
          )}
          {fundingRates && (
            <>
              <div className="mt-2 mb-2">
                <PeakRate label="Highest Rate:" rate={highestRate} />
                <PeakRate label="Lowest Rate:" rate={lowestRate} />
              </div>
              <Table {...getTableProps()}>
                <thead className="thead-dark text-white">
                  {headerGroups.map(headerGroup => (
                    <tr className="align-middle" {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.canSort ? column.getSortByToggleProps() : undefined)}>
                          <div className="d-flex align-items-center">
                            {column.render('Header')}
                            {column.isSorted && (
                              <span className="ps-1">
                                <img className={cx('mx-2', !column.isSortedDesc && 'rotate-180')} src={ArrowSvg} />
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map(row => {
                    prepareRow(row)
                    return (
                      <tr className="align-middle" {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </CardBody>
    </Card >
  )
}

export default LiveFundingRates
