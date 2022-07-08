import React, { useState, useEffect } from "react"
import { Tooltip } from 'reactstrap';
import shortid from "shortid"

const TooltipComp = (props) => {

  const {title, description, position, color, ...rest} = props
  const [id, setId] = useState(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    setId(shortid.generate().toLowerCase().replace("-", "").replace(/[0-9]/g, ''))
  }, [])

  return <div {...rest} className="story-component-tooltip">
    <div style={{backgroundColor: color}} className="story-component-tooltip-shape" id={id}></div>
    <Tooltip placement={position} isOpen={isOpen} target={id} toggle={() => setIsOpen(!isOpen)}>
      <div className="story-component-tooltip-title">{title}</div>
      <div className="story-component-tooltip-description">{description}</div>
    </Tooltip>
  </div>
}

export default TooltipComp