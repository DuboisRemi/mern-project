import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "../profile/UpdateProfile";
import { isEmpty } from "../../utils";
import { Button, Grid } from "@mui/material";
import { logout } from "../../actions/user.actions";
import UserContext from "../../AppContext";
import cookie from "js-cookie";
import Container from "@mui/material/Container";

const Profile = () => {
  const { uid, defineUid, loading } = useContext(UserContext);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    defineUid("default");
    dispatch(logout());
    window.location = "/auth";
  };
  if (loading) return <Loading />;
  if (!loading && uid === "default") {
    //window.location = "/auth";
    return <Loading />;
  }
  return (
    <Container>
      <UpdateProfile />
      <Button
        variant={"contained"}
        onClick={handleLogout}
        sx={{
          position: "relative",
          left: "75%",
        }}
      >
        Se déconnecter
      </Button>
    </Container>
  );
};

export default Profile;
