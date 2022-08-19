import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { openModal, closeModal } from "../../store/modals/actions"
import { publish, getStory } from "../../store/editor/actions"
import { useHistory } from "react-router-dom"
import { supabase } from "supabaseClient"
import { Modal } from "reactstrap"

const confirmPublish = () => {

  const isConfirmPublish = useSelector(state => state.Modals.isConfirmPublish)
  const dispatch = useDispatch()
  const history = useHistory()
  const canvas = useSelector(state => state.Editor.canvas)
  const storyId = canvas?.id
  const user = supabase.auth.user()

  const onPublish = (state) => {
    dispatch(publish(storyId, !state))
    dispatch(closeModal('confirmPublish'))
    dispatch(getStory(storyId, false, false))
    if (!state) history.push(`story-board?id=${storyId}&publish=true`)
  }

  return <Modal centered contentClassName="dark" size="md" isOpen={isConfirmPublish} toggle={() => isConfirmPublish ? dispatch(closeModal('confirmPublish')) : dispatch(openModal('confirmPublish'))}>
  <div className="modal-header border-0 pb-0">
    <button
      type="button"
      onClick={() => dispatch(closeModal('confirmPublish'))}
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div className="modal-body">
    <h6 className="mt-4">Are you sure you want to {canvas.published ? 'unpublish' : 'publish'} the Story?</h6>
  </div>
  <div className="modal-footer">
    <button
      type="button"
      className="btn btn-secondary btn-rounded ps-4 pe-4"
      onClick={() => dispatch(closeModal('confirmPublish'))}
    >
      Cancel
    </button>
    <button
      type="button"
      className="btn btn-primary btn-rounded ps-4 pe-4"
      onClick={() => onPublish(canvas.published)}
    >
      Confirm
    </button>
  </div>
</Modal>
}

export default confirmPublish;