import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const initialState = {
  toasts: [],
  popup: {},
};

const toastReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.ADD_TOAST:
        const time = new Date().getTime();
        draft.toasts = [...state.toasts, { ...action.payload, key: time }];
        break;

      case ActionTypes.SET_TOAST:
        draft.toasts = action.payload;
        break;

      case ActionTypes.OPEN_POPUP:
        draft.popup = action.payload;
        break;

      default:
        return state;
    }
  });
};

export default toastReducer;
