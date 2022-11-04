import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { LeaderBoardFilter } from "./leaderBoard-filter/LeaderBoardFilter";
import { LeaderBoardTable } from "./leaderBoard-table/LeaderBoardTable";

export function LeaderBoardCard() {
  return (
    <Card>
      <CardHeader title="Leader Board">
      </CardHeader>
      <CardBody>
        <LeaderBoardFilter />
        <LeaderBoardTable />
      </CardBody>
    </Card>
  );
}
