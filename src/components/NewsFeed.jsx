import React, { useEffect  } from "react";
import NewsList from '../components/NewsList'
import {connect} from 'react-redux'
import {updatePost} from '../redux/posts/posts.actions'


function NewsFeed({posts , setPosts , currentUser } ) {
    useEffect(()=>{
        fetch(`http://localhost:7070/posts?_sort=id&_order=desc`)
        .then((res) => res.json())
        .then((data) => {
            setPosts(data)
        })

    },[])

  return (
    <>
 { posts.length === 0?  <p>U have nothing to see here</p>  : posts.filter((data) => currentUser.following.indexOf(data.author) !== -1 ).map(post => <NewsList post={post} key={post.id} />)}
    </>
  );

}

const mapStateToProps = (state) => ({
    posts : state.posts ,
    currentUser : state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    setPosts : (posts) => dispatch(updatePost(posts))
})

export default connect(mapStateToProps,mapDispatchToProps)(NewsFeed);
