import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import theme from "../../theme";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const pseudoError = document.querySelector(".pseudo.error");
    const passwordError = document.querySelector(".password.error");
    if (password !== confirmedPassword) {
      passwordError.innerHTML = "Les 2 mots de passes ne sont pas identiques";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          email: email,
          pseudo: pseudo,
          password: password,
        },
      }).then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          pseudoError.innerHTML = res.data.errors.pseudo;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = `/user/${res.data.id}`;
        }
      });
    }
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
        <Typography component="h1" variant="h5" className="text-center">
          S'inscrire
        </Typography>
      </Grid>
      <Grid
        item
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="email error"></div>
        <TextField
          margin="normal"
          required
          fullWidth
          name="pseudo"
          label="Pseudo"
          id="pseudo"
          onChange={(e) => setPseudo(e.target.value)}
        />
        <div className="pseudo error"></div>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmed password"
          label="Confirmed Password"
          type="password"
          id="confirmed password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <div className="password error"></div>
        <Button type="submit" primary={true}>
          Inscription
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUp;
