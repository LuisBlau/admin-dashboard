import axios from "axios";

const ABU = process.env.REACT_APP_API_BASE_URL;

export const CUSTOMERS_URL = ABU + "/users";

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
  let payload = {...customer};

  delete(payload.id);
  delete(payload.steam);
  delete(payload.role);
  delete(payload.isEmailVerified);
  delete(payload.provider);
  return axios.post(CUSTOMERS_URL, payload);
}

// READ
export function getAllCustomers() {  
  return axios.get(`${CUSTOMERS_URL}?role=user`);
}

export function getCustomerById(customerId) {
  return axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
}

// UPDATE => patch: update the customer on the server
export function updateCustomer(customer) {
  let payload = {...customer};

  delete(payload.id);
  delete(payload.steam);
  delete(payload.role);
  delete(payload.isEmailVerified);
  delete(payload.provider);
  return axios.patch(`${CUSTOMERS_URL}/${customer.id}`, payload);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
