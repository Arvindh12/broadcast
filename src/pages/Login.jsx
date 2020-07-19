import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";

function Login({ setCurrentUser }) {
  

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formState);

    fetch(
      `https://broadcast-server-arvindh.herokuapp.com/users?email=${formState.email}&password=${formState.password}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.length === 0){
          // Password not matching 
          console.log("password not matching")
          return
        }
        else {
          console.log("password matching")
          setCurrentUser(data[0])
        }
      });
  };

  const handleOnChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    var tempFormState = JSON.parse(JSON.stringify(formState));
    tempFormState[name] = value;
    setFormState(tempFormState);
  };

  const [formState, setFormState] = useState({ email: "", password: "" });

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <Image
            fluid
            src="https://i0.wp.com/www.euroscientist.com/wp-content/uploads/2019/06/cropped-social-media-3846597_1280-1.png?resize=672%2C372&ssl=1"
          />
        </Col>
        <Col md={4} className="mt-5">
          <Form onSubmit={handleOnSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formState.email}
                onChange={handleOnChange}
              />
              <Form.Text className="text-danger">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formState.password}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

const setDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, setDispatchToProps)(Login);
