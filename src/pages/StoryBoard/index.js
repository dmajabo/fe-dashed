import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import logo from "../../assets/images/logo-solana.png";

import IconText from "../../assets/images/story-board/icon-text.png";
import IconChart from "../../assets/images/story-board/icon-chart.png";
import IconShape from "../../assets/images/story-board/icon-shape.png";
import IconButton from "../../assets/images/story-board/icon-button.png";
import IconPicture from "../../assets/images/story-board/icon-picture.png";
import IconTooltip from "../../assets/images/story-board/icon-tooltip.png";

import SolanaGradient from "../../assets/images/story-board/solana-gradient.png";

import { IconAdd, IconLayers, IconCenter, IconLeft, IconRight } from "../../components/Common/Icon"
import { Rnd } from 'react-rnd'
import shortid from "shortid"
import { Text, Shape, Button, Image, Chart, Tooltip } from "../../components/StoryBoard"
import { SketchPicker } from 'react-color'
import { data } from "./sample"

const StoryBoardPage = () => {

  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const [canvas, setCanvas] = useState([])
  const [selected, setSelected] = useState({})
  const lastSelected = useRef({})
  const [index, setIndex] = useState(0)
  const [openTooltipPosition, setOpenTooltipPosition] = useState(false)

  useEffect(() => {
    const editor = document.querySelector('.story-canvas-editor')
    editor.addEventListener("keydown", onKeyPress, false);
    document.body.classList.add("vertical-collpsed");
    document.body.classList.add("offset-off");

    return () => {
      editor.removeEventListener("keydown", onKeyPress, false);
      document.body.classList.remove("offset-off");
    }
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

  const getProps = () => canvas?.filter((item) => item.id == selected.id)[0]?.props

  const saveProp = (prop, value) => {
    setCanvas(c => c.map((item) => item.id == selected.id ? ({ ...item, props: { ...item.props, [prop]: value } }) : ({ ...item })))
  }

  const renderMenu = () => {
    switch (selected.type) {
      case 'shape':
        return <div>
          <h3>Color</h3>
          <div className="sketch-picker-container">
            <SketchPicker
              color={
                getProps()?.background
              }
              onChange={e => {
                saveProp('background', e.hex)
              }}
            />
          </div>
          <h3>Image</h3>
          <div className="story-board-images">
            <div
              onClick={() => saveProp('img', '')}
              className={`story-board-image empty ${!getProps()?.img ? 'active' : ''}`}>Empty</div>
            <div
              onClick={() => saveProp('img', SolanaGradient)}
              className={`story-board-image ${getProps()?.img == SolanaGradient ? 'active' : ''}`}><img src={SolanaGradient} alt="" />
            </div>
          </div>
          <div className="mt-3">
            <input className="story-board-sidebar-input w-100" type="file" name="image" />
          </div>
          <h3>Background URL</h3>
          <input
            onChange={e => {
              saveProp('src', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.src}
            type="text"
          />
          <h3>Border radius</h3>
          <div className="story-board-sidebar-flex-row">
            <div>
              <input
                onChange={e => {
                  saveProp('borderTopLeftRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderTopLeftRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderTopRightRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderTopRightRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderBottomLeftRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderBottomLeftRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderBottomRightRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderBottomRightRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
          </div>
        </div>
      case 'text':
        return <div>
          <h3>Font Size</h3>
          <input
            onChange={e => {
              saveProp('fontSize', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.fontSize}
            type="number"
          />
          <Container fluid className="p-0">
            <Row>
              <Col md={5}>
                <h3>Text Style</h3>
                <div className="story-board-font-style">
                  <div
                    onClick={() => saveProp('fontWeight', getProps()?.fontWeight ? '' : 'bold')}
                    className={`story-board-font-style-bold ${getProps()?.fontWeight ? 'active' : ''}`}
                  >
                    B
                  </div>
                  <div
                    onClick={() => saveProp('fontStyle', getProps()?.fontStyle ? '' : 'italic')}
                    className={`story-board-font-style-bold ${getProps()?.fontStyle ? 'active' : ''}`}
                  >
                    i
                  </div>
                </div>
              </Col>
              <Col md={7}>
                <h3>Text Align</h3>
                <div className="story-board-font-style">
                  <div
                    className={`${getProps()?.textAlign == 'left' ? 'active' : ''}`}
                    onClick={() => saveProp('textAlign', 'left')}
                  >
                    <IconLeft />
                  </div>
                  <div
                    className={`${getProps()?.textAlign == 'center' ? 'active' : ''}`}
                    onClick={() => saveProp('textAlign', 'center')}
                  >
                    <IconCenter />
                  </div>
                  <div
                    className={`${getProps()?.textAlign == 'right' ? 'active' : ''}`}
                    onClick={() => saveProp('textAlign', 'right')}
                  >
                    <IconRight />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <h3>Color</h3>
          <div className="sketch-picker-container">
            <SketchPicker
              color={
                getProps()?.color
              }
              onChange={e => {
                saveProp('color', e.hex)
              }}
            />
          </div>
        </div>
      case 'tooltip':
        return <div>
          <h3>Title</h3>
          <input
            onChange={e => {
              saveProp('title', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.title}
            type="text"
          />
          <h3>Description</h3>
          <input
            onChange={e => {
              saveProp('description', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.description}
            type="text"
          />
          <h3>Position</h3>
          <Dropdown
            isOpen={openTooltipPosition}
            toggle={() => setOpenTooltipPosition(!openTooltipPosition)}
          >
            <DropdownToggle caret>
              {getProps()?.position}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => saveProp('position', 'top')}>
                top
              </DropdownItem>
              <DropdownItem onClick={() => saveProp('position', 'bottom')}>
                bottom
              </DropdownItem>
              <DropdownItem onClick={() => saveProp('position', 'left')}>
                left
              </DropdownItem>
              <DropdownItem onClick={() => saveProp('position', 'right')}>
                right
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <h3>Color</h3>
          <div className="sketch-picker-container">
            <SketchPicker
              color={
                getProps()?.color
              }
              onChange={e => {
                saveProp('color', e.hex)
              }}
            />
          </div>
        </div>
      case 'button':
        return <div>
          <h3>Label</h3>
          <input
            onChange={e => {
              saveProp('label', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.label}
            type="text"
          />
          <h3>Font Size</h3>
          <input
            onChange={e => {
              saveProp('fontSize', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.fontSize}
            type="number"
          />
          <h3>Text Style</h3>
          <div className="story-board-font-style">
            <div
              onClick={() => saveProp('fontWeight', getProps()?.fontWeight ? '' : 'bold')}
              className={`story-board-font-style-bold ${getProps()?.fontWeight ? 'active' : ''}`}
            >
              B
            </div>
            <div
              onClick={() => saveProp('fontStyle', getProps()?.fontStyle ? '' : 'italic')}
              className={`story-board-font-style-bold ${getProps()?.fontStyle ? 'active' : ''}`}
            >
              i
            </div>
          </div>
          <h3>Background color</h3>
          <div className="sketch-picker-container">
            <SketchPicker
              color={
                getProps()?.background
              }
              onChange={e => {
                saveProp('background', e.hex)
              }}
            />
          </div>
          <h3>Color</h3>
          <div className="sketch-picker-container">
            <SketchPicker
              color={
                getProps()?.color
              }
              onChange={e => {
                saveProp('color', e.hex)
              }}
            />
          </div>
          <h3>Border radius</h3>
          <div className="story-board-sidebar-flex-row">
            <div>
              <input
                onChange={e => {
                  saveProp('borderTopLeftRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderTopLeftRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderTopRightRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderTopRightRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderBottomLeftRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderBottomLeftRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderBottomRightRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderBottomRightRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
          </div>
          <h3>Link</h3>
          <input
            onChange={e => {
              saveProp('link', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.link}
            type="text"
          />
        </div>
      case 'image':
        return <>
          <h3>URL</h3>
          <input
            onChange={e => {
              saveProp('src', e.target.value)
            }}
            className="story-board-sidebar-input w-100"
            value={getProps()?.src}
            type="text"
          />
          <h3>Border radius</h3>
          <div className="story-board-sidebar-flex-row">
            <div>
              <input
                onChange={e => {
                  saveProp('borderTopLeftRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderTopLeftRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderTopRightRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderTopRightRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderBottomLeftRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderBottomLeftRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
            <div>
              <input
                onChange={e => {
                  saveProp('borderBottomRightRadius', e.target.value)
                }}
                className="story-board-sidebar-input w-100"
                value={getProps()?.borderBottomRightRadius}
                min={0}
                max={1000}
                type="number"
              />
            </div>
          </div>
        </>
      case 'chart':
        return <div>
          <h3>Data</h3>
          <textarea
            className="story-board-sidebar-textarea w-100"
            onChange={e => {
              saveProp('data', JSON.parse(e.target.value))
            }}
            rows={20}
          >
            {JSON.stringify(getProps()?.data)}
          </textarea>
        </div>
      default:
        <></>
    }
  }

  const getIndex = () => {
    setIndex(c => c + 1)
    return index + 1
  }

  const onAddText = () => {
    setCanvas(c => [...c, {
      type: 'text',
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
        textAlign: 'left'
      }
    }])
  }

  const onAddShape = () => {
    setCanvas(c => [...c, {
      type: 'shape',
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 300,
      h: 200,
      component: Shape,
      minWidth: 1,
      minHeight: 1,
      props: {
        background: "#1D202D",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        src: '',
      }
    }])
  }

  const onAddButton = () => {
    setCanvas(c => [...c, {
      type: 'button',
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 120,
      h: 80,
      component: Button,
      minWidth: 60,
      minHeight: 30,
      props: {
        background: '#4d74ff',
        color: '#ffffff',
        label: 'Button',
        link: 'www.google.com',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        fontSize: 16,
        height: 56,
      }
    }])
  }

  const onAddImage = () => {
    setCanvas(c => [...c, {
      type: 'image',
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      component: Image,
      minWidth: 60,
      minHeight: 80,
      props: {
        src: logo,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    }])
  }

  const onAddChart = () => {
    setCanvas(c => [...c, {
      type: 'chart',
      id: shortid.generate(),
      index: getIndex(),
      x: 0,
      y: 0,
      w: 600,
      h: 370,
      component: Chart,
      minWidth: 300,
      minHeight: 200,
      props: {
        data: data
      }
    }])
  }

  const onAddTooltip = () => {
    setCanvas(c => [...c, {
      type: 'tooltip',
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
        position: "top",
        color: "#1FF0A7"
      }
    }])
  }

  const renderComponent = (Component, props) => {
    return <Component {...props} />
  }

  return (
    <div className="page-content story-page">
      <Container
        className="story"
        fluid={true}
      >
        <Breadcrumbs title="Dashboards" breadcrumbItem="Story Board" />

        <div className="story-board">
          <div className={`${selected.type ? 'active' : ''} story-board-sidebar`}>
            <div className="story-board-sidebar-title">{selected.type}
              <div onClick={() => setSelected({})}><IconAdd /></div>
            </div>
            <div className="story-board-sidebar-inner">
              {renderMenu()}
            </div>
          </div>
          <div className="story-canvas">
            <Rnd
              default={{
                x: "50%",
                y: 0,
                width: "64%",
                height: 500,
              }}
              className="story-canvas-editor"
              maxWidth={2000}
              minWidth={100}
              minHeight={100}
              disableDragging
            >
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
                  onClick={() => {
                    lastSelected.current = item;
                    setSelected(item)
                  }}
                  minWidth={item.minWidth}
                  minHeight={item.minHeight}
                  bounds="parent"
                  enableResizing={!item.disableResize}
                >
                  {renderComponent(item.component, item.props)}
                </Rnd>
              ))}
            </Rnd>
          </div>

          <div className="story-canvas-actions">
            <div className="d-flex w-100 justify-content-between">
              <div className="story-canvas-actions-btn"><IconLayers /></div>
              <div onClick={() => setIsActiveMenu(!isActiveMenu)} className={`story-canvas-actions-btn ${isActiveMenu ? 'active' : ''}`}><IconAdd /></div>
            </div>
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
