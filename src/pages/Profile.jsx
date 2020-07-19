import React from 'react'
import {connect} from 'react-redux'

function Profile({currentUser}) {
    return (
        <div>
            First Name : {currentUser.firstName}
            Last Name : {currentUser.lastName}
            Handle : {currentUser.userHandle}
            Email : {currentUser.emailID}
            Status : {currentUser.status}
            Gender :  {currentUser.gender}
            Followers :  {currentUser.followers.length}
            Following : {currentUser.following.length}

        </div>
    )
}

const mapStateToProp = (state) => ({
    currentUser : state.user.currentUser
})
 
export default connect(mapStateToProp)(Profile)
