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
      borderRadius: `${borderRadius}px`,
      borderTopLeftRadius: `${borderTopLeftRadius ? borderTopLeftRadius : '0'}px`,
      borderTopRightRadius: `${borderTopRightRadius ? borderTopRightRadius : '0'}px`,
      borderBottomLeftRadius: `${borderBottomLeftRadius ? borderBottomLeftRadius : '0'}px`,
      borderBottomRightRadius: `${borderBottomRightRadius ? borderBottomRightRadius : '0'}px`,
    }}
    className="story-component-shape">
      {(img || src) && <img src={`${img ? img : src}`} crossOrigin="anonymous" alt="" />}
  </div>
}

export default Shape