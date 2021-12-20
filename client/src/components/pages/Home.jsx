import React, { useContext } from "react";
import Loading from "../Loading";
import Thread from "../posts/Thread";
import { useSelector } from "react-redux";
import UserContext from "../../AppContext";
import PostForm from "../posts/PostForm";
import FollowSuggestions from "../profile/FollowSuggestions";
import Grid from "@mui/material/Grid";

const Home = () => {
  const { uId, loading } = useContext(UserContext);
  const userData = useSelector((state) => state.userReducer);
  if (loading) {
    return <Loading />;
  }
  return (
    <Grid container direction={"row"}>
      <Grid item xs={4}>
        {uId === "default"
          ? "Vous n'êtes pas connecté"
          : "Hello " + userData.pseudo}
      </Grid>
      <Grid item xs={4}>
        <Grid container direction={"column"} textAlign={"center"}>
          <Grid item>
            <PostForm />
          </Grid>
          <Grid item>
            <Thread />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <FollowSuggestions />
      </Grid>
    </Grid>
  );
};

export default Home;
