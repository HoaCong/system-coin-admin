import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  listStatus: { ...status },
  actionStatus: { ...status },
  list: [],
  params: { limit: 10, page: 1 },
  meta: {
    total: 0,
  },
};

const coinReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LIST:
        draft.listStatus.isLoading = true;
        draft.listStatus.isSuccess = false;
        draft.listStatus.isFailure = false;
        draft.params.page = action.params.page;
        break;

      case ActionTypes.LIST_SUCCESS:
        draft.listStatus.isLoading = false;
        draft.listStatus.isSuccess = true;
        draft.list = action.payload.data;
        draft.meta.total = action.payload.total;
        break;

      case ActionTypes.LIST_FAILED:
        draft.listStatus.isLoading = false;
        draft.listStatus.isFailure = true;
        draft.list = [];
        break;

      case ActionTypes.ADD:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.ADD_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.list = [action.payload, ...state.list];
        break;

      case ActionTypes.ADD_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.EDIT:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.EDIT_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.list = state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        break;

      case ActionTypes.EDIT_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.DELETE:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.DELETE_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.list = state.list.filter((item) => item.id !== action.id);
        break;

      case ActionTypes.DELETE_FAILED:
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

export default coinReducer;
