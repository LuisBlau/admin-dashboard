import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { UsersPage } from "./users/CustomersPage";
import { CustomersPage } from "./customers/CustomersPage";
import { TournamentsPage } from "./tournaments/CustomersPage";
import { LeaderBoardPage } from "./leaderboard/LeaderBoardPage";

// import { ProductsPage } from "./products/ProductsPage";
// import { ProductEdit } from "./products/product-edit/ProductEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/management"
            to="/management/users"
          />
        }
        <ContentRoute path="/management/users" component={UsersPage} />
        <ContentRoute path="/management/customers" component={CustomersPage} />
        <ContentRoute path="/management/tournaments" component={TournamentsPage} />
        <ContentRoute path="/management/leaderboard" component={LeaderBoardPage} />
      </Switch>
    </Suspense>
  );
}
