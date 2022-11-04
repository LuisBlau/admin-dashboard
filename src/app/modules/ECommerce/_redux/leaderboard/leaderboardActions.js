import * as requestFromServer from "./leaderboardCrud";
import {leaderBoardSlice, callTypes} from "./leaderboardSlice";

const {actions} = leaderBoardSlice;

export const fetchLeaderBoard = queryParams => dispatch => {
  if (queryParams.filter.roundId === "-1" || queryParams.filter.roundId === "") return;
  // alert('fetchs')
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getLeaderBoard(queryParams.filter.roundId)
    .then(response => {
      const entities = response.data;
      // console.log(entities)
      dispatch(actions.leaderBoardFetched({ totalCount: 0, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find Leader Board";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

