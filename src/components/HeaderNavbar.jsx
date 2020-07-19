import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import {Link , useHistory} from "react-router-dom"
import { Button } from "react-bootstrap";
import { setCurrentUser } from "../redux/user/user.actions";
import { updatePost } from "../redux/posts/posts.actions";


function HeaderNavbar({ currentUser ,removeCurrentUser,clearPosts }) {

  console.log(currentUser)

  const handleLogOut = () => {
    removeCurrentUser();
    clearPosts();
  }
  let history = useHistory()
  const handleLogIn = () => {
    history.push("/login")
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        {currentUser === null
          ? "Broadcast"
          : "Broadcast"}
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
              <Link to="/myposts" className="linkstyle">My Post</Link>
              <Link to="/profile" className="linkstyle"> Profile </Link>
            </>
          )}
        </Nav>
        <Nav >
         
          {currentUser === null ? (
             <Button variant="secondary" onClick={handleLogIn} >  Login </Button>
          ) : (
            <Button variant="danger" onClick={handleLogOut} >Logout</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  removeCurrentUser : () => dispatch(setCurrentUser(null)) ,
  clearPosts : () => dispatch(updatePost([]))
 })

export default connect(mapStateToProps,mapDispatchToProps)(HeaderNavbar);
