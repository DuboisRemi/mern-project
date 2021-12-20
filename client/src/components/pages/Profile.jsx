import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateProfile from "../profile/UpdateProfile";
import { isEmpty } from "../../utils";
import { Button, Grid } from "@mui/material";

const Profile = () => {
  const userData = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isEmpty(userData)) setLoading(false);
  });

  const logout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        window.location = "/auth";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) return <Loading />;
  if (!loading && isEmpty(userData)) {
    window.location = "/auth";
    return <Loading />;
  }
  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item>
        <UpdateProfile />
      </Grid>
      <Grid item marginTop={2} marginRight={5} textAlign={"right"}>
        <Button variant={"contained"} onClick={logout}>
          Se déconnecter
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
