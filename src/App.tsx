import React from "react";
import "./App.css";
import Board from "./components/board/Board";
import { Router, Route, Link, Switch } from "react-router-dom";
import history from "./history";
import Login from "./components/login/Login";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <h1>IBM case </h1>
      </div>
      <Switch>
        <Route exact path="/" component={Board} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
