import React from "react";
import { Route, IndexRedirect } from "react-router";
import Greeting from "./components/greeting/Page";
import App from "./components/layout/App";

export function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/greeting" />
      <Route path="greeting" component={Greeting}/>
    </Route>
  );
}
/*
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
 */