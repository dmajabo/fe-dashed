import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"
import ChatDropdown from "../CommonForBoth/TopbarDropdown/ChatDropdown"
import Users from "../CommonForBoth/Users";
import StoryBoardService from "../../pages/StoryBoard/service";
import { useHistory } from "react-router-dom";
import { IconChevronLeft } from "../Common/Icon"

const HeaderStory = () => {
  const [storyId, setStoryId] = useState(null)
  const history = useHistory()

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
            <div className="me-3">
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
              <Button color="primary" className="btn-rounded">Publish</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </header>
}

export default HeaderStory