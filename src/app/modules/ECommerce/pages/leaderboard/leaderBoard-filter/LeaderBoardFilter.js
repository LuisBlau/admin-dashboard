import React, { useMemo, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useLeaderBoardUIContext } from "../LeaderBoardUIContext";
import * as actions from "../../../_redux/tournaments/customersActions";

const prepareFilter = (queryParams, values) => {
  const { roundId } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by roundId
  filter.roundId = roundId !== "" ? roundId : undefined;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function LeaderBoardFilter({ isListLoading }) {
  // LeaderBoard UI Context
  const leaderBoardUIContext = useLeaderBoardUIContext();
  const leaderBoardUIProps = useMemo(() => {
    return {
      queryParams: leaderBoardUIContext.queryParams,
      setQueryParams: leaderBoardUIContext.setQueryParams,
    };
  }, [leaderBoardUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(leaderBoardUIProps.queryParams, values);
    if (!isEqual(newQueryParams, leaderBoardUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      leaderBoardUIProps.setQueryParams(newQueryParams);
    }
  };

  // Getting curret state of leaderBoard list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rounds }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCustomers());   
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          // roundId: '-1'
          roundId: entities ? entities[0].roundId : '-1'
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="roundId"
                  placeholder="Filter by Round Id"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("roundId", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.roundId}
                >
                  <option value="-1" key={0}>None</option>
                  {entities && entities.map((iter, index) => (
                    <option value={iter.roundId} key={index}>{iter.roundId}</option>
                  ))}
                </select>
                <small className="form-text text-muted">
                  <b>Select</b> Round Id
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
