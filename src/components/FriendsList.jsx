import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

function FriendsList({userHandle}) {
    return (
        <ListGroup.Item>
        {userHandle}
        <Button variant="primary" size="sm" className="float-right">
          Follow
        </Button>
      </ListGroup.Item>
    )
}

export default FriendsList
