import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";

function FriendsList({ userHandle, currentUser, fulldata, setCurrentUser }) {
  const handleFollowRequest = async () => {
    console.log(currentUser, userHandle);

    // update my following array

    var user = {
      ...currentUser,
      following: currentUser.following.filter((data) => data !== userHandle ).concat([userHandle]),
    };

    const ResponseUserData = await fetch(
      `https://broadcast-server-arvindh.herokuapp.com/users/${currentUser.id} `,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    ).then((res) => res.json());

    // update followers array of whom i am following

    var followerUser = {
      ...fulldata,
      followers: fulldata.followers.filter((data) => data !== currentUser.userHandle).concat([currentUser.userHandle]),
    };

    const ResponseFollowerData = await fetch(
      `https://broadcast-server-arvindh.herokuapp.com/users/${fulldata.id} `,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(followerUser),
      }
    ).then((res) => res.json());

    setCurrentUser(ResponseUserData);
  };

  const handleUnFollowRequest = async () => {
    
    var user = {
      ...currentUser,
      following: currentUser.following.filter((data) => data !== userHandle ),
    };

    const ResponseUserData = await fetch(
      `https://broadcast-server-arvindh.herokuapp.com/users/${currentUser.id} `,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    ).then((res) => res.json());

    // update followers array of whom i am following

    var followerUser = {
      ...fulldata,
      followers: fulldata.followers.filter((data) => data !== currentUser.userHandle),
    };

    const ResponseFollowerData = await fetch(
      `https://broadcast-server-arvindh.herokuapp.com/users/${fulldata.id} `,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(followerUser),
      }
    ).then((res) => res.json());

    setCurrentUser(ResponseUserData);

  }
 
  return (
    <ListGroup.Item>
      {userHandle}
      {currentUser.following.indexOf(userHandle) === -1 ? (
        <Button
          variant="primary"
          size="sm"
          className="float-right"
          onClick={handleFollowRequest}
        >
          Follow
        </Button>
      ) : (
        <Button
        variant="primary"
        size="sm"
        className="float-right"
        onClick={handleUnFollowRequest}
      >
        UnFollow
      </Button>
      )}
    </ListGroup.Item>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToPrps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToPrps)(FriendsList);
