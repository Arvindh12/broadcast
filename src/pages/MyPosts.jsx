import React from "react";
import NewsList from "../components/NewsList";
import { Container, Row, Col  } from "react-bootstrap";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper'

function MyPosts({ currentUser }) {
  return (
    <Container>
      <Row>
        <Col>
          <Paper elevation={3} className= "my-2" >
          <h2 className= "py-4 pl-2" > My Posts</h2>
             </Paper>

           {currentUser.posts.map((data) => (
            <NewsList post={data} key={data.id} className="mt-3" />
          ))} 
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(MyPosts);
