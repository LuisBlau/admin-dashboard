import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {leaderBoardSlice} from "../app/modules/ECommerce/_redux/leaderboard/leaderboardSlice";
import {roundsSlice} from "../app/modules/ECommerce/_redux/tournaments/customersSlice";
// import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  leaderBoard: leaderBoardSlice.reducer,
  rounds: roundsSlice.reducer,
  // specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
