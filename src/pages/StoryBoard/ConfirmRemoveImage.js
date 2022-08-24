import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { openModal, closeModal } from "../../store/modals/actions"
import { removeImage, getFiles } from "../../store/editor/actions"
import { Modal } from "reactstrap"

const ConfirmRemoveImage = () => {

  const isConfirmRemoveImage = useSelector(state => state.Modals.isConfirmRemoveImage)
  const data = useSelector(state => state.Modals.data)
  const dispatch = useDispatch()

  const onRemove = () => {
    dispatch(removeImage('images/', data))
    dispatch(closeModal('confirmRemoveImage'))
  }

  return <Modal centered contentClassName="dark" size="md" isOpen={isConfirmRemoveImage} toggle={() => isConfirmRemoveImage ? dispatch(closeModal('confirmRemoveImage')) : dispatch(openModal('confirmRemoveImage'))}>
    <div className="modal-header border-0 pb-0">
      <button
        type="button"
        onClick={() => dispatch(closeModal('confirmRemoveImage'))}
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <h6 className="mt-4">Are you sure you want to remove the Image?</h6>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary btn-rounded ps-4 pe-4"
        onClick={() => dispatch(closeModal('confirmRemoveImage'))}
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

export default ConfirmRemoveImage;