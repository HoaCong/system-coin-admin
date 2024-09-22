import { ENDPOINT } from "constants/routerApi";
import { GET, PUT } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionGetInfoFailed,
  actionGetInfoSuccess,
  actionUpdateFailed,
  actionUpdateSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiInfo({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.SETTING, params);
    if (response.status === 200) {
      yield put(actionGetInfoSuccess(response.data));
    } else {
      yield put(actionGetInfoFailed());
    }
  } catch (error) {
    yield put(actionGetInfoFailed(error.response.data.error));
  }
}

function* callApiUpdate({ params }) {
  try {
    const response = yield call(PUT, ENDPOINT.SETTING, params);

    if (response.status === 200) {
      yield put(actionUpdateSuccess(params));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionUpdateFailed());
      yield put(
        addToast({
          text: "Cập nhật thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionUpdateFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Cập nhật thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* methodPaymentSaga() {
  yield all([
    yield takeLeading(ActionTypes.INFO, callApiInfo),
    yield takeLatest(ActionTypes.UPDATE, callApiUpdate),
  ]);
}
