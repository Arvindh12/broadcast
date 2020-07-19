import React ,{useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {connect} from 'react-redux'
import { setCurrentUser } from "../redux/user/user.actions";

function Register() {

  const handleOnChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    var tempFormState = JSON.parse(JSON.stringify(formState));
    tempFormState[name] = value;
    setFormState(tempFormState);
  };

  const [formState, setFormState] = useState({firstName: "" , lastName : "" ,userHandle: "" , emailID: "", gender: "" , status : "" , password : ""});

  const handleOnSumbit = async (event) => {
    event.preventDefault();
    //Validate the form 

    console.log(formState)

    const user = {...formState , posts : [] , followers : [] , following : [] }

    //Post request to json - server

    const ResponseData = await fetch("http://localhost:7070/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());

    console.log(ResponseData)

  }

  return (
    <Container>
      <Row>
        <Col md={3}> </Col>
        <Col md={6}>
          <Form onSubmit={handleOnSumbit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formState.firstName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formState.lastName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group controlId="userHandle">
              <Form.Label>UserHandle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unique User Handle"
                name="userHandle"
                onChange={handleOnChange}
                value={formState.userHandle}
              />
            </Form.Group>
            <Form.Group controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="emailID" onChange={handleOnChange} value={formState.emailID} />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" value={formState.gender} onChange={handleOnChange}  name="gender" >
                <option>Select Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" onChange={handleOnChange} value={formState.status} name="status" >
                <option>Select Status</option>
                <option value="Single">Single</option>
                <option value="In a relationship">In a relationship</option>
                <option value="Maried">Maried</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={handleOnChange} value={formState.password} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
        <Col md={3}> </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToPrps = (dispatch) => ({
  setCurrentUser : (user) => dispatch(setCurrentUser(user))
})

export default connect(mapDispatchToPrps)(Register);
