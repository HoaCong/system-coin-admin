import produce from "immer";
import * as ActionTypes from "./constant";

const status = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
};
// DEFAULT STATE
const initialState = {
  status,
};

const changePasswordReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.CHANGE_PASSWORD:
        draft.status.isLoading = true;
        draft.status.isSuccess = false;
        draft.status.isFailure = false;
        break;

      case ActionTypes.CHANGE_PASSWORD_SUCCESS:
        draft.status.isLoading = false;
        draft.status.isSuccess = true;
        break;

      case ActionTypes.CHANGE_PASSWORD_FAILED:
        draft.status.isLoading = false;
        draft.status.isFailure = true;
        break;

      default:
        return state;
    }
  });
};

export default changePasswordReducer;
