import React, { useState, useRef, useEffect } from "react"
import moment from "moment"
import Calendar from 'react-calendar';

const DatePicker = ({ variant, className, placeholder, name, onChange, defaultValue, type, required, label, value, filter }) => {

  const [isFocus, setIsFocus] = useState(false)
  const inputR = useRef(null)
  const [valid, setValid] = useState(null)
  const [v, setV] = useState(value)
  const [dateValue, setDateValue] = useState(value)
  const [activeDatePicker, setActiveDatePicker] = useState(false)

  useEffect(() => {
    setV(value)
  }, [value])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => document.removeEventListener("keydown", escFunction, false);
  }, []);

  useEffect(() => {
    if (isFocus) {
      setActiveDatePicker(true)
    }
  }, [isFocus])

  const onChangeDate = (e) => {
    setV(moment(e).format('YYYY-MM-DD'))
    setDateValue(moment(e).toDate())
    if (onChange) onChange({ target: { value: moment(e).format('YYYY-MM-DD') } })
    setActiveDatePicker(false)
  }

  const onBlur = () => {
    setIsFocus(false)
  }

  const escFunction = (e) => {
    if (e.key === "Escape") {
      setIsFocus(false)
      setActiveDatePicker(false)
      inputR.current.blur()
    }
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsFocus(false)
      setActiveDatePicker(false)
      e.target.blur()
    }
  }

  const render = () => {
    switch (variant) {
      default:
        return <div className={`date-picker-container ${variant ? variant : ""} ${isFocus ? "focus" : ""} ${className ? className : ""} ${valid == null ? "" : valid ? "valid" : "not-valid"}`}>
          <div>{label}</div>
          <input
            type={type ? type : "text"}
            placeholder={placeholder}
            onFocus={() => setIsFocus(true)}
            onBlur={onBlur}
            name={name}
            autoComplete={type != 'date-adv'}
            defaultValue={defaultValue}
            onKeyPress={onKeyPress}
            value={v}
            required={required ? required : false}
            ref={inputR}
          />
          <div className={`date-picker ${activeDatePicker ? 'active' : ''}`}>
            <Calendar
              onChange={onChangeDate}
              value={moment(dateValue).toDate()}
              minDate={moment("2014-01-01").toDate()}
            />
          </div>
        </div>
    }
  }

  return render();
}

export default DatePicker;
