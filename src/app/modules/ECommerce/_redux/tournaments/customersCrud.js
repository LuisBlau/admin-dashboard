import axios from "axios";

const ABU = process.env.REACT_APP_API_BASE_URL;

export const ROUNDS_URL = ABU + "/rounds";

// CREATE =>  POST: add a new customer to the server
export function createRound(tournament) {
  let payload = {...tournament};

  delete(payload.id);
  delete(payload.gameId);
  return axios.post(`${ROUNDS_URL}?gameId=635792e04c66d1478c1a2eb4`, payload);
}

// READ
export function getAllRounds() {  
  return axios.get(`${ROUNDS_URL}?gameId=635792e04c66d1478c1a2eb4&limit=10&page=0&sortBy=roundId:desc`);
}

export function getRoundById(id) {
  return axios.get(`${ROUNDS_URL}/${id}?gameId=635792e04c66d1478c1a2eb4`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  return axios.post(`${ROUNDS_URL}/find`, { queryParams });
}

// UPDATE => patch: update the customer on the server
export function updateRound(tournament) {
  let payload = {...tournament};

  delete(payload.id);
  delete(payload.gameId);
  delete(payload.roundId);
  return axios.patch(`${ROUNDS_URL}/${tournament.id}?gameId=635792e04c66d1478c1a2eb4`, payload);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${ROUNDS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteRound(id) {
  return axios.delete(`${ROUNDS_URL}/${id}?gameId=635792e04c66d1478c1a2eb4`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${ROUNDS_URL}/deleteCustomers`, { ids });
}
