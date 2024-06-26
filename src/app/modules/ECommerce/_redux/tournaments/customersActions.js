import * as requestFromServer from "./customersCrud";
import {roundsSlice, callTypes} from "./customersSlice";

const {actions} = roundsSlice;

export const fetchCustomers = queryParams => dispatch => {


  // alert('fetchs')
  dispatch(actions.startCall({ callType: callTypes.list }));
  
//   fetch("https://api.playestates.com/v1/rounds?gameId=635792e04c66d1478c1a2eb4&limit=10&page=0&sortBy=roundId:desc")
//   .then(res => res.json())
//   .then(
//     (result) => {
//       console.log(result)
//       const totalCount = result.totalResults;
//       const entities = result.results;
// //      result = JSON.parse(result)
//       dispatch(actions.customersFetched({ totalCount, entities }));
//     },
//     // Note: it's important to handle errors here
//     // instead of a catch() block so that we don't swallow
//     // exceptions from actual bugs in components.
//     (error) => {
//       error.clientMessage = "Can't find customers";
//       dispatch(actions.catchError({ error, callType: callTypes.list }));
//     }
//   )

  return requestFromServer
    .getAllRounds()
    .then(response => {
      const totalCount = response.data.totalResults;
      const entities = response.data.results;
      dispatch(actions.customersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomer = id => dispatch => {
  if (!id) {
    return dispatch(actions.customerFetched({ customerForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRoundById(id)
    .then(response => {
      const customer = response.data;
      dispatch(actions.customerFetched({ customerForEdit: customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't find customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomer = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRound(id)
    .then(response => {
      dispatch(actions.customerDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomer = customerForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRound(customerForCreation)
    .then(response => {
      const customer = response.data;
      
      dispatch(actions.customerCreated({ customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = customer => dispatch => {
  // alert('update')
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRound(customer)
    .then(() => {
      dispatch(actions.customerUpdated({ customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't update customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomersStatus = (ids, status) => dispatch => {
  // alert('update status')
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCustomers(ids, status)
    .then(() => {
      dispatch(actions.customersStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update customers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomers = ids => dispatch => {
  // alert('deletes')
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomers(ids)
    .then(() => {
      dispatch(actions.customersDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
