import React ,{useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {connect} from 'react-redux'
import { setCurrentUser } from "../redux/user/user.actions";
import { useHistory } from "react-router-dom";

function Register({setCurrentUser}) {

  let history = useHistory();

  const handleOnChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    var tempFormState = JSON.parse(JSON.stringify(formState));
    tempFormState[name] = value;
    setFormState(tempFormState);
  };

  const [formState, setFormState] = useState({firstName: "" , lastName : "" ,userHandle: "" , emailID: "", gender: "" , status : "" , password : ""});
  const [error, setError] = useState({userHandle : [false , '' ] , emailTaken : [ false , '' ] , firstName : [false , ''] , lastName : [false ,''] , gender : [false , ''] , status : [false , ''] , password :[false ,'']})

  const handleOnSumbit = async (event) => {
    event.preventDefault();
    //Validate the form 

    if (formState.firstName.length > 15 || formState.firstName.length < 2 ){
      setError({...error , firstName : [true , "Number of charters should be between 2 and 15"]})
      console.log("failed")
      return
    }

    if (formState.lastName.length > 15 || formState.lastName.length < 2 ){
      setError({...error , lastName : [true , "Number of charters should be between 2 and 15"] ,  firstName : [false , ""] })
      return
    }

    var regex = /^[A-Za-z0-9 ]+$/

    if (formState.userHandle.length > 10 || formState.userHandle.length < 2 ){
      setError({...error , userHandle : [true , "Number of charters should be between 2 and 10"] , firstName : [false , ""] ,  lastName : [false , ""]})
      return
    }

   if ( ! regex.test(formState.userHandle) ){
      setError({...error , userHandle : [true , "User handle should not contain any special characters"] , firstName : [false , ""] ,  lastName : [false , ""]})
      return
    }
    else {
      setError({...error, userHandle : [false , ''] ,firstName : [false , ""] , lastName : [false , ''] })
    }

    
    if (formState.gender === '' ){
      setError({...error , gender : [true , "Select an option"],  userHandle : [false , ''] ,firstName : [false , ""] , lastName : [false , ''] })
      return
    }
    else {
      setError({...error , gender : [false , ''] ,  userHandle : [false , ''] ,firstName : [false , ""] , lastName : [false , ''] })
    }


    if (formState.status === '' ){
      setError({...error , status : [true , "Select an option"] , userHandle : [false , ''] ,firstName : [false , ""] , lastName : [false , ''] })
      return
    }
    else {
      setError({...error, status : [false , ''] , userHandle : [false , ''] ,firstName : [false , ""] , lastName : [false , ''] , gender : [false , ''] })
    }

    
    if (formState.password.length > 15 || formState.password.length < 2 ){
      setError({...error , password : [true , "Password should be between 2 and 15 characters"] , status : [false , ''] , userHandle : [false , ''] ,firstName : [false , ""] , lastName : [false , ''] , gender : [false , ''] })
      return
    }
    else {
      setError({...error, password : [false , ''] , status : [false , ''] , userHandle : [false , ''] ,firstName : [false , ""] , lastName : [false , ''] , gender : [false , ''] })
    }


 
    // fetch () to fiind if the userhandle is unique

    var userHandleMatch = await fetch(`https://broadcast-server-arvindh.herokuapp.com/users?userHandle=${formState.userHandle}`).then(res => res.json())
    
    if (userHandleMatch.length > 0 ){
      setError({...error , userHandle : [true , "The User Handle is taken"]})
      return
    }
    else {
      setError({...error, userHandle : [false , '']})
    }

    // fetch () to find if the email is unique 

    var emailHandleMatch = await fetch(`https://broadcast-server-arvindh.herokuapp.com/users?emailID=${formState.emailID}`).then(res => res.json())
    
    if (emailHandleMatch.length > 0 ){
      setError({...error , emailTaken : [true , "The Email ID exists"]})
      return
    }
    else {
      setError({...error, emailTaken : [false , '']})
    }

    setError( {userHandle : [false , '' ] , emailTaken : [ false , '' ] , firstName : [false , ''] , lastName : [false ,''] , gender : [false , ''] , status : [false , ''] , password :[false ,'']} )
    console.log(formState)

    const user = {...formState , posts : [] , followers : [] , following : [] }

    //Post request to json - server

    const ResponseData = await fetch("https://broadcast-server-arvindh.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());  

    console.log(ResponseData)
    setCurrentUser(ResponseData)
   
    history.push("/home");
console.log(error)
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
              {error.firstName[0] ? <Form.Text className="text-danger" >
               {error.firstName[1]}
              </Form.Text> : <></> }
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
                            {error.lastName[0] ? <Form.Text className="text-danger" >
               {error.lastName[1]}
              </Form.Text> : <></> }
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
              {error.userHandle[0] ? <Form.Text className="text-danger" >
                {error.userHandle[1]}
              </Form.Text> : <></> }

            </Form.Group>
            <Form.Group controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="emailID" onChange={handleOnChange} value={formState.emailID} required />
              {error.emailTaken[0] ? <Form.Text className="text-danger" >
                {error.emailTaken[1]}
              </Form.Text> : <></> }
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" value={formState.gender} onChange={handleOnChange}  name="gender" >
                <option value="">Select Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </Form.Control>
              {error.gender[0] ? <Form.Text className="text-danger" >
                {error.gender[1]}
              </Form.Text> : <></> }
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" onChange={handleOnChange} value={formState.status} name="status" >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="In a relationship">In a relationship</option>
                <option value="Maried">Maried</option>
              </Form.Control>
              {error.status[0] ? <Form.Text className="text-danger" >
                {error.status[1]}
              </Form.Text> : <></> }
            </Form.Group>
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={handleOnChange} value={formState.password} />
              {error.password[0] ? <Form.Text className="text-danger" >
                {error.password[1]}
              </Form.Text> : <></> }
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

export default connect(null , mapDispatchToPrps)(Register);
