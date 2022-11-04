import {createSlice} from "@reduxjs/toolkit";

const initialLeaderBoardState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  customerForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState: initialLeaderBoardState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // findLeaderBoard
    leaderBoardFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    }
  }
});
