import { all } from "redux-saga/effects";

import { sagas as mainSaga } from "../modules/MainPage";

export default function* rootSaga() {
  yield all([
    ...Object.values(mainSaga).map((saga) => saga()),
  ]);
}
