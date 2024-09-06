import { ENDPOINT } from "constants/routerApi";
import { PUT } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionLogout } from "store/Login/action";
import { addToast } from "store/Toast/action";
import {
  actionChangePasswordFailed,
  actionChangePasswordSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiChangePassword({ params }) {
  try {
    const { id, email, password } = params;
    const response = yield call(PUT, ENDPOINT.CHANGE_PASSWORD + id, {
      email,
      password,
    });
    if (response.status === 200) {
      yield put(actionChangePasswordSuccess(response.data.data));
      yield put(
        addToast({
          text: "Cập nhật mật khẩu thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionChangePasswordFailed());
      yield put(
        addToast({
          text: "Cập nhật mật khẩu thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    // if (error.response.status === 401) {
    //   yield put(actionLogout());
    //   yield put(
    //     addToast({
    //       text: "Tài khoản được đăng nhập từ nơi khác, vui lòng đăng nhập lại để sử dụng",
    //       type: "warning",
    //       title: "",
    //       life: 5000,
    //     })
    //   );
    // }
    yield put(actionChangePasswordFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Cập nhật mật khẩu thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* changePasswordSaga() {
  yield all([
    yield takeLeading(ActionTypes.CHANGE_PASSWORD, callApiChangePassword),
  ]);
}
