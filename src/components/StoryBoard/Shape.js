import React from "react"

const Shape = (props) => {

  const {
    background,
    borderRadius,
    img,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    src,
    ...rest
  } = props

  return <div
    {...rest}
    style={{
      backgroundColor: background,
      backgroundImage: `${(img || src) ? `url(${img ? img : src})` : ''}`,
      borderRadius: `${borderRadius}px`,
      borderTopLeftRadius: `${borderTopLeftRadius ? borderTopLeftRadius : '0'}px`,
      borderTopRightRadius: `${borderTopRightRadius ? borderTopRightRadius : '0'}px`,
      borderBottomLeftRadius: `${borderBottomLeftRadius ? borderBottomLeftRadius : '0'}px`,
      borderBottomRightRadius: `${borderBottomRightRadius ? borderBottomRightRadius : '0'}px`,
    }}
    className="story-component-shape">
  </div>
}

export default Shape