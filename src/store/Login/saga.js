import { ENDPOINT } from "constants/routerApi";
import { POST } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionLoginFailed,
  actionLoginSuccess,
  actionRegisterFailed,
  actionRegisterSuccess,
} from "./action";
import * as ActionTypes from "./constant";

const getTimeExpired = () => {
  return new Date().getTime() + 12 * 60 * 60 * 1000;
};

function* callApiLogin({ params, isRemember }) {
  try {
    const response = yield call(POST, ENDPOINT.LOGIN, params);
    if (response.status === 200) {
      if (isRemember) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.employee));
        localStorage.setItem("time_expired", getTimeExpired());
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("time_expired");
      }
      yield put(
        actionLoginSuccess({ ...response.data, timeExpired: getTimeExpired() })
      );
    } else {
      yield put(actionLoginFailed());
    }
  } catch (error) {
    yield put(actionLoginFailed(error.response.data.message));
  }
}

function* callApiRegister({ params }) {
  try {
    const response = yield call(POST, ENDPOINT.REGISTER, params);

    if (response.status === 200) {
      yield put(
        addToast({
          text: "Đăng ký thành công",
          type: "success",
          title: "",
        })
      );
      yield put(actionRegisterSuccess(response.data));
    } else {
      yield put(
        addToast({
          text: "Đăng ký thất bại",
          type: "danger",
          title: "",
        })
      );
      yield put(actionRegisterFailed());
    }
  } catch (error) {
    yield put(
      addToast({
        text: "Đăng ký thất bại",
        type: "danger",
        title: "",
      })
    );
    yield put(actionRegisterFailed(error.response.data.message));
  }
}

export default function* loginSaga() {
  yield all([
    yield takeLeading(ActionTypes.LOGIN, callApiLogin),
    yield takeLeading(ActionTypes.REGISTER, callApiRegister),
  ]);
}
