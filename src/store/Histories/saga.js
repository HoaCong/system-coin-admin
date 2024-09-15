import { ENDPOINT } from "constants/routerApi";
import { DELETE, GET, POST, PUT } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionCancelFailed,
  actionCancelSuccess,
  actionConfirmFailed,
  actionConfirmSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.LIST_HISTORIES, params);
    if (response.status === 200) {
      yield put(actionGetListSuccess(response.data));
    } else {
      yield put(actionGetListFailed());
    }
  } catch (error) {
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiCancel({ params }) {
  try {
    const response = yield call(PUT, ENDPOINT.CANCEL_HISTORIES(params.id));

    if (response.status === 200) {
      yield put(actionCancelSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionCancelFailed());
      yield put(
        addToast({
          text: "Từ chối giao dịch thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionCancelFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Từ chối giao dịch thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiConfirm({ params }) {
  try {
    const response = yield call(PUT, ENDPOINT.CONFIRM_HISTORIES(params.id));

    if (response.status === 200) {
      yield put(actionConfirmSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionConfirmFailed());
      yield put(
        addToast({
          text: "Xác nhận giao dịch thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionConfirmFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Xác nhận giao dịch thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* historiesSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLatest(ActionTypes.CANCEL, callApiCancel),
    yield takeLatest(ActionTypes.CONFIRM, callApiConfirm),
  ]);
}
