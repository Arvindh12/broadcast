import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

function CreatePost({ currentUser }) {
  const handleOnChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    var tempFormState = JSON.parse(JSON.stringify(formState));
    tempFormState[name] = value;
    setFormState(tempFormState);
  };

  const handleOnSubmit = async (event) => {
    // validation code here

    event.preventDefault();

    const post = {
      ...formState,
      author: currentUser.userHandle,
      createdAt: new Date(),
    };

    const postdata = await fetch("http://localhost:7070/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((res) => res.json());

    const user = {
      ...currentUser,
      posts: currentUser.posts.concat(postdata),
    };

    console.log(postdata);

    console.log("user", user);

    var userdata = await fetch(
      `http://localhost:7070/users/${currentUser.id} `,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    ).then((res) => res.json());

    console.log(userdata);

    // set state with new user data
  };

  const [formState, setFormState] = useState({
    title: "",
    content: "",
    author: "",
    createdAt: "",
  });

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Post title"
                size="lg"
                onChange={handleOnChange}
                name="title"
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Post Content</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Your post"
                onChange={handleOnChange}
                name="content"
              />
            </Form.Group>
            <Form.Row>
              <Form.Group controlId="handle" as={Col}>
                <Form.Control
                  type="text"
                  placeholder={"@" + currentUser.userHandle}
                  size="lg"
                  readOnly
                  plaintext
                />
              </Form.Group>
              <Form.Group as={Col} controlId="submit">
                <div className="float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    className="text-center"
                  >
                    Create Post
                  </Button>
                </div>
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(CreatePost);
