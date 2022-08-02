import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "reactstrap"
import { Link } from "react-router-dom"
import ChatDropdown from "../CommonForBoth/TopbarDropdown/ChatDropdown"
import Users from "../CommonForBoth/Users";
import User from "../CommonForBoth/Users/User";
import UserInvite from "../CommonForBoth/Users/UserInvite";
import StoryBoardService from "../../pages/StoryBoard/service";
import { useHistory } from "react-router-dom";
import { IconChevronLeft } from "../Common/Icon"

const HeaderStory = () => {
  const [storyId, setStoryId] = useState(null)
  const history = useHistory()
  const [isInviteModal, setIsInviteModal] = useState(false)

  useEffect(() => {
    let bId = localStorage.getItem("browserId")

    if (bId) {
      StoryBoardService.selectStory(null, bId, setStoryId)
    }
  }, [])

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
            <div onClick={() => setIsInviteModal(true)} className="me-3">
              <Users />
            </div>
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
        <h6>Invited users</h6>
        <hr />
        <div className="users-list-row">
          <div className="me-2"><User name="En Joe" /></div>
          <div className="me-2"><User name="An Joe" /></div>
          <div className="me-2"><User name="Bn Joe" /></div>
          <div className="me-2"><User name="Vn Joe" /></div>
          <div className="me-2"><User name="Rn Joe" /></div>
          <div className="me-2"><User name="Zon Joe" /></div>
        </div>
        <h6 className="mt-4">Add user</h6>
        <hr />
        <UserInvite />
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary btn-rounded ps-4 pe-4"
          onClick={() => {
            setIsInviteModal(false)
          }}
        >
          Invite
        </button>
      </div>
    </Modal>
  </header>
}

export default HeaderStory