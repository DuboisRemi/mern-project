import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { isEmpty } from "../../utils";
import Loading from "../Loading";
import Card from "./Card";
import { Container, List, ListItem, Stack } from "@mui/material";

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
    <Stack>
      {!isEmpty(posts[0]) &&
        posts.map((post) => {
          return (
            <Container
              key={post._id}
              divider={true}
              sx={{
                width: "100%",
                textAlign: "center",
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.12)",
                marginBottom: "15px",
              }}
            >
              <Card post={post} setReload={setReload} />
            </Container>
          );
        })}
    </Stack>
  );
};

export default Thread;
