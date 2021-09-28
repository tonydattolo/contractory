import { combineReducers } from 'redux'

// import postsReducer from './posts'
// import postReducer from './post'
// import commentsReducer from './comments'
import authReducer from './authSlice'

const rootReducer = combineReducers({
  // key value is from name given in createSlice function for chosen reducer
  auth: authReducer,
    // posts: postsReducer,
//   comments: commentsReducer,
//   post: postReducer,
})

export default rootReducer
