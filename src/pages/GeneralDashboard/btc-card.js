import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { mockCandleData } from "../../helpers/mock/price_candle_data";
import ChartRangeNavigation from "components/Common/ChartRangeNavigation";
import { axiosCC } from "../../helpers/cc_helper";
import "./btc-card.scss";

const options1 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 1, colors: ["#C5C5C5"] },
  colors: ["#494949"],
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
  tooltip: { enabled: false },
};

const range = [
  { id: "5m", label: "5m" },
  { id: "15m", label: "15m" },
  { id: "30m", label: "30m" },
  { id: "1h", label: "1h" },
  { id: "4h", label: "4h" },
  { id: "1d", label: "D" },
  { id: "1w", label: "W" },
];

const BTCCard = () => {
  const [series, setSeries] = React.useState(mockCandleData);
  const [price, setPrice] = React.useState(0);
  const [changePercentage, setChangePercentage] = React.useState(0);
  const [spark, setSpark] = React.useState([
    12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14,
  ]);
  const [currentRange, setCurrentRange] = React.useState(range[3].id);

  const fetchBTCMarketPrice = async () => {
    try {
      const request = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true&sparkline=true"
      );
      const data = await request.json();
      setChangePercentage(
        data.market_data.market_cap_change_percentage_24h.toFixed(2)
      );
      setSpark([...data.market_data.sparkline_7d.price]);

      const priceReqest = await axiosCC.get(`data/price?fsym=BTC&tsyms=USD`);

      const priceReqestData = await priceReqest.data;
      setPrice(priceReqestData.USD);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCandles = async () => {
    try {
      let route = "histominute";
      let aggregate = 1;

      switch (currentRange) {
        case "5m":
          aggregate = 5;
          break;
        case "15m":
          aggregate = 15;
          break;
        case "30m":
          aggregate = 30;
          break;
        case "1h":
          route = "histohour";
          break;
        case "4h":
          aggregate = 4;
          route = "histohour";
          break;
        case "1d":
          route = "histoday";
          break;
        case "1w":
          route = "histoday";
          aggregate = 7;
          break;
        default:
          route = "histominute";
          aggregate = 1;
          break;
      }

      const request = await axiosCC.get(
        `data/v2/${route}?fsym=BTC&tsym=USD&limit=30&aggregate=${aggregate}`
      );

      const candles = request.data.Data.Data.map(
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
      candlestick: { colors: { upward: "#A2FFA1", downward: "#FF4869" } },
    },
    xaxis: {
      type: "datetime",
      labels: {
        showDuplicates: true,
      },
      axisBorder: {
        color: "#333333",
      },
      axisTicks: {
        color: "#333333",
      },
    },
    yaxis: {
      tooltip: { enabled: true },
      opposite: true,
      decimalsInFloat: 0,
    },
    grid: {
      padding: {
        top: 0,
        right: 24,
        bottom: 0,
        left: 0,
      },
    },
  };

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-3">
          <img
            src={`/coin_icons/BTC.png`}
            width={32}
            height={32}
            className="me-2"
          />
          Bitcoin (BTC)
        </CardTitle>
        <Row>
          <Col className="btc-data">
            <h5 className="btc-price">${price.toLocaleString()}</h5>
            <h6
              className={`btc-change d-inline-flex ${
                changePercentage >= 0 ? "price-up" : "price-down"
              }`}
              style={
                {
                  // color: changePercentage >= 0 ? "#A2FFA1" : "#FF4869",
                }
              }
            >
              {changePercentage}%{" "}
              {changePercentage < 0 ? (
                <i className="mdi mdi-arrow-down"></i>
              ) : (
                <i className="mdi mdi-arrow-up"></i>
              )}
            </h6>

            <div className="btc-spark">
              <p className="text-muted">Last 7 days</p>
              <div className="spark-chart">
                <ReactApexChart
                  options={options1}
                  series={[{ name: "BTC", data: [...spark] }]}
                  type="area"
                  height={20}
                />
              </div>
            </div>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <ChartRangeNavigation
              range={range}
              onChange={onRangeChange}
              btcRange
            />
          </Col>
        </Row>
        <div className=""></div>
        {/* <div className="d-flex justify-content-end"></div> */}
        <div className="" style={{ height: "calc(100% - 60px)" }}>
          <ReactApexChart
            series={series}
            options={options}
            type="candlestick"
            height={"100%"}
            className="apex-charts"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default BTCCard;
