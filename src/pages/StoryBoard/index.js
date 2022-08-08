import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useLocation } from "react-router-dom";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import logo from "../../assets/images/logo-solana.png";

import IconText from "../../assets/images/story-board/icon-text.png";
import IconChart from "../../assets/images/story-board/icon-chart.png";
import IconShape from "../../assets/images/story-board/icon-shape.png";
import IconButton from "../../assets/images/story-board/icon-button.png";
import IconPicture from "../../assets/images/story-board/icon-picture.png";
import IconTooltip from "../../assets/images/story-board/icon-tooltip.png";

import SolanaGradient from "../../assets/images/story-board/solana-gradient.png";
import {
  Text,
  Shape,
  Button,
  Image,
  Chart,
  Tooltip,
} from "../../components/StoryBoard";

import {
  IconAdd,
  IconLayers,
  IconCenter,
  IconLeft,
  IconRight,
  IconComments,
  IconStar
} from "../../components/Common/Icon";
import { Rnd } from "react-rnd";
import shortid from "shortid";
import { SketchPicker } from "react-color";
import StoryBoardService from "./service";
import DatePicker from "components/Common/DatePicker";
import StoryBoardModal, {
  TickerModal,
} from "../../components/StoryBoard/StoryBoardModal";
import { useDropzone } from 'react-dropzone'

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const StoryBoardPage = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [canvas, setCanvas] = useState([]);
  const [story, setStory] = useState({ w: 1100, h: 600 });
  const [selected, setSelected] = useState({});
  const lastSelected = useRef({});
  const [index, setIndex] = useState(0);
  const [showChartOptions, setShowChartOptions] = useState(false);
  const [showTickerModal, setShowTickerModal] = useState(false);
  const [openTooltipPosition, setOpenTooltipPosition] = useState(false);
  const isSidebar = useRef(false);
  const [canvasClick, setCanvasClick] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [notification, setNotification] = useState("");
  const [id, setId] = useState();
  const [openTickerSelect, setOpenTickerSelect] = useState(false);
  const [isFilesUploading, setIsFilesUploading] = useState(false);
  const [images, setImages] = useState([])
  const browserId = useRef({});
  const location = useLocation();
  const [lastAdded, setLastAdded] = useState(null)
  const [disableDrag, setDisableDrag] = useState(null)
  const [scale, setScale] = useState(1)

  const onDrop = useCallback(acceptedFiles => {
    setIsFilesUploading(true)
    StoryBoardService.uploadFiles(acceptedFiles, browserId.current, onUploadComplete)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    acceptedFiles: ".jpg,.jpeg,.png,.svg"
  })

  let query = useQuery();

  useEffect(() => {
    if (canvas.length && browserId.current && !isPreview) {
      setIsSaving(true);
      StoryBoardService.save(canvas, story, browserId.current, setId, setIsSaving)
    }
  }, [canvas, story]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress, false);
    document.body.classList.add("vertical-collpsed");
    document.body.classList.add("remove-spaces");
    window.addEventListener("resize", onResize);
    window.dispatchEvent(new Event('resize'));

    let bId = localStorage.getItem("browserId");

    if (!bId) {
      bId = shortid.generate();
      localStorage.setItem("browserId", bId);
      browserId.current = bId;
    } else {
      browserId.current = bId;
    }

    setIsLoading(true);

    const id = query.get("id");
    const preview = query.get("preview");
    const publish = query.get("publish");

    setIsPreview((preview || publish) ? true : false)
    setIsPublish(publish ? true : false)

    StoryBoardService.selectStory(id, bId, setId, setCanvas, setStory, setNotification, setIsLoading, setIsPreview)
    StoryBoardService.getFiles(`images/${bId}`, onGetListOfFiles)

    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
      document.body.classList.remove("vertical-collpsed");
      document.body.classList.remove("remove-spaces");
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    sScale()
  }, [story])

  const onResize = () => {
    sScale()
  }

  const sScale = () => {
    const publish = query.get("publish");

    if (publish && (window.innerWidth - story.w < 0)) {
      setTimeout(() => {
        setScale(window.innerWidth / story.w - 0.10)
      }, 1000)
    }
  }

  useEffect(() => {
    const preview = query.get("preview");
    const publish = query.get("publish");

    setIsPreview((preview || publish) ? true : false)
    setIsPublish(publish ? true : false)

  }, [location])

  const onGetListOfFiles = (files) => {
    setImages(files)
  }

  const onUploadComplete = () => {
    setIsFilesUploading(false)
    StoryBoardService.getFiles(`images/${browserId.current}`, onGetListOfFiles)
  }

  const onKeyPress = e => {
    if (!isSidebar.current) {
      if (e.key === "Delete") {
        setCanvas(c => c.filter(item => item.id != lastSelected.current.id));
      }

      if (e.key === "Escape") {
        setShowChartOptions(false);
        setShowTickerModal(false);
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
                  saveProp("background", e.hex);
                }}
              />
            </div>
            <h3>Image</h3>
            <div className="story-board-images-container">
              <div className="story-board-images">
                <div
                  onClick={() => saveProp("img", "")}
                  className={`story-board-image empty ${!getProps()?.img ? "active" : ""
                    }`}
                >
                  Empty
                </div>
                <div
                  onClick={() => saveProp("img", SolanaGradient)}
                  className={`story-board-image ${getProps()?.img == SolanaGradient ? "active" : ""
                    }`}
                >
                  <img src={SolanaGradient} alt="" />
                </div>
                {images.map((image, i) => (
                  <div
                    key={`img-${i}`}
                    onClick={() => saveProp("img", image.url)}
                    className={`story-board-image ${getProps()?.img == image.url ? "active" : ""
                      }`}
                  >
                    <img src={image.url} alt="" />
                  </div>
                ))}
              </div>
              <div className="mt-1 ps-2 pe-2">
                <div className={`drag-and-drop-files ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <span>Drop the files here ...</span> :
                      <span>Drag some files here, or click to select files</span>
                  }
                </div>
              </div>
            </div>
            <h3>Background URL</h3>
            <input
              onChange={e => {
                saveProp("src", e.target.value);
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
                    saveProp("borderTopLeftRadius", e.target.value);
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
                    saveProp("borderTopRightRadius", e.target.value);
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
                    saveProp("borderBottomLeftRadius", e.target.value);
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
                    saveProp("borderBottomRightRadius", e.target.value);
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
        );
      case "text":
        return (
          <div>
            <h3>Font Size</h3>
            <input
              onChange={e => {
                saveProp("fontSize", e.target.value);
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
                      onClick={() =>
                        saveProp(
                          "fontWeight",
                          getProps()?.fontWeight ? "" : "bold"
                        )
                      }
                      className={`story-board-font-style-bold ${getProps()?.fontWeight ? "active" : ""
                        }`}
                    >
                      B
                    </div>
                    <div
                      onClick={() =>
                        saveProp(
                          "fontStyle",
                          getProps()?.fontStyle ? "" : "italic"
                        )
                      }
                      className={`story-board-font-style-bold ${getProps()?.fontStyle ? "active" : ""
                        }`}
                    >
                      i
                    </div>
                  </div>
                </Col>
                <Col md={7}>
                  <h3>Text Align</h3>
                  <div className="story-board-font-style">
                    <div
                      className={`${getProps()?.textAlign == "left" ? "active" : ""
                        }`}
                      onClick={() => saveProp("textAlign", "left")}
                    >
                      <IconLeft />
                    </div>
                    <div
                      className={`${getProps()?.textAlign == "center" ? "active" : ""
                        }`}
                      onClick={() => saveProp("textAlign", "center")}
                    >
                      <IconCenter />
                    </div>
                    <div
                      className={`${getProps()?.textAlign == "right" ? "active" : ""
                        }`}
                      onClick={() => saveProp("textAlign", "right")}
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
                color={getProps()?.color}
                onChange={e => {
                  saveProp("color", e.hex);
                }}
              />
            </div>
            <h3>Count up</h3>
            <div className="story-board-font-style">
              <div
                onClick={() =>
                  saveProp("countUp", getProps()?.countUp ? false : true)
                }
                className={`story-board-font-style-bold ${getProps()?.countUp ? "active" : ""
                  }`}
              >
                +
              </div>
            </div>
          </div>
        );
      case "tooltip":
        return (
          <div>
            <h3>Title</h3>
            <input
              onChange={e => {
                saveProp("title", e.target.value);
              }}
              className="story-board-sidebar-input w-100"
              value={getProps()?.title}
              type="text"
            />
            <h3>Description</h3>
            <input
              onChange={e => {
                saveProp("description", e.target.value);
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
              <DropdownToggle caret>{getProps()?.position}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => saveProp("position", "top")}>
                  top
                </DropdownItem>
                <DropdownItem onClick={() => saveProp("position", "bottom")}>
                  bottom
                </DropdownItem>
                <DropdownItem onClick={() => saveProp("position", "left")}>
                  left
                </DropdownItem>
                <DropdownItem onClick={() => saveProp("position", "right")}>
                  right
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <h3>Opacity</h3>
            <input
              min={0}
              max={100}
              step={10}
              type="range"
              className="form-range"
              id="opacityRange"
              value={getProps()?.opacity}
              onChange={e => {
                saveProp("opacity", e.target.value);
              }}
            />
            <h3>Color</h3>
            <div className="sketch-picker-container">
              <SketchPicker
                color={getProps()?.color}
                onChange={e => {
                  saveProp("color", e.hex);
                }}
              />
            </div>
          </div>
        );
      case "button":
        return (
          <div>
            <h3>Label</h3>
            <input
              onChange={e => {
                saveProp("label", e.target.value);
              }}
              className="story-board-sidebar-input w-100"
              value={getProps()?.label}
              type="text"
            />
            <h3>Font Size</h3>
            <input
              onChange={e => {
                saveProp("fontSize", e.target.value);
              }}
              className="story-board-sidebar-input w-100"
              value={getProps()?.fontSize}
              type="number"
            />
            <h3>Text Style</h3>
            <div className="story-board-font-style">
              <div
                onClick={() =>
                  saveProp("fontWeight", getProps()?.fontWeight ? "" : "bold")
                }
                className={`story-board-font-style-bold ${getProps()?.fontWeight ? "active" : ""
                  }`}
              >
                B
              </div>
              <div
                onClick={() =>
                  saveProp("fontStyle", getProps()?.fontStyle ? "" : "italic")
                }
                className={`story-board-font-style-bold ${getProps()?.fontStyle ? "active" : ""
                  }`}
              >
                i
              </div>
            </div>
            <h3>Background color</h3>
            <div className="sketch-picker-container">
              <SketchPicker
                color={getProps()?.background}
                onChange={e => {
                  saveProp("background", e.hex);
                }}
              />
            </div>
            <h3>Color</h3>
            <div className="sketch-picker-container">
              <SketchPicker
                color={getProps()?.color}
                onChange={e => {
                  saveProp("color", e.hex);
                }}
              />
            </div>
            <h3>Border radius</h3>
            <div className="story-board-sidebar-flex-row">
              <div>
                <input
                  onChange={e => {
                    saveProp("borderTopLeftRadius", e.target.value);
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
                    saveProp("borderTopRightRadius", e.target.value);
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
                    saveProp("borderBottomLeftRadius", e.target.value);
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
                    saveProp("borderBottomRightRadius", e.target.value);
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
                saveProp("link", e.target.value);
              }}
              className="story-board-sidebar-input w-100"
              value={getProps()?.link}
              type="text"
            />
          </div>
        );
      case "image":
        return (
          <>
            <h3>URL</h3>
            <input
              onChange={e => {
                saveProp("src", e.target.value);
              }}
              className="story-board-sidebar-input w-100"
              value={getProps()?.src}
              type="text"
            />
            <h3>Image</h3>
            <div className="story-board-images-container">
              <div className="story-board-images">
                <div
                  onClick={() => saveProp("img", "")}
                  className={`story-board-image empty ${!getProps()?.img ? "active" : ""
                    }`}
                >
                  Empty
                </div>
                <div
                  onClick={() => saveProp("img", SolanaGradient)}
                  className={`story-board-image ${getProps()?.img == SolanaGradient ? "active" : ""
                    }`}
                >
                  <img src={SolanaGradient} alt="" />
                </div>
                {images.map((image, i) => (
                  <div
                    key={`img-${i}`}
                    onClick={() => saveProp("img", image.url)}
                    className={`story-board-image ${getProps()?.img == image.url ? "active" : ""
                      }`}
                  >
                    <img src={image.url} alt="" />
                  </div>
                ))}
              </div>
              <div className="mt-1 ps-2 pe-2">
                <div className={`drag-and-drop-files ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <span>Drop the files here ...</span> :
                      <span>Drag some files here, or click to select files</span>
                  }
                </div>
              </div>
            </div>
            <h3>Border radius</h3>
            <div className="story-board-sidebar-flex-row">
              <div>
                <input
                  onChange={e => {
                    saveProp("borderTopLeftRadius", e.target.value);
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
                    saveProp("borderTopRightRadius", e.target.value);
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
                    saveProp("borderBottomLeftRadius", e.target.value);
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
                    saveProp("borderBottomRightRadius", e.target.value);
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
        );
      case "chart":
        return (
          <div>
            <h3>Ticker Symbol</h3>
            <Dropdown
              isOpen={openTickerSelect}
              toggle={() => setOpenTickerSelect(!openTickerSelect)}
            >
              <DropdownToggle caret>{getProps()?.ticker}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => saveProp("ticker", "solana")}>
                  solana
                </DropdownItem>
                <DropdownItem onClick={() => saveProp("ticker", "bitcoin")}>
                  bitcoin
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <h3>Data Range</h3>
            <div className="mb-3">
              <DatePicker
                onChange={(e) => saveProp("startDate", e.target.value)}
                placeholder="YYYY-MM-DD"
                name="startDate"
                filter="date"
                value={getProps()?.startDate}
                label={'From'}
              />
            </div>
            <div>
              <DatePicker
                onChange={(e) => saveProp("endDate", e.target.value)}
                placeholder="YYYY-MM-DD"
                name="endDate"
                type="date-adv"
                filter="date"
                value={getProps()?.endDate}
                label={'To'}
              />
            </div>
            <h3>Line Color 1</h3>
            <div className="sketch-picker-container">
              <SketchPicker
                color={getProps()?.color1}
                onChange={e => {
                  saveProp("color1", e.hex);
                }}
              />
            </div>
            <h3>Line Color 2</h3>
            <div className="sketch-picker-container">
              <SketchPicker
                color={getProps()?.color2}
                onChange={e => {
                  saveProp("color2", e.hex);
                }}
              />
            </div>

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

  const removePx = (value) => {
    return String(value).replace("px", '')
  }

  const onAddText = () => {
    setCanvas(c => [
      ...c,
      {
        type: "text",
        id: shortid.generate(),
        index: getIndex(),
        x: removePx(story.w) / 2 - 65,
        y: removePx(story.h) / 2 - 30,
        w: 130,
        component: "Text",
        minWidth: 10,
        minHeight: 10,
        props: {
          color: "#ffffff",
          fontSize: 32,
          textAlign: "left",
          value: "",
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
        x: removePx(story.w) / 2 - 150,
        y: removePx(story.h) / 2 - 100,
        w: 300,
        h: 200,
        component: "Shape",
        minWidth: 1,
        minHeight: 1,
        props: {
          background: "#1D202D",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          src: "",
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
        x: removePx(story.w) / 2 - 60,
        y: removePx(story.h) / 2 - 40,
        w: 120,
        h: 80,
        component: "Button",
        minWidth: 60,
        minHeight: 30,
        props: {
          background: "#4d74ff",
          color: "#ffffff",
          label: "Button",
          link: "www.google.com",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          fontSize: 16,
          height: 56,
        },
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
        x: removePx(story.w) / 2 - 150,
        y: removePx(story.h) / 2 - 50,
        width: 300,
        height: 300,
        component: "Image",
        minWidth: 60,
        minHeight: 80,
        props: {
          src: logo,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    ]);
  };

  const onAddChart = (ticker) => {
    setCanvas(c => [
      ...c,
      {
        type: "chart",
        id: shortid.generate(),
        index: getIndex(),
        x: removePx(story.w) / 2 - 300,
        y: removePx(story.h) / 2 - 185,
        w: 600,
        h: 370,
        component: "Chart",
        minWidth: 300,
        minHeight: 200,
        props: {
          startDate: "2020-01-01",
          endDate: "2021-12-31",
          ticker: ticker,
          color1: "#36F097",
          color2: "rgba(54, 240, 151, 0.2)"
        }
      },
    ]);
  };

  const onAddTooltip = () => {
    const id = shortid.generate()
    setLastAdded(id)

    setCanvas(c => [
      ...c,
      {
        type: "tooltip",
        id: id,
        index: getIndex(),
        x: removePx(story.w) / 2 - 14,
        y: removePx(story.h) / 2 - 14,
        w: 28,
        h: 28,
        component: "Tooltip",
        minWidth: 28,
        minHeight: 28,
        disableResize: true,
        props: {
          title: "Insert text here",
          description: "Insert text here",
          position: "top",
          color: "#1FF0A7",
          opacity: 90,
        },
      },
    ]);
  };

  const renderComponent = (ComponentName, item) => {
    switch (ComponentName) {
      case "Text":
        return (
          <Text
            {...item.props}
            isPreview={isPreview}
            onChange={e => onTextChange(e, item.id)}
            onFocus={() => {
              isSidebar.current = true
              setDisableDrag(item.id)
            }}
            onBlur={() => {
              isSidebar.current = false
              setDisableDrag(null)
            }}
          />
        );
      case "Shape":
        return <Shape {...item.props} />;
      case "Button":
        return <Button {...item.props} isPreview={isPreview} />;
      case "Tooltip":
        return (
          <Tooltip
            {...item.props}
            isLastAdded={lastAdded == item.id}
            canvasClick={canvasClick}
            onMouseLeave={() => (isSidebar.current = false)}
            onMouseEnter={() => (isSidebar.current = true)}
            onTitleChange={e => onTooltipTitleChange(e, item.id)}
            onDescriptionChange={e => onTooltipDescriptionChange(e, item.id)}
            onTitleFocus={e => onTooltipTitleFocus(e, item.id)}
            onDescriptionFocus={e => onTooltipDescriptionFocus(e, item.id)}
            onTitleBlur={e => onTooltipTitleBlur(e, item.id)}
            onDescriptionBlur={e => onTooltipDescriptionBlur(e, item.id)}
            isPreview={isPreview}
          />
        );
      case "Image":
        return <Image {...item.props} />;
      case "Chart":
        return <Chart {...item.props} />;
    }
  };

  const handleChartTypeSelection = type => {
    /**
      @Todo onAddChart should pass along chart type in order to properly render different chart types
      example onAddChart(type) type = typeof 'Area' | 'Price' | 'Pie' | 'Line'| 'Scatter'
      */

    setShowChartOptions(false)
    setShowTickerModal(true)
  };

  const onTickerSelected = ticker => {
    setCanvas(c => c.filter(item => item.type != "chart"));
    onAddChart(ticker)
    setShowTickerModal(false)
  };

  const onTextChange = (e, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? { ...item, props: { ...item.props, value: e.target.value } }
          : { ...item }
      )
    );
  };

  const onDragStop = (e, d, id) => {
    setCanvas(c =>
      c.map(item => (item.id == id ? { ...item, x: d.x, y: d.y } : { ...item }))
    );
  };

  const onResizeStop = (ref, position, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? {
            ...item,
            w: ref.style.width,
            h: ref.style.height,
            x: position.x,
            y: position.y,
          }
          : { ...item }
      )
    );
  };

  const onTooltipTitleBlur = (e, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? { ...item, props: { ...item.props, title: e.target.value ? e.target.value : 'Insert text here' } }
          : { ...item }
      )
    );
  };

  const onTooltipDescriptionBlur = (e, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? { ...item, props: { ...item.props, description: e.target.value ? e.target.value : 'Insert text here' } }
          : { ...item }
      )
    );
  };

  const onTooltipTitleFocus = (e, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? { ...item, props: { ...item.props, title: e.target.value == 'Insert text here' ? '' : e.target.value } }
          : { ...item }
      )
    );
  };

  const onTooltipDescriptionFocus = (e, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? { ...item, props: { ...item.props, description: e.target.value == 'Insert text here' ? '' : e.target.value } }
          : { ...item }
      )
    );
  };

  const onTooltipTitleChange = (e, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? { ...item, props: { ...item.props, title: e.target.value } }
          : { ...item }
      )
    );
  };

  const onTooltipDescriptionChange = (e, id) => {
    setCanvas(c =>
      c.map(item =>
        item.id == id
          ? { ...item, props: { ...item.props, description: e.target.value } }
          : { ...item }
      )
    );
  };

  const onResizeStoryStop = ref => {
    setStory({ w: ref.style.width, h: ref.style.height });
  };

  return (
    <div className="page-content story-page">
      {isPublish &&
        <div className="story-publish-row">
          <div>
            <div><span className="story-publish-label">Fundamentals</span></div>
            <div><span className="story-publish-title">The Story of Solana</span></div>
            <div className="story-publish-description"><span>by</span> <a href="#">@cryptoguy</a> <span>and</span> <a href="#">@cryptogirl</a>, <span>March 18</span></div>
          </div>
          <div className="text-end">
            <div>
              <div className="story-publish-saves"><IconStar /> 500 saves</div>
            </div>
            <div>
              <div className="story-publish-commemts"><IconComments /> 125 comments</div>
            </div>
          </div>
        </div>
      }
      <Container className="story" fluid={true}>
        <div
          onMouseEnter={() => (isSidebar.current = true)}
          onMouseLeave={() => (isSidebar.current = false)}
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

        <div className="story-board">
          <div className="story-canvas" style={{ height: `calc(${String(story.h).replace("px", '')}px + ${isPublish ? '240px' : '140px'})`, transform: `scale(${scale})` }}>
            <StoryBoardModal
              onSelectChart={handleChartTypeSelection}
              isOpen={showChartOptions}
              toggle={() => setShowChartOptions(!showChartOptions)}
            />
            <TickerModal
              isOpen={showTickerModal}
              onClose={() => setShowTickerModal(false)}
              onChange={onTickerSelected}
              toggle={() => setShowTickerModal(!showTickerModal)}
            />
            {notification ? (
              <div className="story-board-notification">{notification}</div>
            ) : (
              <Rnd
                position={{
                  x: "50%",
                  y: 0,
                }}
                size={{ width: story.w + 20, height: story.h + 20 }}
                className={`story-canvas-editor ${isPreview ? "preview" : ""}`}
                maxWidth={2000}
                minWidth={100}
                minHeight={100}
                onClick={(e) => {
                  if (!e.target.closest('.story-component-tooltip-shape')) {
                    setCanvasClick(canvasClick + 1)
                  }
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  if (!isPreview) onResizeStoryStop(ref, position);
                }}
                enableResizing={!isPreview}
                disableDragging
              >
                <div className="story-canvas-inner">
                  {canvas.map((item, i) => (
                    <Rnd
                      key={`rg-${i}`}
                      style={{ zIndex: item.index }}
                      size={{ width: item.w, height: item.h }}
                      position={{ x: item.x, y: item.y }}
                      onDragStop={(e, d) => {
                        if (!isPreview) onDragStop(e, d, item.id);
                      }}
                      onClick={() => {
                        if (!isPreview) {
                          lastSelected.current = item;
                          setSelected(item);
                        }
                      }}
                      onResizeStop={(e, direction, ref, delta, position) => {
                        if (!isPreview) {
                          onResizeStop(ref, position, item.id);
                        }
                      }}
                      minWidth={item.minWidth}
                      minHeight={item.minHeight}
                      bounds="parent"
                      enableResizing={!item.disableResize && !isPreview}
                      disableDragging={isPreview || (item.id == disableDrag)}
                    >
                      {renderComponent(item.component, item)}
                    </Rnd>
                  ))}
                </div>
              </Rnd>
            )}
          </div>
        </div>
        {!isPreview && (
          <div className="story-canvas-actions">
            {/* {id && <div className="story-canvas-actions-id">id: {id}</div>} */}
            <div className="d-flex w-100 justify-content-between">
              <div className="story-canvas-actions-btn">
                <IconLayers />
              </div>
              <div
                onClick={() => setIsActiveMenu(!isActiveMenu)}
                className={`story-canvas-actions-btn ${isActiveMenu ? "active" : ""
                  }`}
              >
                <IconAdd />
              </div>
            </div>
            <div
              className={`story-canvas-actions-menu ${isActiveMenu ? "active" : ""
                }`}
              onClick={() => setIsActiveMenu(false)}
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
        )}
      </Container>
    </div>
  );
};

export default StoryBoardPage;
