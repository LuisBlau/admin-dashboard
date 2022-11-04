import axios from "axios";

const ABU = process.env.REACT_APP_API_BASE_URL;

export const LEADERBOARD_URL = ABU + "/steams/leader-board";

// READ
export function getLeaderBoard(roundId) {  
  return axios.get(`${LEADERBOARD_URL}?gameId=635792e04c66d1478c1a2eb4&roundId=${roundId}&limit=100`);
}
