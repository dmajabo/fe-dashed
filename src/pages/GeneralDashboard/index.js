import React from "react";
import { Container } from "reactstrap";

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import Candlestick from "pages/AllCharts/echart/candlestickchart";
import ReactApexChart from "react-apexcharts";
import Scatter from "pages/AllCharts/echart/scatterchart";

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

const mockCandleData = [
  {
    data: [
      { x: new Date(15387786e5), y: [6629.81, 6650.5, 6623.04, 6633.33] },
      { x: new Date(15387804e5), y: [6632.01, 6643.59, 6620, 6630.11] },
      {
        x: new Date(15387822e5),
        y: [6630.71, 6648.95, 6623.34, 6635.65],
      },
      { x: new Date(1538784e6), y: [6635.65, 6651, 6629.67, 6638.24] },
      { x: new Date(15387858e5), y: [6638.24, 6640, 6620, 6624.47] },
      {
        x: new Date(15387876e5),
        y: [6624.53, 6636.03, 6621.68, 6624.31],
      },
      { x: new Date(15387894e5), y: [6624.61, 6632.2, 6617, 6626.02] },
      { x: new Date(15387912e5), y: [6627, 6627.62, 6584.22, 6603.02] },
      { x: new Date(1538793e6), y: [6605, 6608.03, 6598.95, 6604.01] },
      { x: new Date(15387948e5), y: [6604.5, 6614.4, 6602.26, 6608.02] },
      {
        x: new Date(15387966e5),
        y: [6608.02, 6610.68, 6601.99, 6608.91],
      },
      { x: new Date(15387984e5), y: [6608.91, 6618.99, 6608.01, 6612] },
      { x: new Date(15388002e5), y: [6612, 6615.13, 6605.09, 6612] },
      { x: new Date(1538802e6), y: [6612, 6624.12, 6608.43, 6622.95] },
      { x: new Date(15388038e5), y: [6623.91, 6623.91, 6615, 6615.67] },
      { x: new Date(15388056e5), y: [6618.69, 6618.74, 6610, 6610.4] },
      { x: new Date(15388074e5), y: [6611, 6622.78, 6610.4, 6614.9] },
      { x: new Date(15388092e5), y: [6614.9, 6626.2, 6613.33, 6623.45] },
      { x: new Date(1538811e6), y: [6623.48, 6627, 6618.38, 6620.35] },
      {
        x: new Date(15388128e5),
        y: [6619.43, 6620.35, 6610.05, 6615.53],
      },
      { x: new Date(15388146e5), y: [6615.53, 6617.93, 6610, 6615.19] },
      { x: new Date(15388164e5), y: [6615.19, 6621.6, 6608.2, 6620] },
      { x: new Date(15388182e5), y: [6619.54, 6625.17, 6614.15, 6620] },
      { x: new Date(153882e7), y: [6620.33, 6634.15, 6617.24, 6624.61] },
      { x: new Date(15388218e5), y: [6625.95, 6626, 6611.66, 6617.58] },
      { x: new Date(15388236e5), y: [6619, 6625.97, 6595.27, 6598.86] },
      { x: new Date(15388254e5), y: [6598.86, 6598.88, 6570, 6587.16] },
      { x: new Date(15388272e5), y: [6588.86, 6600, 6580, 6593.4] },
      { x: new Date(1538829e6), y: [6593.99, 6598.89, 6585, 6587.81] },
      { x: new Date(15388308e5), y: [6587.81, 6592.73, 6567.14, 6578] },
      { x: new Date(15388326e5), y: [6578.35, 6581.72, 6567.39, 6579] },
      {
        x: new Date(15388344e5),
        y: [6579.38, 6580.92, 6566.77, 6575.96],
      },
      { x: new Date(15388362e5), y: [6575.96, 6589, 6571.77, 6588.92] },
      { x: new Date(1538838e6), y: [6588.92, 6594, 6577.55, 6589.22] },
      { x: new Date(15388398e5), y: [6589.3, 6598.89, 6589.1, 6596.08] },
      { x: new Date(15388416e5), y: [6597.5, 6600, 6588.39, 6596.25] },
      { x: new Date(15388434e5), y: [6598.03, 6600, 6588.73, 6595.97] },
      { x: new Date(15388452e5), y: [6595.97, 6602.01, 6588.17, 6602] },
      { x: new Date(1538847e6), y: [6602, 6607, 6596.51, 6599.95] },
      {
        x: new Date(15388488e5),
        y: [6600.63, 6601.21, 6590.39, 6591.02],
      },
      { x: new Date(15388506e5), y: [6591.02, 6603.08, 6591, 6591] },
      { x: new Date(15388524e5), y: [6591, 6601.32, 6585, 6592] },
      { x: new Date(15388542e5), y: [6593.13, 6596.01, 6590, 6593.34] },
      { x: new Date(1538856e6), y: [6593.34, 6604.76, 6582.63, 6593.86] },
      {
        x: new Date(15388578e5),
        y: [6593.86, 6604.28, 6586.57, 6600.01],
      },
      {
        x: new Date(15388596e5),
        y: [6601.81, 6603.21, 6592.78, 6596.25],
      },
      { x: new Date(15388614e5), y: [6596.25, 6604.2, 6590, 6602.99] },
      { x: new Date(15388632e5), y: [6602.99, 6606, 6584.99, 6587.81] },
      { x: new Date(1538865e6), y: [6587.81, 6595, 6583.27, 6591.96] },
      { x: new Date(15388668e5), y: [6591.97, 6596.07, 6585, 6588.39] },
      { x: new Date(15388686e5), y: [6587.6, 6598.21, 6587.6, 6594.27] },
      { x: new Date(15388704e5), y: [6596.44, 6601, 6590, 6596.55] },
      { x: new Date(15388722e5), y: [6598.91, 6605, 6596.61, 6600.02] },
      { x: new Date(1538874e6), y: [6600.55, 6605, 6589.14, 6593.01] },
      { x: new Date(15388758e5), y: [6593.15, 6605, 6592, 6603.06] },
      { x: new Date(15388776e5), y: [6603.07, 6604.5, 6599.09, 6603.89] },
      { x: new Date(15388794e5), y: [6604.44, 6604.44, 6600, 6603.5] },
      { x: new Date(15388812e5), y: [6603.5, 6603.99, 6597.5, 6603.86] },
      { x: new Date(1538883e6), y: [6603.85, 6605, 6600, 6604.07] },
      { x: new Date(15388848e5), y: [6604.98, 6606, 6604.07, 6606] },
    ],
  },
];

const GeneralDashboard = () => {
  document.title = "General Dashboard | Dashed by Lacuna";

  const [series, setSeries] = React.useState(mockCandleData);
  const [price, setPrice] = React.useState(0);
  const [changePercentage, setChangePercentage] = React.useState(0);
  const [spark, setSpark] = React.useState([
    12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14,
  ]);

  const options = {
    chart: { toolbar: !1, zoom: { enabled: !0 } },
    plotOptions: {
      candlestick: { colors: { upward: "#34c38f", downward: "#f46a6a" } },
    },
    xaxis: { type: "datetime" },
    yaxis: { tooltip: { enabled: !0 } },
  };

  const fetchBTCMarketPrice = async () => {
    try {
      const request = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true&sparkline=true"
      );
      const data = await request.json();
      setChangePercentage(data.market_data.market_cap_change_percentage_24h);
      setSpark([...data.market_data.sparkline_7d.price]);

      console.log(data);

      const priceReqest = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=d256b0177a97a2e046c62e0d329eb0fbc3cbbf2030ea6af0878e2c21b36aed54"
      );

      const priceReqestData = await priceReqest.json();
      setPrice(priceReqestData.USD);
    } catch (error) {}
  };

  const fetchCandles = async () => {
    try {
      const request = await fetch(
        "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=50&api_key=d256b0177a97a2e046c62e0d329eb0fbc3cbbf2030ea6af0878e2c21b36aed54"
      );
      const data = await request.json();

      // { x: new Date(15387786e5), y: [6629.81, 6650.5, 6623.04, 6633.33] },

      const candles = data.Data.Data.map(ohlc => ({
        x: ohlc.time,
        y: [ohlc.open, ohlc.high, ohlc.low, ohlc.close],
      }));

      console.log("candles", candles);

      setSeries([{ data: [...candles] }]);
    } catch (error) {}
  };

  React.useState(() => {
    fetchCandles();
    fetchBTCMarketPrice();

    const interval = setInterval(() => {
      fetchBTCMarketPrice();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dashboards" breadcrumbItem="General" />

          <Row>
            <Col lg={6}>
              <Card>
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
                  <ReactApexChart
                    series={series}
                    options={options}
                    type="candlestick"
                    height={310}
                    className="apex-charts"
                  />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Avg Funding Rates Over Time
                    <Scatter />
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Best BTC Perpetual Funding Rates
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Bitcoin Monthly Performance (2020 - 2021) (stretch goal)
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GeneralDashboard;