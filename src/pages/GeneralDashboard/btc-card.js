import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { mockCandleData } from "../../helpers/mock/price_candle_data";
import ChartRangeNavigation from "components/Common/ChartRangeNavigation";
import { axiosCC } from "../../helpers/cc_helper";
import { axiosCG } from "../../helpers/cg_helper";
import useWebSocket, { ReadyState } from "react-use-websocket";
import moment from "moment";
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
  // const [series, setSeries] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [changePercentage, setChangePercentage] = React.useState(0);
  const [spark, setSpark] = React.useState([
    12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14,
  ]);
  const [currentRange, setCurrentRange] = React.useState(range[3].id);
  const [currentRangeHistory, setcurrentRangeHistory] = useState([]);
  const [candles, setcandles] = useState([]);
  const [socketCandles, setsocketCandles] = useState([]);

  const socketUrl = `wss://streamer.cryptocompare.com/v2`;

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    queryParams: {
      api_key: process.env.REACT_APP_CRYPTO_COMPARE_API_KEY,
    },
    onOpen: () => {
      sendJsonMessage({
        action: "SubAdd",
        subs: ["2~Coinbase~BTC~USD", "24~CCCAGG~BTC~USD~m"],
        // subs: ["24~CCCAGG~BTC~USD"],
      });
    },
    onMessage: message => {
      // console.log("new message");
      const data = JSON.parse(message.data);
      if (data.TYPE == "2") {
        setPrice(data.PRICE);
      } else if (data.TYPE == "24") {
        if (
          series &&
          moment().isAfter(series[0].data[series[0].data.length - 1].x)
        ) {
          const x = new Date(data.TS * 1000);
          const y = [data.OPEN, data.HIGH, data.LOW, data.CLOSE];
          setsocketCandles([
            ...socketCandles,
            {
              x,
              y,
            },
          ]);
        }
      }
    },
  });

  // useEffect(() => {
  //   return () => {
  //     console.log('SubRemove')
  //     sendJsonMessage({
  //       action: "SubRemove",
  //       subs: ["24~CCCAGG~BTC~USD"],
  //     });
  //   };
  // }, []);

  const fetchBTCMarketPrice = async () => {
    try {
      const request = await axiosCG.get(
        "coins/bitcoin?market_data=true&sparkline=true"
      );
      const data = request.data;
      setChangePercentage(
        data.market_data.market_cap_change_percentage_24h.toFixed(2)
      );
      setSpark([...data.market_data.sparkline_7d.price]);

      // const priceReqest = await axiosCC.get(`data/price?fsym=BTC&tsyms=USD`);

      // const priceReqestData = await priceReqest.data;
      // setPrice(priceReqestData.USD);
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

      // setSeries([{ data: candles }]);
      setcandles(candles);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchCandles();
    fetchBTCMarketPrice();

    // const interval = setInterval(() => {
    //   fetchCandles();
    //   fetchBTCMarketPrice();
    // }, 2000);

    // return () => {
    //   clearInterval(interval);
    // };
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

  const valid_candles =
    currentRange == "5m"
      ? socketCandles.filter(({ x }) => moment(x).get("minutes") % 5 == 0)
      : [];
  const series = [
    {
      data: [...candles, ...valid_candles],
    },
  ];
  return (
    <Card>
      {/* <span>The WebSocket is currently {connectionStatus}</span>
      {lastJsonMessage ? (
        <span>Last message: {JSON.stringify(lastJsonMessage)}</span>
      ) : null} */}
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
