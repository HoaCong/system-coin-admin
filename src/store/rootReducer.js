/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import changePasswordReducer from "./ChangePassword/reducer";
import coinReducer from "./Coin/reducer";
import customerReducer from "./Customer/reducer";
import employeeReducer from "./Employee/reducer";
import guireReducer from "./Guire/reducer";
import historiesReducer from "./Histories/reducer";
import loginReducer from "./Login/reducer";
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
});

export default rootReducer;
