import * as ActionTypes from "./constant";

export const actionChangePassword = (params) => ({
  type: ActionTypes.CHANGE_PASSWORD,
  params,
});

export const actionChangePasswordSuccess = (payload) => ({
  type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const actionChangePasswordFailed = (error) => ({
  type: ActionTypes.CHANGE_PASSWORD_FAILED,
  error,
});
