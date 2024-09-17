import * as ActionTypes from "./constant";

export const actionGetList = (params) => ({
  type: ActionTypes.LIST,
  params,
});

export const actionGetListSuccess = (payload) => ({
  type: ActionTypes.LIST_SUCCESS,
  payload,
});

export const actionGetListFailed = (error) => ({
  type: ActionTypes.LIST_FAILED,
  error,
});

export const actionConfirm = (params) => ({
  type: ActionTypes.CONFIRM,
  params,
});

export const actionConfirmSuccess = (payload) => ({
  type: ActionTypes.CONFIRM_SUCCESS,
  payload,
});

export const actionConfirmFailed = (error) => ({
  type: ActionTypes.CONFIRM_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});

export const resetDataAction = () => ({
  type: ActionTypes.RESET_DATA_ACTION,
});
