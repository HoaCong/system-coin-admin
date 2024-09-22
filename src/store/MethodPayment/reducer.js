import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  infoStatus: { ...status },
  actionStatus: { ...status },
  info: {},
  params: { limit: 10, page: 1 },
  meta: {
    total: 0,
  },
};

const methodPaymentReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.INFO:
        draft.infoStatus.isLoading = true;
        draft.infoStatus.isSuccess = false;
        draft.infoStatus.isFailure = false;
        break;

      case ActionTypes.INFO_SUCCESS:
        draft.infoStatus.isLoading = false;
        draft.infoStatus.isSuccess = true;
        draft.info = action.payload.data;
        break;

      case ActionTypes.INFO_FAILED:
        draft.infoStatus.isLoading = false;
        draft.infoStatus.isFailure = true;
        draft.info = {};
        draft.meta.total = 0;
        break;

      case ActionTypes.UPDATE:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.UPDATE_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        break;

      case ActionTypes.UPDATE_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.RESET_DATA_ACTION:
        draft.actionStatus = { ...status };
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default methodPaymentReducer;
