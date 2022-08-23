import React, { useState, useEffect, useRef } from "react"
import { Tooltip } from 'reactstrap';
import shortid from "shortid"
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import Editor from 'react-medium-editor';

const TooltipComp = (props) => {

  const {
    value,
    position,
    color,
    opacity,
    onChange,
    canvasClick,
    onMouseLeave,
    onMouseEnter,
    onMouseEnterContent,
    onMouseLeaveContent,
    isPreview,
    isLastAdded,
    ...rest } = props
  const [id, setId] = useState(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))
  const [editorId, setEditorId] = useState(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  const refTitle = useRef()
  const refDescription = useRef()
  const isTooltip = useRef()
  const [editor, setEditor] = useState(null)

  const editorOptions = {
    placeholder: {
      /* This example includes the default options for placeholder,
             if nothing is passed this is what it used */
      text: "Insert text here",
      hideOnClick: true,
    },
    toolbar: {
      buttons: [
        "bold",
        "italic",
        {
          name: "h2",
          action: "append-h2",
          aria: "header type 2",
          tagNames: ["h2"],
          contentDefault: "<b>H2</b>",
          classList: ["custom-class-h2"],
          attrs: {
            "data-custom-attr": "attr-value-h2",
          },
        },
        {
          name: "h3",
          action: "append-h3",
          aria: "header type 3",
          tagNames: ["h3"],
          contentDefault: "<b>H3</b>",
          classList: ["custom-class-h3"],
          attrs: {
            "data-custom-attr": "attr-value-h3",
          },
        },
        "quote",
        "anchor",
      ],
    },
  }

  useEffect(() => {
    setId(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))
    setEditorId(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))

    if (isLastAdded) {
      setTimeout(() => {
        setIsOpen(true)
      }, 500)
    }
  }, [])

  useEffect(() => {
    onInputTitle()
    onInputDescription()
  }, [isOpen])

  useEffect(() => {
    if (!isTooltip.current && isOpen && !canvasClick.closest(`[id=${id}]`)) setIsOpen(false)
  }, [canvasClick])

  const onInputTitle = () => {
    if (refTitle.current) {
      refTitle.current.style.height = "5px";
      refTitle.current.style.height = (refTitle.current.scrollHeight) + "px";
    }
  }

  const onInputDescription = () => {
    if (refDescription.current) {
      refDescription.current.style.height = "5px";
      refDescription.current.style.height = (refDescription.current.scrollHeight) + "px";
    }
  }

  return <div
    ref={ref}
    {...rest}
    className={`story-component-tooltip top-${opacity}`}
    onMouseLeave={() => {
      isTooltip.current = false
      onMouseLeave()
    }}
  >
    <div
      onClick={() => setIsOpen(true)}
      className="story-component-tooltip-shape" id={id}
    >
      <div style={{ backgroundColor: color }} className="story-component-tooltip-body"></div>
      <div style={{ backgroundColor: color }} className="story-component-tooltip-glow"></div>
    </div>
    <Tooltip
      container={ref.current}
      placement={position}
      isOpen={isOpen}
      target={id}
      onMouseEnter={() => {
        isTooltip.current = true
        onMouseEnter()
      }}
    >
      {isPreview ?
        <div
          onMouseEnter={onMouseEnterContent}
          onMouseLeave={onMouseLeaveContent}
          className="story-component-tooltip-content"
          dangerouslySetInnerHTML={{ __html: value }}></div>
        :
        <Editor
          tag="div"
          text={value}
          onChange={(e) => {
            if (onChange) onChange(e)
          }}
          className="story-component-tooltip-content"
          options={editorOptions}
          onMouseEnter={onMouseEnterContent}
          onMouseLeave={onMouseLeaveContent}
        />
      }

    </Tooltip>
  </div>
}

export default TooltipComp