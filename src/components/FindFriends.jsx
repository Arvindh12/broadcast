import React ,{useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import FriendsList from './FriendsList'
import { connect } from "react-redux";


function FindFriends({currentUser}) {
    const handleOnChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        var tempFormState = JSON.parse(JSON.stringify(formState));
        tempFormState[name] = value;
        setFormState(tempFormState);
      };
    const handleOnSubmit = async (event) => {
        event.preventDefault()
        console.log(formState)
        // handle validation 

      var results = await fetch(`http://localhost:7070/users?userHandle_like=${formState.friends}`).then((res) => res.json())
      console.log(results)

      setFormState({...formState , results})

    }
 const [formState, setFormState] = useState({friends : "" , results : [] })

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <InputGroup className="mb-3" size="lg">
          <InputGroup.Prepend>
            <Button variant="outline-secondary" type="submit">
              <SearchIcon />
            </Button>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search handle"
            aria-label="Username"
            aria-describedby="findfriends"
            value = {formState.friends}
            name = "friends"
            onChange = {handleOnChange}
          />
        </InputGroup>
      </Form>
      <ListGroup variant="flush">
       {formState.results.filter((data) => data.userHandle !== currentUser.userHandle).map((data) => (<FriendsList userHandle = {data.userHandle} key={data.userHandle} fulldata = {data} />) ) } 
      </ListGroup>
    </>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FindFriends);
