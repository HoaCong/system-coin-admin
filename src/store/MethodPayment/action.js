import * as ActionTypes from "./constant";

export const actionGetInfo = (params) => ({
  type: ActionTypes.INFO,
  params,
});

export const actionGetInfoSuccess = (payload) => ({
  type: ActionTypes.INFO_SUCCESS,
  payload,
});

export const actionGetInfoFailed = (error) => ({
  type: ActionTypes.INFO_FAILED,
  error,
});

export const actionUpdate = (params) => ({
  type: ActionTypes.UPDATE,
  params,
});

export const actionUpdateSuccess = (payload) => ({
  type: ActionTypes.UPDATE_SUCCESS,
  payload,
});

export const actionUpdateFailed = (error) => ({
  type: ActionTypes.UPDATE_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});

export const resetDataAction = () => ({
  type: ActionTypes.RESET_DATA_ACTION,
});
