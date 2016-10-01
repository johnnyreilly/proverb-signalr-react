import "babel-polyfill";
import * as React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory } from "react-router";

import { getRoutes } from "./Routes";

ReactDOM.render((
  <Router history={hashHistory}>
    { getRoutes() }
  </Router>
), document.getElementById("content"));
