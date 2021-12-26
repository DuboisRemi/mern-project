import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowHandler from "./FollowHandler";
import { isEmpty } from "../../utils";
import Loading from "../Loading";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";

const FollowSuggestions = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isEmpty(userData) && !isEmpty(usersData)) {
      setLoading(false);
    }
  }, [userData, usersData]);

  if (loading) return <Loading />;
  else
    return (
      <div>
        <Typography variant={"h6"} textAlign={"center"}>
          Suggestions d'abonnement
        </Typography>
        <List>
          {usersData.map((user) => {
            if (
              !userData.following.includes(user._id) &&
              userData._id !== user._id
            )
              return (
                <ListItem key={user._id} sx={{ width: "100%" }}>
                  <ListItemAvatar />
                  <Avatar
                    src={user.picture}
                    style={{
                      position: "relative",
                      left: "2%",
                    }}
                  />
                  <Typography
                    variant={"body2"}
                    style={{
                      position: "relative",
                      left: "5%",
                    }}
                  >
                    {user.pseudo}
                  </Typography>
                  <Container
                    style={{
                      position: "relative",
                      left: "5%",
                    }}
                  >
                    <FollowHandler idToFollow={user._id} />
                  </Container>
                </ListItem>
              );
          })}
        </List>
      </div>
    );
};

export default FollowSuggestions;
