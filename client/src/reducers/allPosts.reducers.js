import { GET_ALL_POSTS } from "../actions/post.actions";

const initializeState = {};

export default function allPostsReducer(state = initializeState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    default:
      return state;
  }
}
