import React, { useState } from "react"
import { Tooltip } from 'reactstrap';
import shortid from "shortid"

const TooltipComp = (props) => {

  const {title, description, ...rest} = props

  const [isOpen, setIsOpen] = useState(false)

  return <div {...rest} className="story-component-tooltip">
    <div className="story-component-tooltip-shape" id="tooltip"></div>
    <Tooltip placement="top" isOpen={isOpen} target="tooltip" toggle={() => setIsOpen(!isOpen)}>
      <div className="story-component-tooltip-title">{title}</div>
      <div className="story-component-tooltip-description">{description}</div>
    </Tooltip>
  </div>
}

export default TooltipComp