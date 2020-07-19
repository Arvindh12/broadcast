import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FindFriends from "../components/FindFriends";
import NewsFeed from "../components/NewsFeed";

function Home() {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={3}>
          <FindFriends />
        </Col>
        <Col md={9}>
          NEWS FEED
          <NewsFeed />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
