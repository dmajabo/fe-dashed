import React, { useState } from "react";
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
import {Text, Shape, Button, Image} from "../../components/StoryBoard"

const StoryBoardPage = () => {

  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const [canvas, setCanvas] = useState([])

  const onAddText = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(), 
      x: 0, 
      y: 0,
      w: 130,
      component: <Text/>,
      minWidth: 50,
      minHeight: 60
    }])
  }

  const onAddShape = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(), 
      x: 0, 
      y: 0,
      w: 300,
      h: 200,
      component: <Shape/>,
      minWidth: 30,
      minHeight: 30
    }])
  }

  const onAddButton = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(), 
      x: 0, 
      y: 0,
      w: 120,
      h: 80,
      component: <Button/>,
      minWidth: 60,
      minHeight: 80
    }])
  }

  const onAddImage = () => {
    setCanvas(c => [...c, {
      id: shortid.generate(), 
      x: 0, 
      y: 0,
      w: 300,
      component: <Image src={logo}/>,
      minWidth: 60,
      minHeight: 80
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
                  default={{
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h,
                  }}
                  minWidth={item.minWidth}
                  minHeight={item.minHeight}
                  bounds="parent"
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
              <div>
                <img src={IconChart} alt="Icon chart" />
                <span>Chart</span>
              </div>
              <div onClick={onAddShape}>
                <img src={IconShape} alt="Icon shape" />
                <span>Shape</span>
              </div>
              <div  onClick={onAddButton}>
                <img src={IconButton} alt="Icon button" />
                <span>Button</span>
              </div>
              <div onClick={onAddImage}>
                <img src={IconPicture} className="story-canvas-actions-small" alt="Icon picture" />
                <span>Picture</span>
              </div>
              <div>
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
