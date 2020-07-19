import React from "react";
import Card from "react-bootstrap/Card";

function NewsFeed() {
  return (
    <Card>
      <Card.Header>My first post</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            <cite title="Source Title">post author</cite>
          </footer>
        </blockquote>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

export default NewsFeed;
