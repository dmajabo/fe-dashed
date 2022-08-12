import React from "react"
import Avatar from 'react-avatar';
import { IconClose } from "../../Common/Icon"

const User = ({ name, isCanRemove, alt, onRemove }) => {

  return <div className={`story-board-users-circ story-board-users-user ${isCanRemove ? 'removable' : ''}`}>
    <Avatar
      alt={alt}
      name={name}
      size="42"
      round="40px"
      title={alt}
    />
    {isCanRemove &&
      <div
        onClick={() => { if (onRemove) onRemove() }}
        className='story-board-users-user-delete'
      >
        <IconClose />
      </div>
    }
  </div>

}

export default User