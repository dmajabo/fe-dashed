import React from "react"
import StoryFlowModal from "../../../pages/StoryFlow/components/StoryFlowModal"
import { useSelector } from "react-redux"

const Modals = () => {

  const isStoryFlow = useSelector(state => state.Modals.isStoryFlow)

  return (
    isStoryFlow && <StoryFlowModal />
  )
}

export default Modals