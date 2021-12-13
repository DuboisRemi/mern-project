import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Loading from "../Loading";

const ShowProfile = (props) => {
  const userInfos = props.userInfos;

  return (
    <Grid container>
      {userInfos ? (
        <Grid container direction="row" spacing={4}>
          <Grid item xs={4}>
            <Grid container direction="row" column spacing={1}>
              <Grid item>
                <img
                  src={userInfos.picture}
                  alt="Profile"
                  width="100%"
                  style={{
                    resizeMode: "cover",
                    borderRadius: 15,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h3" textAlign="center">
              {userInfos.pseudo}
            </Typography>
            {userInfos.bio ? (
              <Typography variant="body" textAlign="center">
                {userInfos.bio}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};

export default ShowProfile;
