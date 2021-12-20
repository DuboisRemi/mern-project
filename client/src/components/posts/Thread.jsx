import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { isEmpty } from "../../utils";
import Loading from "../Loading";
import Card from "./Card";
import { List, ListItem } from "@mui/material";

const Thread = () => {
  const [loadPosts, setLoadPosts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsReducer);
  useEffect(() => {
    if (loadPosts) {
      dispatch(getPosts());
      setLoadPosts(false);
      setCount(count + 5);
    }
  }, [loadPosts, dispatch, count]);

  useEffect(() => {
    if (!isEmpty(posts)) setLoading(false);
  }, [posts, loading]);
  if (loading) return <Loading />;
  return (
    <List>
      {!isEmpty(posts[0]) &&
        posts.map((post) => {
          return (
            <ListItem
              key={post._id}
              divider={true}
              sx={{ justifyContent: "center" }}
            >
              <Card post={post} />
            </ListItem>
          );
        })}
    </List>
  );
};

export default Thread;
