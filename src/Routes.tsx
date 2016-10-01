import * as React from "react";
import { Route, IndexRedirect } from "react-router";
import Greeting from "./features/greeting/Page";
import Sages from "./features/sage/Page";
import About from "./features/about/Page";
import App from "./features/layout/App";

export function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/greeting" />
      <Route path="greeting" component={Greeting}/>
      <Route path="dashboard" component={Greeting}/>
      <Route path="sages" component={Sages}>
        <Route path=":id" component={Greeting}/>
      </Route>
      <Route path="sayings" component={Greeting}/>
      <Route path="about" component={About}/>
    </Route>
  );
}
