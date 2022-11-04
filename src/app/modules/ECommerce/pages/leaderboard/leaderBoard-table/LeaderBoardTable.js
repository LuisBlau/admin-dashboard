// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/leaderboard/leaderboardActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../LeaderBoardUIHelpers";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useLeaderBoardUIContext } from "../LeaderBoardUIContext";

export function LeaderBoardTable() {
  const {isAuthorized, user, token} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
        user: auth.user,
        token: auth.authToken
    }),
    shallowEqual
  );

  // LeaderBoard UI Context
  const leaderBoardUIContext = useLeaderBoardUIContext();
  const leaderBoardUIProps = useMemo(() => {
    return {
      ids: leaderBoardUIContext.ids,
      setIds: leaderBoardUIContext.setIds,
      queryParams: leaderBoardUIContext.queryParams,
      setQueryParams: leaderBoardUIContext.setQueryParams,
    };
  }, [leaderBoardUIContext]);

  // Getting curret state of leaderBoard list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.leaderBoard }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // LeaderBoard Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    leaderBoardUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchLeaderBoard(leaderBoardUIProps.queryParams));    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaderBoardUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "Id",
      sort: true,
      formatter: (cell, row) => <>{`${row._id.slice(0, 3)} ... ${row._id.slice(-3)}`}</>,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    // {
    //   dataField: "roundId",
    //   text: "Round Id",
    //   sort: true,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      formatter: (cell, row) => <>{`${row.address.slice(0, 5)} ... ${row.address.slice(-5)}`}</>,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "steam",
      text: "Steam",
    },
    {
      dataField: "iscore",
      text: "iScore",
    },
    {
      dataField: "score",
      text: "Score",
    },
    {
      dataField: "ranking",
      text: "Ranking",
    },
    {
      dataField: "rewards",
      text: "Rewards",
    },
    {
      dataField: "roundScore",
      text: "Round Score",
    },
  ];

  // Table pagination properties
  // const paginationOptions = {
  //   custom: true,
  //   totalSize: totalCount,
  //   sizePerPageList: uiHelpers.sizePerPageList,
  //   sizePerPage: leaderBoardUIProps.queryParams.pageSize,
  //   page: leaderBoardUIProps.queryParams.pageNumber,
  // };

  return (
    <>
      {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            > */}
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                // columns={user.email==='superadmin@playestates.com'?columns:adminColumns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  leaderBoardUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: leaderBoardUIProps.ids,
                //   setIds: leaderBoardUIProps.setIds,
                // })}
                // {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            {/* </Pagination>
          );
        }}
      </PaginationProvider> */}
    </>
  );
}
