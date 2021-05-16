import React from "react";
import Frontpage from "./Front page/Frontpage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <div>
          <Route exact path="/">
            <Frontpage />
          </Route>

          <Route path="/home">
            <Home />
          </Route>
        </div>
      </Switch>
    </Router>
  );
};

export default App;
