import postsReducer from "./posts.reducer";
import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import allPostsReducer from "./allPosts.reducers";
import trendingReducer from "./trending.reduceur";

export default combineReducers({
  userReducer,
  usersReducer,
  postsReducer,
  allPostsReducer,
  trendingReducer,
});
