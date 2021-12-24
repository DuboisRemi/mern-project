import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersReducer from "../../reducers/users.reducer";
import { isEmpty } from "../../utils";
import { getTrends } from "../../actions/post.actions";
import { Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import PostForm from "../posts/PostForm";
import Thread from "../posts/Thread";
import FollowSuggestions from "../profile/FollowSuggestions";
import Card from "../posts/Card";

const Trending = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);
  return (
    <Grid container direction={"row"}>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Typography variant={"h3"}> Tendances</Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Stack>
          {!isEmpty(trendList) &&
            trendList.map((post) => {
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
                  <Card post={post} setReload={false} />
                </Container>
              );
            })}
        </Stack>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <FollowSuggestions />
      </Grid>
    </Grid>
  );
};

export default Trending;
