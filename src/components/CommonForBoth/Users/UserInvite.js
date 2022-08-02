import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const UserInvite = () => {

  const [openPermissions, setOpenPermissions] = useState(false)
  const [permission, setPermission] = useState("Edit")

  return <div className="story-board-user-invite">
    <input
      onChange={e => {

      }}
      className="story-board-input-large w-100 me-4"
      min={0}
      max={1000}
      placeholder="Please type user email"
    />
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