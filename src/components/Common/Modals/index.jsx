import React from "react"
import StoryFlowModal from "../../../pages/StoryFlow/components/StoryFlowModal"
import ConfirmPublish from "pages/StoryBoard/ConfirmPublish"
import { useSelector } from "react-redux"

const Modals = () => {

  const isStoryFlow = useSelector(state => state.Modals.isStoryFlow)
  const isConfirmPublish = useSelector(state => state.Modals.isConfirmPublish)

  return (
    <>
      {isStoryFlow && <StoryFlowModal />}
      {isConfirmPublish && <ConfirmPublish />}
    </>
  )
}

export default Modals