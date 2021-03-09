import { combineReducers } from "redux";

import { reducer as usersReducer } from "../modules/MainPage";

const rootReducer = combineReducers({
  usersStore: usersReducer,
});

export default rootReducer;
