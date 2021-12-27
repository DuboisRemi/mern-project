import React, { useContext } from "react";
import Loading from "../Loading";
import Thread from "../posts/Thread";
import { useSelector } from "react-redux";
import UserContext from "../../AppContext";
import PostForm from "../posts/PostForm";
import FollowSuggestions from "../profile/FollowSuggestions";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const Home = () => {
  const { uid, loading } = useContext(UserContext);
  const userData = useSelector((state) => state.userReducer);
  if (loading) {
    return <Loading />;
  } else if (uid === "default") {
    window.location = "mern-network/auth";
  } else
    return (
      <Grid container direction={"row"}>
        <Grid itemxs={4} sm={4} md={4} lg={4}>
          <Typography variant={"h3"}>
            {"Bienvenue " + userData.pseudo}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Grid container direction={"column"} textAlign={"center"}>
            <Grid item>
              <PostForm />
            </Grid>
            <Grid item>
              <Thread />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <FollowSuggestions />
        </Grid>
      </Grid>
    );
};

export default Home;
