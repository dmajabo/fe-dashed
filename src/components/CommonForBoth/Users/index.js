import React from "react"
import User from "./User"
import { filterIt } from "helpers/scripts";

const Users = ({ invitations, users }) => {

  const getNameById = (id) => {
    const user = filterIt(users, id, 'id')[0]

    return user && user.full_name ? user.full_name : user?.email
  }

  const getAltById = (id) => {
    const user = filterIt(users, id, 'id')[0]

    return user && user.full_name ? `${user.full_name} (${user.email})` : user?.email
  }

  return <div className="story-board-users">
    {invitations?.length ?
      <>
        <User alt={getAltById(invitations[0].userid)} name={getNameById(invitations[0].userid)} />
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