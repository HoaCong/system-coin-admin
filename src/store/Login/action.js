import * as ActionTypes from "./constant";

export const actionLogin = (params, isRemember = false) => ({
  type: ActionTypes.LOGIN,
  params,
  isRemember,
});

export const actionLoginSuccess = (payload) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const actionLoginFailed = (error) => ({
  type: ActionTypes.LOGIN_FAILED,
  error,
});

export const actionLogout = () => ({
  type: ActionTypes.LOGOUT,
});

export const actionRegister = (params) => ({
  type: ActionTypes.REGISTER,
  params,
});

export const actionRegisterSuccess = (payload) => ({
  type: ActionTypes.REGISTER_SUCCESS,
  payload,
});

export const actionRegisterFailed = (error) => ({
  type: ActionTypes.REGISTER_FAILED,
  error,
});

export const actionUpdateUserLogin = (data) => ({
  type: ActionTypes.UPDATE_USER_LOGIN,
  data,
});

export const actionClearError = () => ({
  type: ActionTypes.CLEAR_ERROR,
});

export const actionMinusCountCheck = () => ({
  type: ActionTypes.MINUS_COUNT_CHECK,
});
