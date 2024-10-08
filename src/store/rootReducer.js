/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import changePasswordReducer from "./ChangePassword/reducer";
import coinReducer from "./Coin/reducer";
import contactReducer from "./Contact/reducer";
import customerReducer from "./Customer/reducer";
import employeeReducer from "./Employee/reducer";
import guireReducer from "./Guire/reducer";
import historiesReducer from "./Histories/reducer";
import withdrawReducer from "./HistoriesWithDraw/reducer";
import loginReducer from "./Login/reducer";
import methodPaymentReducer from "./MethodPayment/reducer";
import newsReducer from "./News/reducer";
import toastReducer from "./Toast/reducer";

const rootReducer = combineReducers({
  loginReducer,
  toastReducer,
  employeeReducer,
  guireReducer,
  newsReducer,
  changePasswordReducer,
  customerReducer,
  coinReducer,
  historiesReducer,
  contactReducer,
  methodPaymentReducer,
  withdrawReducer,
});

export default rootReducer;
