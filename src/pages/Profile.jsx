import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Profile({ currentUser }) {
  return (
    <Container className="mt-4">
        <Row>
            <Col>
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td> First Name : </td>
          <td>{currentUser.firstName}</td>
        </tr>
        <tr>
          <td> Last Name : </td>
          <td>{currentUser.lastName}</td>
        </tr>
        <tr>
          <td> Handle : </td>
          <td>{currentUser.userHandle}</td>
        </tr>
        <tr>
          <td> Status : </td>
          <td>{currentUser.status}</td>
        </tr>
        <tr>
          <td> Gender : </td>
          <td>{currentUser.gender}</td>
        </tr>
        <tr>
          <td> Followers :</td>
          <td>{currentUser.followers.length}</td>
        </tr>
        <tr>
          <td> Following :</td>
          <td>{currentUser.following.length}</td>
        </tr>
      </tbody>
      
    </Table>
    </Col>
    </Row>
  </Container>
  );
}

const mapStateToProp = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProp)(Profile);
