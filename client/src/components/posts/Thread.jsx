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
  const [reload, setReload] = useState(false);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsReducer);
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  useEffect(() => {
    if (reload) {
      dispatch(getPosts(count - 5));
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    if (loadPosts) {
      dispatch(getPosts(count));
      setLoadPosts(false);
      setCount(count + 5);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
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
            <ListItem key={post._id} divider={true}>
              <Card post={post} setReload={setReload} />
            </ListItem>
          );
        })}
    </List>
  );
};

export default Thread;
