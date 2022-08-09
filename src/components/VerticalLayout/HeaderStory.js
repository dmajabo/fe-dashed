import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "reactstrap"
import { Link } from "react-router-dom"
import ChatDropdown from "../CommonForBoth/TopbarDropdown/ChatDropdown"
import Users from "../CommonForBoth/Users";
import User from "../CommonForBoth/Users/User";
import UserInvite from "../CommonForBoth/Users/UserInvite";
import { useHistory } from "react-router-dom";
import { IconChevronLeft } from "../Common/Icon"
import { supabase } from "supabaseClient";
import { getStory, inviteUser, getInvitations } from "../../store/editor/actions"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../store/user/actions"
import { filterIt } from "helpers/scripts";
import { useLocation } from "react-router-dom";

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
  const [invite, setInvite] = useState()
  const [role, setRole] = useState("Edit")
  let query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    if (canvas?.id && isSaving == false && !id) dispatch(getInvitations(canvas.id))
  }, [canvas, isSaving])

  const onInvite = () => {
    dispatch(inviteUser(invite, canvas, role))
    setIsInviteModal(false)
  }

  const getNameById = (id) => {
    const user = filterIt(users, id, 'id')[0]

    return user && user.full_name ? user.full_name : user.email
  }

  const filterUsers = () => {
    return users.filter((user) => (!filterIt(invitations, user.id, 'userId').length))
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
              <div>
                <div className="story-board-header-title">Data Stories / The Story of Solana</div>
                <div className="story-board-header-links">
                  <Link className="active" to={'/story-board'}>The Story of Solana</Link>
                  <Link to={'/story-flow'}>New</Link>
                </div>
              </div>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-end" md={6}>
            {!id &&
              <div onClick={() => setIsInviteModal(true)} className="me-3">
                <Users invitations={invitations} users={users} />
              </div>
            }
            <div className="me-3">
              <ChatDropdown />
            </div>
            <div className="story-board-header-buttons">
              <button
                onClick={() => history.push(`story-board?id=${storyId}&preview=true`)}
                className="story-board-header-btnt me-4">
                Preview
              </button>
              <Button
                color="primary"
                onClick={() => history.push(`story-board?id=${storyId}&publish=true`)}
                className="btn-rounded">
                Publish
              </Button>
            </div>
          </Col>
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
                <div key={`inc-${i}`} className="me-2"><User name={getNameById(invite.userId)} /></div>
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
  </header>
}

export default HeaderStory