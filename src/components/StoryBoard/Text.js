import React, { useEffect, useRef, useState } from "react"

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Text = (props) => {

  const {
    color,
    fontSize,
    textAlign,
    fontWeight,
    fontStyle,
    onChange,
    value,
    isPreview,
    countUp,
    onFocus,
    onBlur,
    ...rest
  } = props
  const ref = useRef()
  const focus = useRef()
  const [v, setV] = useState(value)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    onInput()
  }, [fontSize])

  useEffect(() => {
    setV(countUp ? parseInt(String(value).replace(/\D/g, '')) : value)
  }, [value, countUp])

  useEffect(() => {
    let int = null;

    if (countUp) {
      int = setInterval(() => {
        if (!focus.current) setV(c => c + 1)
      }, 20)
    }

    return () => {
      clearInterval(int)
    }
  }, [countUp])

  const onInput = () => {
    ref.current.style.height = "5px";
    ref.current.style.height = (ref.current.scrollHeight) + "px";
  }

  return <div onDoubleClick={()=>setDisabled(false)} className="story-component-text">
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
      onFocus={() => {
        if(onFocus) onFocus()
        focus.current = true
      }}
      onBlur={() => {
        if(onBlur) onBlur()
        focus.current = false
        setDisabled(true)
      }}
      defaultValue={value}
      disabled={isPreview || disabled}
      onInput={onInput}
      onChange={onChange}
      placeholder="Text"
      value={countUp ? numberWithCommas(v) : v}
    />
  </div>
}

export default Text