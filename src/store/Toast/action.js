import * as ActionTypes from "./constant";

export const addToast = (payload) => {
  return {
    type: ActionTypes.ADD_TOAST,
    payload,
  };
};

export const setToast = (payload) => {
  return {
    type: ActionTypes.SET_TOAST,
    payload,
  };
};

export const openPopup = (payload) => {
  return {
    type: ActionTypes.OPEN_POPUP,
    payload,
  };
};
