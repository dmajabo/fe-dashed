import React from "react"
import Avatar from 'react-avatar';

const User = ({name}) => {

  return <div className="story-board-users-circ story-board-users-user">
      <Avatar name={name} size="42" round="40px"/>
    </div>

}

export default User