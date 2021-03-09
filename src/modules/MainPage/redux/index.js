import produce from "immer";
import * as types from "./types";

const authState = {
  users: [],
  newUsers: [],
  errors: [],
  calcResult: "",
  dateRange: "",
};

export default (state = authState, action) => {
  const { type, payload } = action;
  return produce(state, (draft) => {
    switch (type) {
      case types.GET_USERS_SUCCESS:
        draft.users = payload;
        break;
      case types.GET_CALCULATE_SUCCESS:
        draft.calcResult = payload.result;
        draft.dateRange = payload.dateRange;
        break;
      case types.ADD_USER:
        draft.newUsers = [...state.newUsers, payload];
        break;
      case types.SAVE_USERS_SUCCESS:
        draft.users = [...state.users,...state.newUsers, payload];
        break;
      case types.SAVE_ALL_USERS_SUCCESS:
        draft.users = [...state.users, payload];
        break;
      case types.DELETE_USER:
        draft.newUsers = [...state.newUsers.filter((item) => item.id !== payload)];
        break;
      case types.DELETE_ALL_USER:
        draft.newUsers = [];
        break;
      case types.GET_USERS_ERROR:
        draft.errors = payload;
        break;
        case types.CLEAR_NEW_USERS:
          draft.newUsers = state.newUsers.filter((el) => el.id !== payload);
        break;
      default:
        break;
    }
  });
};
