import { ENDPOINT } from "constants/routerApi";
import { DELETE, GET, POST, PUT } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionAddFailed,
  actionAddSuccess,
  actionChangeActiveFailed,
  actionChangeActiveSuccess,
  actionDeleteFailed,
  actionDeleteSuccess,
  actionDetailFailed,
  actionDetailSuccess,
  actionEditFailed,
  actionEditSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.LIST_EMPLOYEE, params);
    if (response.status === 200) {
      yield put(actionGetListSuccess(response.data));
    } else {
      yield put(actionGetListFailed());
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
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiAdd({ params }) {
  try {
    const response = yield call(POST, ENDPOINT.ADD_EMPLOYEE, params);
    if (response.status === 200) {
      yield put(actionAddSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionAddFailed());
      yield put(
        addToast({
          text: response.message || "Thêm nhân viên thất bại",
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
    yield put(actionAddFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Thêm nhân viên thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEdit({ params }) {
  try {
    const { id } = params;
    const response = yield call(PUT, ENDPOINT.EDIT_EMPLOYEE + id, params);

    if (response.status === 200) {
      yield put(actionEditSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditFailed());
      yield put(
        addToast({
          text: "Cập nhật nhân viên thất bại",
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
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Cập nhật nhân viên thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiChangeActive({ id }) {
  try {
    const response = yield call(PUT, ENDPOINT.ACTIVE_EMPLOYEE + id);
    if (response.status === 200) {
      yield put(actionChangeActiveSuccess(id));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionChangeActiveFailed());
      yield put(
        addToast({
          text: "Cập nhật nhân viên thất bại",
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
    yield put(actionDeleteFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Cập nhật nhân viên thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDelete({ id }) {
  try {
    const response = yield call(DELETE, ENDPOINT.DELETE_EMPLOYEE + id);
    if (response.status === 200) {
      yield put(actionDeleteSuccess(id));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionDeleteFailed());
      yield put(
        addToast({
          text: "Xoá nhân viên thất bại",
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
    yield put(actionDeleteFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Xoá nhân viên thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDetail({ id }) {
  try {
    const response = yield call(GET, ENDPOINT.DETAIL_EMPLOYEE + id);
    if (response.status === 200) {
      yield put(actionDetailSuccess(response.data.data));
    } else {
      yield put(actionDetailFailed());
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
    yield put(actionDetailFailed(error.response.data.error));
  }
}

function* callApiUpdateDetail({ params }) {
  try {
    const { id } = params;
    const response = yield call(
      PUT,
      ENDPOINT.UPDATE_DETAIL_EMPLOYEE + id,
      params
    );

    if (response.status === 200) {
      yield put(actionEditSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditFailed());
      yield put(
        addToast({
          text: "Cập nhật nhân viên thất bại",
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
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Cập nhật nhân viên thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* employeeSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLatest(ActionTypes.ADD, callApiAdd),
    yield takeLatest(ActionTypes.EDIT, callApiEdit),
    yield takeLatest(ActionTypes.CHANGE_ACTIVE, callApiChangeActive),
    yield takeLatest(ActionTypes.DELETE, callApiDelete),
    yield takeLatest(ActionTypes.DETAIL, callApiDetail),
    yield takeLatest(ActionTypes.UPDATE, callApiUpdateDetail),
  ]);
}
