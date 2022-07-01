import axios from "axios";
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

  // Table data
  const products = [
    {
      market: "EQONEX (Perpetual)",
      symbol: "25",
      index_id: "BTC",
      price: 29342.52,
      price_percentage_change_24h: -2.59968162,
      contract_type: "perpetual",
      index: null,
      basis: -2.338818547,
      spread: 0.02,
      funding_rate: -0.607698,
      open_interest: null,
      volume_24h: 7004857.166,
      last_traded_at: 1654921898,
    },
    {
      market: "AAX Futures",
      symbol: "BTCUSDFP",
      index_id: "BTC",
      price: 29282,
      price_percentage_change_24h: -2.547632915,
      contract_type: "perpetual",
      index: 29053.25,
      basis: -0.7811966396,
      spread: 0.15,
      funding_rate: -0.007338,
      open_interest: 297652447.3,
      volume_24h: 197673390,
      last_traded_at: 1654922025,
    },
    {
      market: "FTX (Derivatives)",
      symbol: "BTC-PERP",
      index_id: "BTC",
      price: 29304,
      price_percentage_change_24h: -2.51497006,
      contract_type: "perpetual",
      index: 29300.75875,
      basis: -0.01106077669,
      spread: 0.01,
      funding_rate: -0.0024,
      open_interest: 1765720441,
      volume_24h: 2808131547,
      last_traded_at: 1654922489,
    },
    {
      market: "AAX Futures",
      symbol: "BTCUSDTFP",
      index_id: "BTC",
      price: 29336.47,
      price_percentage_change_24h: -2.55947317,
      contract_type: "perpetual",
      index: 29091.525,
      basis: -0.821833326,
      spread: 0.02,
      funding_rate: -0.002183,
      open_interest: 665725068.3,
      volume_24h: 448348542.6,
      last_traded_at: 1654922308,
    },
    {
      market: "CoinEx (Futures)",
      symbol: "BTC-USD",
      index_id: "BTC",
      price: 29308.3,
      price_percentage_change_24h: -2.611790273,
      contract_type: "perpetual",
      index: 29304.2275,
      basis: -0.01389538117,
      spread: 0.02,
      funding_rate: -0.001859,
      open_interest: 1369533,
      volume_24h: 7734465,
      last_traded_at: 1654922567,
    },
    {
      market: "Crypto.com Exchange (Futures)",
      symbol: "BTCUSD-220930",
      index_id: "BTC",
      price: 29540,
      price_percentage_change_24h: -2.588623248,
      contract_type: "perpetual",
      index: 28874.88,
      basis: -0.9828712515,
      spread: 0.04,
      funding_rate: 0,
      open_interest: 44827.06,
      volume_24h: 128324.714,
      last_traded_at: 1654921612,
    },
    {
      market: "Crypto.com Exchange (Futures)",
      symbol: "BTCUSD-220729",
      index_id: "BTC",
      price: 29433,
      price_percentage_change_24h: -2.484842461,
      contract_type: "perpetual",
      index: 29045.54,
      basis: -0.525565944,
      spread: 0.05,
      funding_rate: 0,
      open_interest: 5734.68,
      volume_24h: 5268.507,
      last_traded_at: 1654921612,
    },
    {
      market: "Crypto.com Exchange (Futures)",
      symbol: "BTCUSD-220624",
      index_id: "BTC",
      price: 29313,
      price_percentage_change_24h: -2.567682106,
      contract_type: "perpetual",
      index: 28874.88,
      basis: -0.1560165975,
      spread: 0.02,
      funding_rate: 0,
      open_interest: 70307.41,
      volume_24h: 507495.969,
      last_traded_at: 1654921612,
    },
    {
      market: "BTCC Futures",
      symbol: "BTCUSDT",
      index_id: "BTC",
      price: 29343.04,
      price_percentage_change_24h: -2.503045867,
      contract_type: "perpetual",
      index: 29326.15,
      basis: -0.009001394193,
      spread: 0.02,
      funding_rate: 0,
      open_interest: 377855185.6,
      volume_24h: 599153531.6,
      last_traded_at: 1654922379,
    },
    {
      market: "Deribit",
      symbol: "BTC-PERPETUAL",
      index_id: "BTC",
      price: 29309.5,
      price_percentage_change_24h: -2.498295105,
      contract_type: "perpetual",
      index: 29301.11,
      basis: -0.02862553097,
      spread: 0.01,
      funding_rate: 0.000564,
      open_interest: 552185140,
      volume_24h: 503154798.5,
      last_traded_at: 1654922527,
    },
    {
      market: "Injective Pro (Futures)",
      symbol: "BTC/USDT PERP",
      index_id: "BTC",
      price: 29363.69,
      price_percentage_change_24h: -2.894935352,
      contract_type: "perpetual",
      index: 29329.25886,
      basis: -0.07134921738,
      spread: 0.06,
      funding_rate: 0.0033,
      open_interest: null,
      volume_24h: 2420656.549,
      last_traded_at: 1654922561,
    },
    {
      market: "BTCEX (Futures)",
      symbol: "BTC-30SEP22",
      index_id: "BTC",
      price: 29603.21,
      price_percentage_change_24h: -2.623671626,
      contract_type: "perpetual",
      index: 29325.3,
      basis: -0.8868550107,
      spread: 0.02,
      funding_rate: 0.01,
      open_interest: 328082004,
      volume_24h: 1019563256,
      last_traded_at: 1654922507,
    },
    {
      market: "ZB (Derivatives)",
      symbol: "BTC_QC",
      index_id: "BTC",
      price: 29366.73,
      price_percentage_change_24h: -1.895201875,
      contract_type: "perpetual",
      index: 195331.76,
      basis: -0.1057438654,
      spread: 0.02,
      funding_rate: 0.01,
      open_interest: 4665347.51,
      volume_24h: 28688307.43,
      last_traded_at: 1654922381,
    },
    {
      market: "BTCEX (Futures)",
      symbol: "BTC-24JUN22",
      index_id: "BTC",
      price: 29364.19,
      price_percentage_change_24h: -2.519811089,
      contract_type: "perpetual",
      index: 29325.5,
      basis: -0.08585825892,
      spread: 0.01,
      funding_rate: 0.01,
      open_interest: 328047800.2,
      volume_24h: 1009076347,
      last_traded_at: 1654922560,
    },
    {
      market: "BTCEX (Futures)",
      symbol: "BTC-USDT-PERPETUAL",
      index_id: "BTC",
      price: 29343.67,
      price_percentage_change_24h: -2.517799095,
      contract_type: "perpetual",
      index: 29325.3,
      basis: -0.01022902794,
      spread: 0.01,
      funding_rate: 0.01,
      open_interest: null,
      volume_24h: 5437590752,
      last_traded_at: 1654922507,
    },
    {
      market: "ZB (Derivatives)",
      symbol: "BTC_USDT",
      index_id: "BTC",
      price: 29343.97,
      price_percentage_change_24h: -1.835621124,
      contract_type: "perpetual",
      index: 29329.08,
      basis: -0.002182086975,
      spread: 0.01,
      funding_rate: 0.01,
      open_interest: 6304598.87,
      volume_24h: 1441239632,
      last_traded_at: 1654922381,
    },
    {
      market: "AscendEX  (BitMax) (Futures)",
      symbol: "BTC-PERP",
      index_id: "BTC",
      price: 29343.88,
      price_percentage_change_24h: -2.495762853,
      contract_type: "perpetual",
      index: 29331.43657,
      basis: -0.02918688966,
      spread: null,
      funding_rate: 0.0221934,
      open_interest: 3844200.01,
      volume_24h: 6623337.298,
      last_traded_at: 1654922295,
    },
  ];

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
    // {
    //   dataField: "basis",
    //   text: "Basis",
    //   sort: true,
    // },
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
    : products;

  useEffect(() => {
    const getFundingRate = async () => {
      try {
        const { data } = await axios.get(
          "https://fapi.coinglass.com/api/fundingRate/v2/home"
        );

        let mappedData = [];
        for (const stats of data.data) {
          const margins = stats.cMarginList.map(margin => ({
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
    setInterval(() => {
      getFundingRate();
    }, 6000);
  }, []);

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
            .map(({ market, symbol, funding_rate, exchangeLogo }, index) => (
              <tr key={index} className="font-weight-bold text-white">
                <td className="">
                  <img className="icon" src={exchangeLogo} />
                  {market}
                </td>
                <td className="">{symbol}</td>
                <td className="stats">{funding_rate}</td>
                {/* <td className="stats">{basis.toFixed(2)}%</td> */}
              </tr>
            ))}
        </tbody>
      </Table>
    </CardBody>
  );
};

export default BTCPerp;
