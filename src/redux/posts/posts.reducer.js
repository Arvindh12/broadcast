const INITIAL_VALUE = []

const postsReducer = (state = INITIAL_VALUE , action) => {
switch(action.type){
    case 'SET_NEWS_FEED': return action.payload

    default: return state
}
}

export default postsReducer