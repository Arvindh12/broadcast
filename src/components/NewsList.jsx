import React from "react";
import Card from "react-bootstrap/Card";

function NewsList({ post }) {
  return (
    <Card>
      <Card.Header>{post.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{post.content}</p>
          <footer className="blockquote-footer">
            <cite title="Source Title">{post.author}</cite>
          </footer>
        </blockquote>
      </Card.Body>
      <Card.Footer className="text-muted">{post.createdAt}</Card.Footer>
    </Card>
  );
}

export default NewsList;
