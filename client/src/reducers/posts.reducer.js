import { GET_POSTS } from "../actions/post.actions";

const initializeState = {};

export default function postsReducer(state = initializeState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
}
