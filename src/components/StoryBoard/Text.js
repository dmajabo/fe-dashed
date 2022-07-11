import React, {useEffect, useRef} from "react"

const Text = (props) => {

  const { color, fontSize, textAlign, fontWeight, fontStyle, onChange, value, isPreview, ...rest } = props
  const ref = useRef()

  useEffect(()=>{
    onInput()
  }, [fontSize])

  const onInput = () => {
    ref.current.style.height = "5px";
    ref.current.style.height = (ref.current.scrollHeight) + "px";
  }

  return <div className="story-component-text">
    <textarea
      {...rest}
      ref={ref}
      style={
        {
          color: color,
          fontSize: `${fontSize}px`,
          fontWeight: `${fontWeight ? fontWeight : ''}`,
          fontStyle: `${fontStyle ? fontStyle : ''}`,
          textAlign: `${textAlign ? textAlign : ''}`
        }}
      rows={1}
      defaultValue={value}
      disabled={isPreview}
      onInput={onInput}
      onChange={onChange}
      placeholder="Text" >
    </textarea>
  </div>
}

export default Text