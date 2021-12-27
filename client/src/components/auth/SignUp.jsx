import React, { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUser } from "../../actions/user.actions";
import UserContext from "../../AppContext";

const SignUp = () => {
  const { defineUid } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const pseudoError = document.querySelector(".pseudo.error");
    const passwordError = document.querySelector(".password.error");

    if (password !== confirmedPassword)
      passwordError.innerHTML = "les mots de passes doivent être identiques";

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      withCredentials: true,
      data: {
        email,
        pseudo,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          pseudoError.innerHTML = res.data.errors.pseudo;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          defineUid(res.data._id);
          dispatch(getUser(res.data._id));
          window.location = "mern-network/auth";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
      <label htmlFor="email">Email</label>
      <br />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Adresse Email"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="email">Pseudo</label>
      <br />
      <TextField
        margin="normal"
        required
        fullWidth
        id="pseudo"
        label="Pseudo"
        name="pseudo"
        autoComplete="pseudo"
        autoFocus
        onChange={(e) => setPseudo(e.target.value)}
      />
      <div className="pseudo error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mot de passe"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label htmlFor="password">Confirmer mot de passe</label>
      <br />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmed password"
        label="Confirmer mot de passe"
        type="password"
        id="confirmed password password"
        autoComplete="current-password"
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
      <div className="password error"></div>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        S'inscrire
      </Button>
    </Box>
  );
};

export default SignUp;
