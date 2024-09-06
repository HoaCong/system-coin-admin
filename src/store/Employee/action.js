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

export const actionAdd = (params) => ({
  type: ActionTypes.ADD,
  params,
});

export const actionAddSuccess = (payload) => ({
  type: ActionTypes.ADD_SUCCESS,
  payload,
});

export const actionAddFailed = (error) => ({
  type: ActionTypes.ADD_FAILED,
  error,
});

export const actionEdit = (params) => ({
  type: ActionTypes.EDIT,
  params,
});

export const actionEditSuccess = (payload) => ({
  type: ActionTypes.EDIT_SUCCESS,
  payload,
});

export const actionEditFailed = (error) => ({
  type: ActionTypes.EDIT_FAILED,
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

export const actionDelete = (id) => ({
  type: ActionTypes.DELETE,
  id,
});

export const actionDeleteSuccess = (id) => ({
  type: ActionTypes.DELETE_SUCCESS,
  id,
});

export const actionDeleteFailed = (error) => ({
  type: ActionTypes.DELETE_FAILED,
  error,
});

export const actionDetail = (id) => ({
  type: ActionTypes.DETAIL,
  id,
});

export const actionDetailSuccess = (payload) => ({
  type: ActionTypes.DETAIL_SUCCESS,
  payload,
});

export const actionDetailFailed = (error) => ({
  type: ActionTypes.DETAIL_FAILED,
  error,
});

export const actionChangeActive = (id) => ({
  type: ActionTypes.CHANGE_ACTIVE,
  id,
});

export const actionChangeActiveSuccess = (id) => ({
  type: ActionTypes.CHANGE_ACTIVE_SUCCESS,
  id,
});

export const actionChangeActiveFailed = (error) => ({
  type: ActionTypes.CHANGE_ACTIVE_FAILED,
  error,
});

export const actionDownloadExcel = (id) => ({
  type: ActionTypes.DOWNLOAD_EXCEL,
  id,
});

export const actionDownloadExcelSuccess = (payload) => ({
  type: ActionTypes.DOWNLOAD_EXCEL_SUCCESS,
  payload,
});

export const actionDownloadExcelFailed = (error) => ({
  type: ActionTypes.DOWNLOAD_EXCEL_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
