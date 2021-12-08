import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SignUp from "./signUp";
import SignIn from "./signIn";
import { Typography } from "@mui/material";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  const handleModal = (e) => {
    console.log(e);
    if (e.target.id === "register") {
      setSignInModal(true);
      setSignUpModal(false);
    } else if (e.target.id === "login") {
      setSignInModal(false);
      setSignUpModal(true);
    }
  };
  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <ButtonGroup orientation="vertical" variant="contained" spacing={2}>
            <Button color={signUpModal ? "secondary" : "primary"}>
              <Typography
                id="login"
                onClick={handleModal}
                variant="body"
                color={
                  signUpModal
                    ? "ConstrastText.secondary"
                    : "ConstrastText.primary"
                }
              >
                S'inscrire
              </Typography>
            </Button>
            <Button color={signInModal ? "secondary" : "primary"}>
              <Typography
                id="register"
                onClick={handleModal}
                variant="body"
                color={
                  signInModal
                    ? "ConstrastText.secondary"
                    : "ConstrastText.primary"
                }
              >
                Se connecter
              </Typography>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={4}>
          {signUpModal && <SignUp />}
          {signInModal && <SignIn />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Log;
