import React from "react"
import User from "./User"
import { filterIt } from "helpers/scripts";

const Users = ({ invitations, users }) => {

  const getNameById = (id) => {
    const user = filterIt(users, id, 'id')[0]

    return user && user.full_name ? user.full_name : user.email
  }

  return <div className="story-board-users">
    {invitations?.length ?
      <>
        <User name={getNameById(invitations[0].userId)} />
        {invitations?.length > 1 &&
          <div className="story-board-users-circ story-board-users-count">
            {invitations.length - 1}
          </div>
        }
      </> : <div>Invite users</div>
    }
  </div>
}

export default Users