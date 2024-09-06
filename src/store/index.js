/* quy phạm khai báo store sử dụng Saga */
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, //khai báo rootReducer
  composeEnhancers(applyMiddleware(sagaMiddleware)) //khai báo Middleware Saga
);

sagaMiddleware.run(rootSaga); //chạy Saga

export default store;
