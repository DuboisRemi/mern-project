import React, {useContext, useState} from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SignUp from "./signUp";
import SignIn from "./signIn";
import {Typography} from "@mui/material";
import {UidContext} from "../AppContext";

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
                direction="columns"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={3} sx={{textAlign: "center"}}>
                            <Button color={"primary"} variant="contained">
                                <Typography
                                    id="login"
                                    onClick={handleModal}
                                    variant="body"
                                    color={"ConstrastText.primary"}
                                >
                                    S'inscrire
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={3} sx={{textAlign: "center"}}>
                            <Button color={"primary"} variant="contained">
                                <Typography
                                    id="register"
                                    onClick={handleModal}
                                    variant="body"
                                    color={"ConstrastText.primary"}
                                >
                                    Se connecter
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {signUpModal && <SignUp/>}
                    {signInModal && <SignIn/>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Log;
