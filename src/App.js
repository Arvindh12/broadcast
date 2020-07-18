import React from "react";
import Login from "./pages/Login";
import HeaderNavbar from "./components/HeaderNavbar";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Register from "./pages/Register";
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <HeaderNavbar />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
