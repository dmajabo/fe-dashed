import React from "react";
import { CardBody, CardTitle, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { mockCandleData } from "../../helpers/mock/price_candle_data";
import ChartRangeNavigation from "components/Common/ChartRangeNavigation";

const options1 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#f1b44c"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
};

const range = [
  { id: "5m", label: "5 min" },
  { id: "15m", label: "15 min" },
  { id: "30m", label: "30 min" },
  { id: "1h", label: "1 hour" },
  { id: "4h", label: "4 hours" },
  { id: "1d", label: "day" },
  { id: "1w", label: "week" },
];

const BTCCard = () => {
  const [series, setSeries] = React.useState(mockCandleData);
  const [price, setPrice] = React.useState(0);
  const [changePercentage, setChangePercentage] = React.useState(0);
  const [spark, setSpark] = React.useState([
    12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14,
  ]);
  const [currentRange, setCurrentRange] = React.useState(range[2].days);

  const fetchBTCMarketPrice = async () => {
    try {
      const request = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true&sparkline=true"
      );
      const data = await request.json();
      setChangePercentage(data.market_data.market_cap_change_percentage_24h);
      setSpark([...data.market_data.sparkline_7d.price]);

      const priceReqest = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`
      );

      const priceReqestData = await priceReqest.json();
      setPrice(priceReqestData.USD);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCandles = async () => {
    try {
      let route = "histominute";
      let limit = 30;
      let aggregate = 1;

      switch (currentRange) {
        case "5m":
          limit = 5;
          break;
        case "15m":
          limit = 15;
          break;
        case "1h":
          aggregate = 2;
          break;
        case "4h":
          aggregate = 8;
          break;
        case "1d":
          route = "histohour";
          limit = 24;
          break;
        case "1w":
          route = "histohour";
          aggregate = 6;
          break;
      }

      const request = await fetch(
        `https://min-api.cryptocompare.com/data/v2/${route}?fsym=BTC&tsym=USD&limit=${limit}&aggregate=${aggregate}&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`
      );
      const data = await request.json();

      const candles = data.Data.Data.map(
        ({ time, high, low, open: openValue, close: closeValue }) => ({
          x: new Date(time * 1000),
          y: [openValue, high, low, closeValue],
        })
      );

      setSeries([{ data: candles }]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchCandles();
    fetchBTCMarketPrice();

    const interval = setInterval(() => {
      fetchCandles();
      fetchBTCMarketPrice();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentRange]);

  const onRangeChange = ({ id }) => {
    setCurrentRange(id);
  };

  const options = {
    chart: { toolbar: !1, zoom: { enabled: !0 } },
    plotOptions: {
      candlestick: { colors: { upward: "#AFFEA2", downward: "#F0616D" } },
    },
    xaxis: { type: "datetime" },
    yaxis: { tooltip: { enabled: !0 } },
  };

  return (
    <CardBody>
      <CardTitle className="mb-4">BTC</CardTitle>
      <Row>
        <Col xl="5" sm="4">
          <div className="d-flex">
            <div className="avatar-sm me-3">
              <span className="avatar-title rounded-circle bg-soft bg-warning text-warning font-size-22">
                <i className="mdi mdi-bitcoin"></i>
              </span>
            </div>

            <div className="flex-1">
              <p className="text-muted mb-2">Bitcoin</p>
              <h6>{price} USD</h6>
            </div>
          </div>
        </Col>

        <Col xl="3" sm="4">
          <div className="mt-4 mt-sm-0">
            <p className="text-muted mb-2">Last 24 hrs</p>
            <h6>
              {changePercentage} %{" "}
              {changePercentage < 0 ? (
                <i className="mdi mdi-arrow-down text-danger"></i>
              ) : (
                <i className="mdi mdi-arrow-up text-success"></i>
              )}
            </h6>
          </div>
        </Col>

        <Col xl="4" sm="4">
          <div className="mt-4 mt-sm-0">
            <ReactApexChart
              options={options1}
              series={[{ name: "BTC", data: [...spark] }]}
              type="area"
              height={40}
            />
          </div>
        </Col>
      </Row>
      <div className=""></div>
      <div className="d-flex justify-content-end">
        <ChartRangeNavigation range={range} onChange={onRangeChange} />
      </div>
      <div className="" style={{ height: "calc(100% - 120px)" }}>
        <ReactApexChart
          series={series}
          options={options}
          type="candlestick"
          height={"100%"}
          className="apex-charts"
        />
      </div>
    </CardBody>
  );
};

export default BTCCard;
