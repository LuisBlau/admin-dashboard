import React from "react";
import { Route } from "react-router-dom";
import { LeaderBoardLoadingDialog } from "./leaderBoard-loading-dialog/LeaderBoardLoadingDialog";
// import { LeaderBoardFetchDialog } from "./customers-fetch-dialog/LeaderBoardFetchDialog";
import { LeaderBoardUIProvider } from "./LeaderBoardUIContext";
import { LeaderBoardCard } from "./LeaderBoardCard";

export function LeaderBoardPage({ history }) {
  const customersUIEvents = {}

  return (
    <LeaderBoardUIProvider customersUIEvents={customersUIEvents}>
      <LeaderBoardLoadingDialog />
      <LeaderBoardCard />
    </LeaderBoardUIProvider>
  );
}
