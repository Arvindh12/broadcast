import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import {Link} from "react-router-dom"


function HeaderNavbar({ currentUser }) {
  console.log(currentUser)
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        {currentUser === null
          ? "Broadcast to login"
          : "Broadcast with out login"}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {currentUser === null ? (
            ""
          ) : (
            <>
              <Link to="/home" className="linkstyle">Home </Link>
              <Link to="/create" className="linkstyle"> Create Post  </Link>
              <Link to="/post" className="linkstyle">My Post</Link>
              <Link to="/profile" className="linkstyle"> Profile </Link>
            </>
          )}
        </Nav>
        <Nav>
         
          {currentUser === null ? (
             <Nav.Link>Login</Nav.Link>
          ) : (
            <Nav.Link>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(HeaderNavbar);
