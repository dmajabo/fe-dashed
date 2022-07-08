import React from "react"

const Shape = (props) => {

  const {background, borderRadius, img, ...rest} = props

  return <div {...rest} style={{backgroundColor:background, backgroundImage: `${img ? `url(${img})` : ''}`, borderRadius: `${borderRadius}px`}} className="story-component-shape">
  </div>
}

export default Shape