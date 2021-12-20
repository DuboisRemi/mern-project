import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser, isEmpty } from "../../utils";
import FollowHandler from "./FollowHandler";
import Loading from "../Loading";
import Image from "material-ui-image";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";

const UpdateProfile = () => {
  const [bio, setBio] = useState();
  const [updateForm, setUpdateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };
  useEffect(() => {
    if (!isEmpty(userData) && !isEmpty(usersData)) {
      setLoading(false);
    }
  }, [userData, usersData]);
  if (loading) return <Loading />;
  return (
    <Box borderRadius={"25px"} boxShadow={12} margin={"2%"} padding={"2%"}>
      <Grid container direction={"column"} textAlign={"center"}>
        <Grid item>
          <Typography variant="h2">Profil de {userData.pseudo}</Typography>
        </Grid>
        <Grid item>
          <Grid container direction={"row"} margin={"2%"}>
            <Grid item xs={6}>
              <Grid container direction={"column"}>
                <Grid item>
                  <Typography variant={"h4"} textAlign={"center"}>
                    Photo de profil
                  </Typography>
                </Grid>
                <Grid item>
                  <Box
                    borderRadius={"25px"}
                    boxShadow={12}
                    width={250}
                    height={250}
                    margin={"auto"}
                  >
                    <Image
                      src={userData.picture}
                      alt="user"
                      aspectRatio={1 / 1}
                      animationDuration={300}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <UploadImg />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid
                containter
                direction={"column"}
                marginTop={"2%"}
                marginRight={"4%"}
              >
                <Grid item>
                  <Typography variant={"h4"}>Bio</Typography>
                </Grid>
                <Grid item>
                  {!updateForm ? (
                    <>
                      <p onClick={() => setUpdateForm(!updateForm)}>
                        <Typography>{userData.bio}</Typography>
                      </p>
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => setUpdateForm(!updateForm)}
                      >
                        Editer Bio
                      </Button>
                    </>
                  ) : (
                    <>
                      <TextField
                        type="text"
                        fullWidth={true}
                        defaultValue={userData.bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <br />
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={handleUpdate}
                      >
                        Valider
                      </Button>
                    </>
                  )}
                </Grid>
                <br />
                <Grid item>
                  <Typography>
                    Membre depuis le: {dateParser(userData.createdAt)}
                  </Typography>
                </Grid>
                <br />
                <Grid item>
                  <Typography
                    onClick={() => setFollowingPopup(true)}
                    variant={"button"}
                  >
                    Abonnements:{" "}
                    {userData.following ? userData.following.length : 0}
                  </Typography>
                </Grid>
                <br />
                <Grid>
                  <Typography
                    onClick={() => setFollowersPopup(true)}
                    variant={"button"}
                  >
                    Abonné.e.s:{" "}
                    {userData.followers ? userData.followers.length : 0}
                  </Typography>
                </Grid>
                <Popover
                  open={followingPopup}
                  anchorOrigin={{ vertical: "center", horizontal: "center" }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  TransitionComponent={Zoom}
                >
                  <Grid containter direction={"column"} spacing={"2"}>
                    <Grid item>
                      <Grid container direction={"row"}>
                        <Grid item>
                          <Typography variant={"h4"}>Abonnements</Typography>
                        </Grid>
                        <Grid item marginLeft={2}>
                          <span onClick={() => setFollowingPopup(false)}>
                            &#10005;
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <List>
                      {usersData.map((user) => {
                        for (let i = 0; i < userData.following.length; i++) {
                          if (user._id === userData.following[i]) {
                            return (
                              <ListItem key={user._id}>
                                <ListItemAvatar>
                                  <Avatar
                                    src={user.picture}
                                    alt="user-pic"
                                    height="125"
                                    width="125"
                                  />
                                </ListItemAvatar>
                                <ListItemText primary={user.pseudo} />
                                <FollowHandler idToFollow={user._id} />
                                <Divider />
                              </ListItem>
                            );
                          }
                        }
                      })}
                    </List>
                  </Grid>
                </Popover>
                <Popover
                  open={followersPopup}
                  anchorOrigin={{ vertical: "center", horizontal: "center" }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  TransitionComponent={Zoom}
                >
                  <Grid containter direction={"column"} spacing={"2"}>
                    <Grid item>
                      <Grid container direction={"row"}>
                        <Grid item>
                          <Typography variant={"h4"}>Abonné.e.s</Typography>
                        </Grid>
                        <Grid item marginLeft={2}>
                          <span onClick={() => setFollowersPopup(false)}>
                            &#10005;
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <List>
                      {usersData.map((user) => {
                        for (let i = 0; i < userData.followers.length; i++) {
                          if (user._id === userData.followers[i]) {
                            return (
                              <ListItem key={user._id}>
                                <ListItemAvatar>
                                  <Avatar
                                    src={user.picture}
                                    alt="user-pic"
                                    height="125"
                                    width="125"
                                  />
                                </ListItemAvatar>
                                <ListItemText primary={user.pseudo} />
                                <FollowHandler idToFollow={user._id} />
                                <Divider />
                              </ListItem>
                            );
                          }
                        }
                        return null;
                      })}
                    </List>
                  </Grid>
                </Popover>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateProfile;
