import React from "react"

const Button = (props) => {

  const {
    label,
    background,
    link,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    fontSize,
    color,
    fontWeight,
    fontStyle,
    isPreview,
    ...rest
  } = props

  return <div className="story-component-button">
    <a
      target="_blank"
      rel="noreferrer"
      {...isPreview ? { href: link } : {}}
      {...rest}
      style={{
        backgroundColor: background,
        borderColor: background,
        borderTopLeftRadius: `${borderTopLeftRadius ? borderTopLeftRadius : '0'}px`,
        borderTopRightRadius: `${borderTopRightRadius ? borderTopRightRadius : '0'}px`,
        borderBottomLeftRadius: `${borderBottomLeftRadius ? borderBottomLeftRadius : '0'}px`,
        borderBottomRightRadius: `${borderBottomRightRadius ? borderBottomRightRadius : '0'}px`,
        fontWeight: `${fontWeight ? fontWeight : 'normal'}`,
        fontStyle: `${fontStyle ? fontStyle : ''}`,
        color: `${color ? color : '#ffffff'}`,
      }}
    >
      {label}
    </a>
  </div>
}

export default Button