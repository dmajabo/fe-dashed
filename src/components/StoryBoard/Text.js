import React from "react"

const Text = (props) => {

  const onInput = (e) => {
    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  return <div className="story-component-text">
    <textarea {...props} rows={1} onInput={onInput} placeholder="Text" ></textarea>
  </div>
}

export default Text