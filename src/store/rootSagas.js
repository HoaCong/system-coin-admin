/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";
import changePasswordSaga from "./ChangePassword/saga";
import coinSaga from "./Coin/saga";
import customerSaga from "./Customer/saga";
import employeeSaga from "./Employee/saga";
import guireSaga from "./Guire/saga";
import loginSaga from "./Login/saga";
import newsSaga from "./News/saga";
export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(employeeSaga),
    fork(changePasswordSaga),
    fork(newsSaga),
    fork(coinSaga),
    fork(guireSaga),
    fork(customerSaga),
  ]);
}
