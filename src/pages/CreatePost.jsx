import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";

function CreatePost({ currentUser , setCurrentUser }) {
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
   
    if(formState.title.length < 6 ){
      console.log("Title should be greater than 6 characters.")
      setAlert({ state : true , message : "Title should be greater than 6 characters." ,variant : "danger"})
      return
    }
if(formState.title.length > 60){
  console.log("Title should be less than 60 characters.")
  setAlert({ state : true , message : "Title should be less than 60 characters." ,variant : "danger"})
  return
}

if(formState.content.length < 10 ){
  console.log("Content should be greater than 10 characters.")
  setAlert({ state : true , message : "Content should be greater than 10 characters." ,variant : "danger"})
  return
}
if(formState.content.length > 200 ){
  console.log("Content should be less than 200 characters.")
  setAlert({ state : true , message : "Content should be less than 200 characters." ,variant : "danger"})
  return
}



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

    setCurrentUser(userdata)

    setAlert({state : true , message : "Post has been submitted successfully" , variant : "success" })
    // set state with new user data
  };

  const [formState, setFormState] = useState({
    title: "",
    content: "",
    author: "",
    createdAt: "",
  });

  const [alert, setAlert] = useState({ state : false , message : "" ,variant : "danger" })

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
          {alert.state ?  
          <Alert variant={alert.variant} onClose={() => setAlert(false)} dismissible className="mt-3">
        {alert.message}
      </Alert>
      : <> </> }
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);
