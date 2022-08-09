// @flow
import {
  SET_CANVAS,
  SET_PREVIEW,
  SET_NOTIFICATION,
  SET_IS_LOADING,
  SET_FILES,
  SET_FILE,
  SET_IS_SAVING,
  SET_IS_FILES_UPLOADING,
  SET_PUBLISH,
  SET_INVITATIONS
} from "./actionTypes";

const INIT_STATE = {
  canvas: {},
  isLoading: false,
  isPreview: false,
  isSaving: false,
  isFilesUploading: false,
  isPublish: false,
  files: [],
  invitations: [],
};

const Editor = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_CANVAS:
      return {
        ...state,
        canvas: action.payload
      };
    case SET_PREVIEW:
      return {
        ...state,
        isPreview: action.payload
      };
    case SET_PUBLISH:
      return {
        ...state,
        isPublish: action.payload
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload
      };
    case SET_IS_FILES_UPLOADING:
      return {
        ...state,
        isFilesUploading: action.payload
      };
    case SET_FILES:
      return {
        ...state,
        files: action.payload
      };
    case SET_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      };
    case SET_INVITATIONS:
      return {
        ...state,
        invitations: action.payload
      };
    default:
      return state;
  }
};

export default Editor;
