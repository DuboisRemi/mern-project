import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import theme from "../../theme";
import Typography from "@mui/material/Typography";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginError = document.querySelector(".login.error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          loginError.innerHTML = "Email ou mot de passe non reconnu";
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid
      container
      direction="column"
      align="center"
      sx={{ marginTop: "20px" }}
    >
      <Grid item>
        <Avatar
          alt="Sign icon"
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <LockOutlinedIcon color="secondary" />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">
          Se Connecter
        </Typography>
      </Grid>
      <Grid
        item
        component="form"
        onSubmit={handleLogin}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          id="email"
          label="Email Address"
          name="email"
          fullWidth
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          fullWidth
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="login error"></div>
        <Button type="submit">Connexion</Button>
      </Grid>
    </Grid>
  );
};

export default SignIn;
