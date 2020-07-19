import React from "react";
import Login from "./pages/Login";
import HeaderNavbar from "./components/HeaderNavbar";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Register from "./pages/Register";
import Home from './pages/Home'
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost"
import MyPosts from './pages/MyPosts'
import {connect} from 'react-redux'

function App({currentUser}) {
  return (
    <div className="App">
      <HeaderNavbar />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/home">
          {currentUser === null ? <Redirect to= "/login" /> :   <Home /> }
        </Route>
        <Route exact path="/profile" >
          {currentUser === null ? <Redirect to= "/login" /> :  <Profile /> }
        </Route>
        <Route exact path="/create">
        {currentUser === null ? <Redirect to= "/login" /> :   <CreatePost /> }
        </Route>
        <Route exact path="/myposts">
        {currentUser === null ? <MyPosts /> :   <MyPosts /> }
        </Route>

        <Route exact path="/register">
          <Register />
          </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser : state.user.currentUser
})

export default connect(mapStateToProps)(App);
