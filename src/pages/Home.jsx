import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
    return (
    <Container>
        <Row>
            <Col md={4}>
            find friends
            </Col>
            <Col md={8}>
            my posts...
            </Col>
        </Row>
    </Container>
    )
}

export default Home
