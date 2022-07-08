import React, { useState, useEffect, useRef } from "react";
import { Container, Modal } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import logo from "../../assets/images/logo-solana.png";

import IconText from "../../assets/images/story-board/icon-text.png";
import IconChart from "../../assets/images/story-board/icon-chart.png";
import IconShape from "../../assets/images/story-board/icon-shape.png";
import IconButton from "../../assets/images/story-board/icon-button.png";
import IconPicture from "../../assets/images/story-board/icon-picture.png";
import IconTooltip from "../../assets/images/story-board/icon-tooltip.png";

import SolanaGradient from "../../assets/images/story-board/solana-gradient.png";

import { IconAdd, IconLayers } from "../../components/Common/Icon";
import { Rnd } from "react-rnd";
import shortid from "shortid";
import {
  Text,
  Shape,
  Button,
  Image,
  Chart,
  Tooltip,
} from "../../components/StoryBoard";
import { SketchPicker } from "react-color";
import StoryBoardModal, { TickerModal } from "./components/StoryBoardModal";

const StoryBoardPage = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [canvas, setCanvas] = useState([]);
  const [selected, setSelected] = useState({});
  const lastSelected = useRef({});
  const [index, setIndex] = useState(0);
  const [showChartOptions, setShowChartOptions] = useState(false);
  const [showTickerModal, setShowTickerModal] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    document.body.classList.add("vertical-collpsed");
    document.body.classList.add("offset-off");

    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
      document.body.classList.remove("offset-off");
    };
  }, []);

  const onKeyPress = e => {
    if (e.key === "Delete") {
      setCanvas(c => c.filter(item => item.id != lastSelected.current.id));
    }

    if (e.key === "+") {
      setCanvas(c => {
        return c.map((itm, i) => {
          return itm.id == lastSelected.current.id
            ? { ...itm, index: itm.index + 1 }
            : { ...itm };
        });
      });
    }

    if (e.key === "-") {
      setCanvas(c => {
        return c.map((itm, i) => {
          return itm.id == lastSelected.current.id
            ? { ...itm, index: itm.index > 1 ? itm.index - 1 : itm.index }
            : { ...itm };
        });
      });
    }
  };

  const getProps = () =>
    canvas?.filter(item => item.id == selected.id)[0]?.props;

  const saveProp = (prop, value) => {
    setCanvas(c =>
      c.map(item =>
        item.id == selected.id
          ? { ...item, props: { ...item.props, [prop]: value } }
          : { ...item }
      )
    );
  };

  const renderMenu = () => {
    switch (selected.type) {
      case "shape":
        return (
          <div>
            <h3>Color</h3>
            <div className="sketch-picker-container">
              <SketchPicker
                color={getProps()?.background}
                onChange={e => {
                  setCanvas(c =>
                    c.map(item =>
                      item.id == selected.id
                        ? {
                            ...item,
                            props: { ...item.props, background: e.hex },
                          }
                        : { ...item }
                    )
                  );
                }}
              />
            </div>
            <h3>Image</h3>
            <div className="story-board-images">
              <div
                onClick={() =>
                  setCanvas(c =>
                    c.map(item =>
                      item.id == selected.id
                        ? { ...item, props: { ...item.props, img: "" } }
                        : { ...item }
                    )
                  )
                }
                className={`story-board-image empty ${
                  !getProps()?.img ? "active" : ""
                }`}
              >
                Empty
              </div>
              <div
                onClick={() =>
                  setCanvas(c =>
                    c.map(item =>
                      item.id == selected.id
                        ? {
                            ...item,
                            props: { ...item.props, img: SolanaGradient },
                          }
                        : { ...item }
                    )
                  )
                }
                className={`story-board-image ${
                  getProps()?.img == SolanaGradient ? "active" : ""
                }`}
              >
                <img src={SolanaGradient} alt="" />
              </div>
            </div>
            <div className="mt-3">
              <input className="w-100" type="file" name="image" />
            </div>
            <h3>Border radius</h3>
            <input
              onChange={e => {
                setCanvas(c =>
                  c.map(item =>
                    item.id == selected.id
                      ? {
                          ...item,
                          props: {
                            ...item.props,
                            borderRadius: e.target.value,
                          },
                        }
                      : { ...item }
                  )
                );
              }}
              value={getProps()?.borderRadius}
              min={0}
              max={1000}
              type="number"
            />
          </div>
        );
      case "text":
        return (
          <div>
            <h3>Color</h3>
            <div className="sketch-picker-container">
              <SketchPicker
                color={getProps()?.color}
                onChange={e => {
                  setCanvas(c =>
                    c.map(item =>
                      item.id == selected.id
                        ? { ...item, props: { ...item.props, color: e.hex } }
                        : { ...item }
                    )
                  );
                }}
              />
            </div>
            <h3>Font Size</h3>
            <input
              onChange={e => {
                setCanvas(c =>
                  c.map(item =>
                    item.id == selected.id
                      ? {
                          ...item,
                          props: { ...item.props, fontSize: e.target.value },
                        }
                      : { ...item }
                  )
                );
              }}
              value={getProps()?.fontSize}
              type="number"
            />
          </div>
        );
      default:
        <></>;
    }
  };

  const getIndex = () => {
    setIndex(c => c + 1);
    return index + 1;
  };

  const onAddText = () => {
    setCanvas(c => [
      ...c,
      {
        type: "text",
        id: shortid.generate(),
        index: getIndex(),
        x: 0,
        y: 0,
        w: 130,
        component: Text,
        minWidth: 10,
        minHeight: 10,
        props: {
          color: "#ffffff",
          fontSize: 32,
        },
      },
    ]);
  };

  const onAddShape = () => {
    setCanvas(c => [
      ...c,
      {
        type: "shape",
        id: shortid.generate(),
        index: getIndex(),
        x: 0,
        y: 0,
        w: 300,
        h: 200,
        component: Shape,
        minWidth: 30,
        minHeight: 30,
        props: {
          background: "#1D202D",
          borderRadius: 20,
        },
      },
    ]);
  };

  const onAddButton = () => {
    setCanvas(c => [
      ...c,
      {
        type: "button",
        id: shortid.generate(),
        index: getIndex(),
        x: 0,
        y: 0,
        w: 120,
        h: 80,
        component: Button,
        minWidth: 60,
        minHeight: 80,
      },
    ]);
  };

  const onAddImage = () => {
    setCanvas(c => [
      ...c,
      {
        type: "image",
        id: shortid.generate(),
        index: getIndex(),
        x: 0,
        y: 0,
        w: 300,
        component: Image,
        minWidth: 60,
        minHeight: 80,
        props: {
          src: logo,
        },
      },
    ]);
  };

  const onAddChart = () => {
    setCanvas(c => [
      ...c,
      {
        type: "chart",
        id: shortid.generate(),
        index: getIndex(),
        x: 0,
        y: 0,
        w: 600,
        h: 370,
        component: Chart,
        minWidth: 300,
        minHeight: 200,
      },
    ]);
  };

  const onAddTooltip = () => {
    setCanvas(c => [
      ...c,
      {
        type: "tooltip",
        id: shortid.generate(),
        index: getIndex(),
        x: 0,
        y: 0,
        w: 28,
        h: 28,
        component: Tooltip,
        minWidth: 28,
        minHeight: 28,
        disableResize: true,
        props: {
          title: "2017 Whitepaper Released",
          description: "Insert text here",
        },
      },
    ]);
  };

  const renderComponent = (Component, props) => {
    return <Component {...props} />;
  };

  const handleChartTypeSelection = type => {
    console.log(type);
    onAddChart();
    setShowChartOptions(false);
  };

  return (
    <div className="page-content story-page">
      <Container className="story" fluid={true}>
        <Breadcrumbs title="Dashboards" breadcrumbItem="Story Board" />

        <div className="story-board">
          <div
            className={`${selected.type ? "active" : ""} story-board-sidebar`}
          >
            <div className="story-board-sidebar-title">
              {selected.type}
              <div onClick={() => setSelected({})}>
                <IconAdd />
              </div>
            </div>
            <div className="story-board-sidebar-inner">{renderMenu()}</div>
          </div>
          <div className="story-canvas">
            <div className="description">
              <h1>
                The Story of <img src="/coin_icons/solana-logo.svg" alt="" />
              </h1>
              <p>
                Solana is a decentralized blockchain built to enable scalable,
                user-friendly apps for the world.
              </p>
            </div>
            <div className="story-canvas-editor">
              <TickerModal
                open={showTickerModal}
                onClose={() => setShowTickerModal(false)}
                onBack={() => {
                  setShowTickerModal(false);
                  setShowChartOptions(true);
                }}
              />
              {showChartOptions ? (
                <StoryBoardModal onSelectChart={handleChartTypeSelection} />
              ) : (
                canvas.map((item, i) => (
                  <Rnd
                    key={`rg-${i}`}
                    style={{ zIndex: item.index }}
                    default={{
                      x: item.x,
                      y: item.y,
                      width: item.w,
                      height: item.h,
                    }}
                    onClick={() => {
                      lastSelected.current = item;
                      setShowTickerModal(true);
                      setSelected(item);
                    }}
                    minWidth={item.minWidth}
                    minHeight={item.minHeight}
                    bounds="parent"
                    enableResizing={!item.disableResize}
                  >
                    {renderComponent(item.component, item.props)}
                  </Rnd>
                ))
              )}
            </div>
            <div className="story-canvas-footer">
              <div className="inner">
                <div className="item">
                  <p className="flex-1">
                    Transactions <br /> per Second
                  </p>
                  <p className="item-count">2,105</p>
                  <div className="line"></div>
                </div>
                <div className="item">
                  <p className="flex-1">
                    Total <br /> Transactions
                  </p>
                  <p className="item-count">78,293,983,661</p>
                  <div className="line"></div>
                </div>
                <div className="item">
                  <p className="flex-1">
                    Avg. cost <br /> per transaction
                  </p>
                  <p className="item-count">$0.00025</p>
                  <div className="line"></div>
                </div>
                <div className="item">
                  <p className="flex-1">
                    Validator <br /> nodes
                  </p>
                  <p className="item-count">1,777</p>
                </div>
              </div>
            </div>
          </div>

          <div className="story-canvas-actions">
            <div className="d-flex w-100 justify-content-between">
              <div className="story-canvas-actions-btn">
                <IconLayers />
              </div>
              <div
                onClick={() => setIsActiveMenu(!isActiveMenu)}
                className={`story-canvas-actions-btn ${
                  isActiveMenu ? "active" : ""
                }`}
              >
                <IconAdd />
              </div>
            </div>
            <div
              className={`story-canvas-actions-menu ${
                isActiveMenu ? "active" : ""
              }`}
            >
              <div onClick={onAddText}>
                <img src={IconText} alt="Icon text" />
                <span>Text</span>
              </div>
              <div onClick={() => setShowChartOptions(!showChartOptions)}>
                <img src={IconChart} alt="Icon chart" />
                <span>Chart</span>
              </div>
              <div onClick={onAddShape}>
                <img src={IconShape} alt="Icon shape" />
                <span>Shape</span>
              </div>
              <div onClick={onAddButton}>
                <img src={IconButton} alt="Icon button" />
                <span>Button</span>
              </div>
              <div onClick={onAddImage}>
                <img
                  src={IconPicture}
                  className="story-canvas-actions-small"
                  alt="Icon picture"
                />
                <span>Picture</span>
              </div>
              <div onClick={onAddTooltip}>
                <img
                  src={IconTooltip}
                  className="story-canvas-actions-tiny"
                  alt="Icon tooltip"
                />
                <span>Tooltip</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StoryBoardPage;
