import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { isEmpty } from "../../utils";
import FollowHandler from "../profile/FollowHandler";
import { Avatar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Image from "material-ui-image";

const Card = (props) => {
  const [loading, setLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!isEmpty(usersData)) setLoading(false);
  }, [usersData]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Grid container direction={"row"}>
            <Grid item position={"absolute"} top={"5%"} left={0}>
              <Avatar
                src={usersData
                  .map((user) => {
                    if (user._id === props.post.posterId) return user.picture;
                  })
                  .join("")}
                alt={usersData
                  .map((user) => {
                    if (user._id === props.post.posterId) return user.pseudo;
                  })
                  .join("")}
              />
            </Grid>
            <Grid item position={"absolute"} top={"5%"} left={"20%"}>
              <Typography variant={"h5"}>
                {usersData
                  .map((user) => {
                    if (user._id === props.post.posterId) return user.pseudo;
                  })
                  .join("")}
              </Typography>
            </Grid>
            {props.post.posterId !== userData._id && (
              <Grid item item position={"absolute"} top={"5%"} right={0}>
                <FollowHandler idToFollow={props.post.posterId} />
              </Grid>
            )}
          </Grid>
          <br />
          <Grid container direction={"row"} textAlign={"center"} marginTop={2}>
            <Grid item xs={12}>
              <Typography variant={"body1"}>{props.post.message}</Typography>
            </Grid>
          </Grid>
          {props.post.picture && <Image src={props.post.picture} />}
          {props.post.video && (
            <iframe
              width="500"
              height="300"
              src={props.post.video}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={props.post._id}
            />
          )}
        </Container>
      )}
    </div>
  );
};

export default Card;
