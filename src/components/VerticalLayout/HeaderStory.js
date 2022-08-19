import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "reactstrap"
import { Link } from "react-router-dom"
import ChatDropdown from "../CommonForBoth/TopbarDropdown/ChatDropdown"
import Users from "../CommonForBoth/Users";
import User from "../CommonForBoth/Users/User";
import UserInvite from "../CommonForBoth/Users/UserInvite";
import { useHistory } from "react-router-dom";
import { IconChevronLeft } from "../Common/Icon"
import { removeUser, inviteUser, getInvitations } from "../../store/editor/actions"
import { openModal } from "../../store/modals/actions"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../store/user/actions"
import { filterIt } from "helpers/scripts";
import { useLocation } from "react-router-dom";
import { supabase } from "supabaseClient";

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const HeaderStory = () => {
  const history = useHistory()
  const [isInviteModal, setIsInviteModal] = useState(false)
  const dispatch = useDispatch()
  const canvas = useSelector(state => state.Editor.canvas)
  const storyId = canvas?.id
  const users = useSelector(state => state.User.users)
  const invitations = useSelector(state => state.Editor.invitations)
  const isSaving = useSelector(state => state.Editor.isSaving)
  const isPreview = useSelector(state => state.Editor.isPreview)
  const [invite, setInvite] = useState()
  const [role, setRole] = useState("Edit")
  const [useridForRemove, setUserIdForRemove] = useState(null)
  const [isRemoveUser, setIsRemoveUser] = useState(false)
  const [isConfirmPublish, setIsConfirmPublish] = useState(false)
  let query = useQuery();
  const id = query.get("id");
  const user = supabase.auth.user()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    if (canvas?.id && isSaving == false) dispatch(getInvitations(canvas.id))
  }, [canvas, isSaving])

  const onInvite = () => {
    dispatch(inviteUser(invite, canvas, role))
    setIsInviteModal(false)
  }

  const getNameById = (id) => {
    const user = filterIt(users, id, 'id')[0]

    return user && user.full_name ? user.full_name : user?.email
  }

  const getAltById = (id) => {
    const user = filterIt(users, id, 'id')[0]

    return user && user.full_name ? `${user.full_name} (${user.email})` : user?.email
  }

  const filterUsers = () => {
    return users.filter((user) => (!filterIt(invitations, user.id, 'userid').length))
  }

  const onRemoveUser = () => {
    dispatch(removeUser(useridForRemove, storyId))
    setUserIdForRemove(null)
    setIsRemoveUser(null)
    dispatch(getInvitations(canvas.id))
  }

  return <header id="page-topbar">
    <div className="story-board-header">
      <Container fluid>
        <Row>
          <Col md={6}>
            <div className="d-flex align-items-center">
              <div
                onClick={() => history.push(`general-dashboard`)}
                className="story-board-header-back"
              >
                <IconChevronLeft />
              </div>
              {canvas?.canvas &&
                <div>
                  <div className="story-board-header-title">Data Stories / {canvas.title}</div>
                  <div className="story-board-header-links">
                    <Link className="active" to={`/story-board?id=${canvas.id}`}>{canvas.title}</Link>
                    <Link onClick={() => dispatch(openModal("storyFlow"))}>New</Link>
                  </div>
                </div>
              }
            </div>
          </Col>
          {user?.id == canvas?.userid &&
            <Col className="d-flex align-items-center justify-content-end" md={6}>
              <div onClick={() => setIsInviteModal(true)} className="me-3">
                <Users invitations={invitations} users={users} />
              </div>
              <div className="me-3">
                <ChatDropdown />
              </div>
              <div className="story-board-header-buttons">
                <button
                  onClick={() => {
                    isPreview ? history.push(`story-board?id=${storyId}`) : history.push(`story-board?id=${storyId}&preview=true`)
                  }}
                  className="story-board-header-btnt me-4">
                  {isPreview ? 'Back' : 'Preview'}
                </button>
                <Button
                  color="primary"
                  onClick={() => dispatch(openModal('confirmPublish'))}
                  className="btn-rounded">
                  {canvas.published ? 'Unpublish' : 'Publish'}
                </Button>
              </div>
            </Col>
          }
        </Row>
      </Container>
    </div>
    <Modal centered contentClassName="dark" size="lg" isOpen={isInviteModal} toggle={() => setIsInviteModal(!isInviteModal)}>
      <div className="modal-header border-0 pb-0">
        <button
          type="button"
          onClick={() => setIsInviteModal(false)}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {invitations?.length > 0 &&
          <>
            <h6>Invited users</h6>
            <hr />
            <div className="users-list-row">
              {users && invitations?.map((invite, i) => (
                <div key={`inc-${i}`} className="me-2">
                  <User
                    isCanRemove
                    onRemove={() => {
                      setUserIdForRemove(invite.userid);
                      setIsRemoveUser(true)
                    }}
                    name={getNameById(invite.userid)}
                    alt={getAltById(invite.userid)}
                  />
                </div>
              ))}
            </div>
          </>
        }
        <h6 className="mt-4">Add user</h6>
        <hr />
        <UserInvite onChange={(user, role) => {
          setInvite(user);
          setRole(role)
        }}
          users={filterUsers()} />
      </div>
      <div className="modal-footer">
        <button
          disabled={!invite?.id}
          type="button"
          className="btn btn-primary btn-rounded ps-4 pe-4"
          onClick={onInvite}
        >
          Invite
        </button>
      </div>
    </Modal>
    <Modal centered contentClassName="dark" size="md" isOpen={isRemoveUser} toggle={() => setIsRemoveUser(!isRemoveUser)}>
      <div className="modal-header border-0 pb-0">
        <button
          type="button"
          onClick={() => setIsRemoveUser(false)}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <h6 className="mt-4">Are you sure you want to remove the user?</h6>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary btn-rounded ps-4 pe-4"
          onClick={() => setIsRemoveUser(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary btn-rounded ps-4 pe-4"
          onClick={onRemoveUser}
        >
          Confirm
        </button>
      </div>
    </Modal>
  </header >
}

export default HeaderStory