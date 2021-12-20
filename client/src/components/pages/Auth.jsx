import React, { useState } from "react";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const Auth = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Grid container marginTop={"2%"} marginLeft={"20%"}>
          <Grid item xs={6}>
            <Button
              onClick={handleModals}
              variant={"contained"}
              id="register"
              className={signUpModal ? "active-btn" : null}
              width={"25%"}
            >
              S'inscrire
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleModals}
              variant={"contained"}
              id="login"
              className={signInModal ? "active-btn" : null}
              width={"25%"}
            >
              Se connecter
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        marginTop={"2%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        {signUpModal && <SignUp />}
        {signInModal && <SignIn />}
      </Grid>
    </Grid>
  );
};

export default Auth;
