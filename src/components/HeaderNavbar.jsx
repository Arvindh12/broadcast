import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";


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
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Create Post</Nav.Link>
              <Nav.Link>My Post</Nav.Link>
              <Nav.Link>Profile</Nav.Link>
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
