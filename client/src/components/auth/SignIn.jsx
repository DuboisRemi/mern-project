import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user.actions";
import { Box, Button, TextField } from "@mui/material";
import Loading from "../Loading";

const SignIn = () => {
  const { uid, defineUid, loading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          if (res.data.errors.email)
            emailError.innerHTML = res.data.errors.email;
          if (res.data.errors.password)
            passwordError.innerHTML = res.data.errors.password;
        } else {
          console.log(res);
          defineUid(res.data._id);
          dispatch(getUser(res.data._id));
          window.location = "/profile";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!loading && uid !== "default") {
    window.location = "/profile";
    return <Loading />;
  }

  return (
    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
      <label htmlFor="email">Email</label>
      <br />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="password error"></div>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Se connecter
      </Button>
    </Box>
  );
};

export default SignIn;
