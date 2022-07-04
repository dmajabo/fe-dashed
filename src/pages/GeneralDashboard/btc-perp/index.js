import axios from "axios";
import Loader from "components/Loader";
import { COINGLASS_API } from "helpers/constants";
import React, { useEffect, useState } from "react";

import { CardBody, CardTitle } from "reactstrap";

import { Table } from "reactstrap";

import "./index.css";

const BTCPerp = () => {
  // const { SearchBar } = Search;
  const [fundingRates, setFundingRates] = useState();
  const [sorting, setsorting] = useState({
    dataField: null,
    asc: true,
  });

  const columns = [
    {
      dataField: "market",
      text: "Exchange",
      sort: true,
    },
    {
      dataField: "symbol",
      text: "Symbol",
      sort: true,
    },
    {
      dataField: "funding_rate",
      text: "Funding",
      sort: true,
    },
  ];

  const updateSorting = field => {
    if (sorting.dataField == field) {
      setsorting({ dataField: field, asc: !sorting.asc });
    } else {
      setsorting({ dataField: field, asc: false });
    }
  };

  const sorted = sorting.dataField
    ? fundingRates.sort((p1, p2) => {
        if (typeof p1[sorting.dataField] == "string") {
          return sorting.asc
            ? p1[sorting.dataField].localeCompare(p2[sorting.dataField])
            : p2[sorting.dataField].localeCompare(p1[sorting.dataField]);
        } else {
          return sorting.asc
            ? parseFloat(p1[sorting.dataField]) -
                parseFloat(p2[sorting.dataField])
            : parseFloat(p2[sorting.dataField]) -
                parseFloat(p1[sorting.dataField]);
        }
      })
    : fundingRates;

  const getFundingRate = async () => {
    try {
      const { data } = await axios.get(`${COINGLASS_API}/fundingRate/v2/home`);

      let mappedData = [];
      for (const stats of data.data) {
        const margins = stats.uMarginList.map(margin => ({
          market: margin.exchangeName,
          symbol: stats.symbol,
          price: stats.cPrice,
          symbolLogo: stats.symbolLogo,
          funding_rate: margin.rate,
          exchangeLogo: margin.exchangeLogo,
        }));
        mappedData = [...mappedData, ...margins];
      }
      setFundingRates(mappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFundingRateInterval = setInterval(() => {
      getFundingRate();
    }, 3000);

    return () => {
      clearInterval(getFundingRateInterval);
    };
  }, [fundingRates]);

  if (!fundingRates)
    return (
      <div className="mt-5">
        <Loader />
      </div>
    );
  return (
    <CardBody className="table-container">
      <CardTitle className="mb-4">Best BTC Perpetual Funding Rates</CardTitle>
      <Table responsive className="perpetual-table">
        <thead className="thead-dark text-white">
          <tr className="m-5">
            {columns.map(({ dataField, text }, index) => (
              <th key={index} className="">
                <a
                  className="d-inline-flex text-white"
                  onClick={() => updateSorting(dataField)}
                >
                  {text}
                  <img
                    className={`mx-2 ${
                      sorting.dataField == dataField &&
                      !sorting.asc &&
                      "rotate-180"
                    }`}
                    src={require("./arrow.svg").default}
                  />
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted
            .slice(0, 10)
            .map(
              (
                { market, symbol, funding_rate, exchangeLogo, symbolLogo },
                index
              ) => (
                <tr key={index} className="font-weight-bold text-white">
                  <td className="">
                    <img className="icon" src={exchangeLogo} />
                    {market}
                  </td>
                  <td className="">
                    <img className="icon" src={symbolLogo} />
                    {symbol}
                  </td>
                  <td className="stats">{funding_rate?.toFixed(4)}%</td>
                  {/* <td className="stats">{basis.toFixed(2)}%</td> */}
                </tr>
              )
            )}
        </tbody>
      </Table>
    </CardBody>
  );
};

export default BTCPerp;
