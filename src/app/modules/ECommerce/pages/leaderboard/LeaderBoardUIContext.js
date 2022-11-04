import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./LeaderBoardUIHelpers";

const LeaderBoardUIContext = createContext();

export function useLeaderBoardUIContext() {
  return useContext(LeaderBoardUIContext);
}

export const LeaderBoardUIConsumer = LeaderBoardUIContext.Consumer;

export function LeaderBoardUIProvider({children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams
  };

  return <LeaderBoardUIContext.Provider value={value}>{children}</LeaderBoardUIContext.Provider>;
}