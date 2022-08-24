import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CLOSE_ALL_MODALS,
} from "./actionTypes";

export const openModal = (name, data) => ({
  type: OPEN_MODAL,
  payload: { name: name, data: data },
});

export const closeModal = name => ({
  type: CLOSE_MODAL,
  payload: { name: name },
});

export const closeAllModals = name => ({
  type: CLOSE_ALL_MODALS,
  payload: { name: name },
});