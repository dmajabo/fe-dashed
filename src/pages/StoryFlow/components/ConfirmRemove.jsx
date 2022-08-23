import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { openModal, closeModal } from "../../../store/modals/actions"
import { removeStory, getStories } from "../../../store/editor/actions"
import { Modal } from "reactstrap"

const ConfirmRemove = () => {

  const isConfirmRemove = useSelector(state => state.Modals.isConfirmRemove)
  const dispatch = useDispatch()
  const selectedStory = useSelector(state => state.Editor.selectedStory)

  const onRemove = () => {
    dispatch(removeStory(selectedStory))
    dispatch(closeModal('confirmRemove'))
    dispatch(getStories())
  }

  return <Modal centered contentClassName="dark" size="md" isOpen={isConfirmRemove} toggle={() => isConfirmRemove ? dispatch(closeModal('confirmRemove')) : dispatch(openModal('confirmRemove'))}>
  <div className="modal-header border-0 pb-0">
    <button
      type="button"
      onClick={() => dispatch(closeModal('confirmRemove'))}
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div className="modal-body">
    <h6 className="mt-4">Are you sure you want to remove the Story?</h6>
  </div>
  <div className="modal-footer">
    <button
      type="button"
      className="btn btn-secondary btn-rounded ps-4 pe-4"
      onClick={() => dispatch(closeModal('confirmRemove'))}
    >
      Cancel
    </button>
    <button
      type="button"
      className="btn btn-primary btn-rounded ps-4 pe-4"
      onClick={() => onRemove()}
    >
      Confirm
    </button>
  </div>
</Modal>
}

export default ConfirmRemove;