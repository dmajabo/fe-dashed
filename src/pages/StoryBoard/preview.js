import React, { useState, useEffect, useRef } from "react";
import {
  Container,
} from "reactstrap";

import { useLocation } from "react-router-dom";

import {
  Text,
  Shape,
  Button,
  Image,
  Chart,
  Tooltip,
} from "../../components/StoryBoard";

import {
  IconComments,
  IconStar
} from "../../components/Common/Icon";
import { Rnd } from "react-rnd";
import { getStory } from "../../store/editor/actions"
import { useDispatch, useSelector } from "react-redux"
import PublishTitle from "./PublishTitle";

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const StoryBoardPreview = () => {
  const [canvas, setCanvas] = useState([]);
  const [story, setStory] = useState({ w: 1100, h: 600 });
  const isSidebar = useRef(false);
  const [canvasClick, setCanvasClick] = useState(0);
  const [lastAdded, setLastAdded] = useState(null)
  const [disableDrag, setDisableDrag] = useState(null)
  const [scale, setScale] = useState(1)
  const dispatch = useDispatch()
  const loadedCanvas = useSelector(state => state.Editor.canvas)
  const isPreview = true
  const notification = useSelector(state => state.Editor.notification)
  const isPublish = true

  let query = useQuery();

  useEffect(() => {
    if (loadedCanvas?.canvas) {
      setCanvas(loadedCanvas.canvas.canvas)
      setStory({ w: loadedCanvas.canvas.w, h: loadedCanvas.canvas.h })
    }
  }, [loadedCanvas])

  useEffect(() => {
    document.body.classList.add("vertical-collpsed");
    document.body.classList.add("remove-spaces");
    window.addEventListener("resize", onResize);
    window.dispatchEvent(new Event('resize'));

    const id = query.get("id");
    dispatch(getStory(id, true, false))

    return () => {
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

  const renderComponent = (ComponentName, item) => {
    switch (ComponentName) {
      case "Text":
        return (
          <Text
            {...item.props}
            isPreview={isPreview}
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
            isPreview={isPreview}
          />
        );
      case "Image":
        return <Image {...item.props} />;
      case "Chart":
        return <Chart {...item.props} />;
    }
  };

  return (
    <div className={`page-content story-page ${isPublish ? 'publish' : ''}`}>
      {(isPublish && canvas.length > 0) &&
        <PublishTitle
          data={loadedCanvas}
        />
      }
      <Container className={`story ${isPublish ? 'publish' : ''}`} fluid={true}>
        <div className="story-board">
          <div className="story-canvas" style={{ height: `calc(${String(story.h).replace("px", '')}px + ${isPublish ? '240px' : '140px'})`, transform: `scale(${scale})` }}>
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
                enableResizing={!isPreview}
                disableDragging
              >
                <div className="story-canvas-inner">
                  {canvas?.map((item, i) => (
                    <Rnd
                      key={`rg-${i}`}
                      style={{ zIndex: item.index }}
                      size={{ width: item.w, height: item.h }}
                      position={{ x: item.x, y: item.y }}
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
      </Container>
    </div>
  );
};

export default StoryBoardPreview;
