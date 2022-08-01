import React from "react"

const Image = (props) => {

  const {
    src,
    img,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    ...rest
  } = props

  return <div className="story-component-image">
    <img
      {...rest}
      src={img ? img : src ? src : ''}
      style={{
        borderTopLeftRadius: `${borderTopLeftRadius ? borderTopLeftRadius : '0'}px`,
        borderTopRightRadius: `${borderTopRightRadius ? borderTopRightRadius : '0'}px`,
        borderBottomLeftRadius: `${borderBottomLeftRadius ? borderBottomLeftRadius : '0'}px`,
        borderBottomRightRadius: `${borderBottomRightRadius ? borderBottomRightRadius : '0'}px`,
      }}
    />
  </div>
}

export default Image