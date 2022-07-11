import React, { useState, useEffect, useRef } from "react"
import { Tooltip } from 'reactstrap';
import shortid from "shortid"

const TooltipComp = (props) => {

  const {
    title,
    description,
    position,
    color,
    onTitleChange,
    onDescriptionChange,
    canvasClick,
    onMouseLeave,
    onMouseEnter,
    isPreview,
    ...rest } = props
  const [id, setId] = useState(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  const refTitle = useRef()
  const refDescription = useRef()
  const isTooltip = useRef()

  useEffect(() => {
    setId(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))
  }, [])

  useEffect(() => {
    onInputTitle()
    onInputDescription()
  }, [isOpen])

  useEffect(() => {
    if (!isTooltip.current && isOpen) setIsOpen(false)
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
    className="story-component-tooltip"
    onMouseLeave={() => {
      isTooltip.current = false
      onMouseLeave()
    }}
  >
    <div style={{ backgroundColor: color }} className="story-component-tooltip-shape" id={id}></div>
    <Tooltip
      container={ref.current}
      placement={position}
      isOpen={isOpen}
      target={id}
      toggle={() => {
        if (isTooltip.current) {
          setIsOpen(true)
        } else {
          setIsOpen(!isOpen)
        }
      }}
      onMouseEnter={() => {
        isTooltip.current = true
        onMouseEnter()
      }}
    >
      <div className="story-component-tooltip-title">
        <textarea
          rows={1}
          onInput={onInputTitle}
          ref={refTitle}
          disabled={isPreview}
          onChange={onTitleChange}
        >
          {title}
        </textarea>
      </div>
      <div className="story-component-tooltip-description">
        <textarea
          rows={1}
          onInput={onInputDescription}
          ref={refDescription}
          disabled={isPreview}
          onChange={onDescriptionChange}
        >
          {description}
        </textarea>
      </div>
    </Tooltip>
  </div>
}

export default TooltipComp