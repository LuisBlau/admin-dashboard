// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/tournaments/customersActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CustomersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCustomersUIContext } from "../CustomersUIContext";

export function CustomersTable() {
  const {isAuthorized, user, token} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
        user: auth.user,
        token: auth.authToken
    }),
    shallowEqual
);
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
      openEditCustomerDialog: customersUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: customersUIContext.openDeleteCustomerDialog,
    };
  }, [customersUIContext]);

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rounds }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    customersUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCustomers(customersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
      formatter: (cell, row) => <>{`${row.id.slice(0, 3)} ... ${row.id.slice(-3)}`}</>,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "startTime",
      text: "Start Time",
      sort: true,
      formatter: (cell, row) => format(Number(row.startTime) * 1000, "yyyy-MM-dd HH:mm:ss"),
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "finalPeriod",
      text: "Final Period",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "minPlayers",
      text: "Min-Players",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "maxPlayers",
      text: "Max-Players",
      sort: true,
      // formatter: columnFormatters.StatusColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
        openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: customersUIProps.queryParams.pageSize,
    page: customersUIProps.queryParams.pageNumber,
  };

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
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                // columns={user.email==='superadmin@playestates.com'?columns:adminColumns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  customersUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: customersUIProps.ids,
                //   setIds: customersUIProps.setIds,
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
