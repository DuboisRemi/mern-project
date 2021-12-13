import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";

const EditProfile = (props) => {
  const userInfos = props.userInfos;
  const [bio, setBio] = useState(userInfos.bio);
  const [picture, setPicture] = useState(userInfos.picture);

  const handleSubmitBio = (e) => {
    e.preventDefault();
    const errors = document.querySelector(".errors");
    axios
      .put(
        `${process.env.REACT_APP_API_URL}api/user/${userInfos._id}`,
        {
          bio: bio,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.errors) {
          errors.innerHTML = res.data.errors;
        } else {
          window.location = `/profile/${res.data._id}`;
        }
      });
  };

  const handleSubmitPicture = (e) => {
    e.preventDefault();
    const errorsUpload = document.querySelector(".errors.upload");
    const formData = new FormData();
    formData.append("userId", userInfos._id);
    formData.append("pseudo", userInfos.pseudo);
    formData.append("file", picture);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.errors) {
          errorsUpload.innerHTML = res.data.errors;
          console.log(res);
        } else {
          console.log(res);
          window.location = `/profile/${res.data._id}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <Grid
                item
                component="form"
                onSubmit={handleSubmitPicture}
                encType="multipart/form-data"
                noValidate
              >
                <label htmlFor="file">Changer de photo de profil</label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
                <Button type="submit" color={"primary"}>
                  Enregistrer
                </Button>
                <div className="errors upload"></div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container direction="column">
              <Grid item xs={4}>
                <Typography variant="h3" textAlign="center">
                  {userInfos.pseudo}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                textAlign="center"
                component="form"
                onSubmit={handleSubmitBio}
                noValidate
              >
                <TextField
                  fullWidth
                  height="80%"
                  id="bio"
                  label={userInfos.bio ? userInfos.bio : "Entrez votre bio"}
                  name="bio"
                  autoFocus
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className="errors"></div>
                <Grid item xs={4} textAlign="center">
                  <Button type="submit" color={"primary"}>
                    Enregistrer
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default EditProfile;
