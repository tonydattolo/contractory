import { combineReducers } from 'redux'

// import postsReducer from './posts'
// import postReducer from './post'
// import commentsReducer from './comments'
import authReducer from './auth'
import web3auth from './web3auth'

const rootReducer = combineReducers({
  // key value is from name given in createSlice function for chosen reducer
  auth: authReducer,
  // web3auth: web3authReducer,
  // getuserinfo: getuseinfoReducer
})

export default rootReducer
