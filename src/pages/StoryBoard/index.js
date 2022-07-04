import React, { useState, useEffect, useRef } from "react";
import {
  Container,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import logo from "../../assets/images/logo-solana.png";

import IconText from "../../assets/images/story-board/icon-text.png";
import IconChart from "../../assets/images/story-board/icon-chart.png";
import IconShape from "../../assets/images/story-board/icon-shape.png";
import IconButton from "../../assets/images/story-board/icon-button.png";
import IconPicture from "../../assets/images/story-board/icon-picture.png";
import IconTooltip from "../../assets/images/story-board/icon-tooltip.png";

import { IconAdd, IconLayers } from "../../components/Common/Icon"
import { Rnd } from 'react-rnd'
import shortid from "shortid"
import { Text, Shape, Button, Image, Chart, Tooltip } from "../../components/StoryBoard"

const StoryBoardPage = () => {

  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const [canvas, setCanvas] = useState([])
  const lastSelected = useRef({})
  const [index, setIndex] = useState(0)

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    document.body.classList.add("vertical-collpsed");

    return () => document.removeEventListener("keydown", onKeyPress, false);
  }, []);

  const onKeyPress = (e) => {
    if (e.key === "Delete") {
      setCanvas(c => c.filter((item) => (item.id != lastSelected.current.id)))
    }

    if (e.key === "+") {
      setCanvas(c => {
        return c.map((itm, i) => {
          return itm.id == lastSelected.current.id ?
            { ...itm, index: itm.index + 1 }
            : { ...itm }
        })
      })
    }

    if (e.key === "-") {
      setCanvas(c => {
        return c.map((itm, i) => {
          return itm.id == lastSelected.current.id ?
            { ...itm, index: itm.index > 1 ? itm.index - 1 : itm.index }
            : { ...itm }
        })
      })
    }
  }

  const getIndex = () => {
    setIndex(c => c + 1)
    return index + 1
  }

  const onAddText = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 130,
      component: <Text />,
      minWidth: 50,
      minHeight: 60
    }])
  }

  const onAddShape = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 300,
      h: 200,
      component: <Shape />,
      minWidth: 30,
      minHeight: 30
    }])
  }

  const onAddButton = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 120,
      h: 80,
      component: <Button />,
      minWidth: 60,
      minHeight: 80
    }])
  }

  const onAddImage = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 300,
      component: <Image src={logo} />,
      minWidth: 60,
      minHeight: 80
    }])
  }

  const onAddChart = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 600,
      h: 370,
      component: <Chart />,
      minWidth: 300,
      minHeight: 200
    }])
  }

  const onAddTooltip = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 28,
      h: 28,
      component: <Tooltip title="2017 Whitepaper Released" description="Insert text here" />,
      minWidth: 28,
      minHeight: 28,
      disableResize: true
    }])
  }

  return (
    <div className="page-content">
      <Container
        className="story"
        fluid={true}
        style={{ paddingBottom: "64px" }}
      >
        <Breadcrumbs title="Dashboards" breadcrumbItem="Story Board" />

        <div className="story-board">
          <div className="story-canvas">
            <div className="story-canvas-editor">
              {canvas.map((item, i) => (
                <Rnd
                  key={`rg-${i}`}
                  style={{ zIndex: item.index }}
                  default={{
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h,
                  }}
                  onClick={() => lastSelected.current = item}
                  minWidth={item.minWidth}
                  minHeight={item.minHeight}
                  bounds="parent"
                  enableResizing={!item.disableResize}
                >
                  {item.component}
                </Rnd>
              ))}
            </div>
          </div>

          <div className="story-canvas-actions">
            <div className="story-canvas-actions-btn"><IconLayers /></div>
            <div onClick={() => setIsActiveMenu(!isActiveMenu)} className={`story-canvas-actions-btn ${isActiveMenu ? 'active' : ''}`}><IconAdd /></div>
            <div className={`story-canvas-actions-menu ${isActiveMenu ? 'active' : ''}`}>
              <div onClick={onAddText}>
                <img src={IconText} alt="Icon text" />
                <span>Text</span>
              </div>
              <div onClick={onAddChart}>
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
                <img src={IconPicture} className="story-canvas-actions-small" alt="Icon picture" />
                <span>Picture</span>
              </div>
              <div onClick={onAddTooltip}>
                <img src={IconTooltip} className="story-canvas-actions-tiny" alt="Icon tooltip" />
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
