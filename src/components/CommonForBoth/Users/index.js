import React from "react"
import User from "./User"

const Users = () => {
  return <div className="story-board-users">
    <User name={`E J`}/>
    <div className="story-board-users-circ story-board-users-count">
      +5
    </div>
  </div>
}

export default Users