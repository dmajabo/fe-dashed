import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { filterItFull } from "../../../helpers/scripts"

const UserInvite = ({ users, onChange }) => {

  const [openPermissions, setOpenPermissions] = useState(false)
  const [permission, setPermission] = useState("Edit")
  const [value, setValue] = useState("")
  const [availableUsers, setAvailableUsers] = useState([])
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    if (value) {
      setAvailableUsers(filterItFull(users, value, 'email'))
      if (onChange) onChange(null, "Edit")
    }
    else {
      setAvailableUsers([])
      if (onChange) onChange(null, "Edit")
    }
  }, [value])

  const onSelect = (val) => {
    setTimeout(() => {
      if (onChange) onChange(val, permission)
    }, 100)

    setValue(val.email)
  }

  return <div className="story-board-user-invite">
    <div className="position-relative">
      <input
        onChange={e => {
          setValue(e.target.value)
        }}
        className="story-board-input-large w-100 me-4"
        min={0}
        max={1000}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false)
          }, 100)
        }}
        placeholder="Please type user email"
      />
      <div className={`story-board-user-invite-dropdown ${(availableUsers?.length && focus) ? 'active' : ''}`}>
        {availableUsers?.map((user, i) => (
          <div onClick={() => onSelect(user)} key={`ui-${i}`}>{user.email}</div>
        ))}
      </div>
    </div>
    <Dropdown
      isOpen={openPermissions}
      toggle={() => setOpenPermissions(!openPermissions)}
    >
      <DropdownToggle caret>{permission}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => setPermission("View")}>
          View
        </DropdownItem>
        <DropdownItem onClick={() => setPermission("Edit")}>
          Edit
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

}

export default UserInvite