import React from "react"

const Shape = (props) => {

  const {background, borderRadius, ...rest} = props

  return <div {...rest} style={{background:background, borderRadius: `${borderRadius}px`}} className="story-component-shape">
  </div>
}

export default Shape