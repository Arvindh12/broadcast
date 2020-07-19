const INITIAL_STATE ={
    currentUser :   {
        "id": 0,
        "firstName": "Arvindh",
        "lastName": "Ashok",
        "userHandle": "arvindh",
        "emailID": "arvindh@gmail.com",
        "password": "1234",
        "gender": "male",
        "status": "single",
        "followers": [],
        "following": [],
        "posts": []
      }
}
const userReducer = (state = INITIAL_STATE ,action) => {
switch(action.type){
    case "SET_CURRENT_USER":
        return {
            ...state,
            currentUser : action.payload
        }

    default :
        return state;
}
}

export default userReducer;