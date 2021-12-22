import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils";
import FollowHandler from "../profile/FollowHandler";
import { Avatar, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Image from "material-ui-image";
import TextsmsIcon from "@mui/icons-material/Textsms";
import LikeButton from "./LikeButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deletePost } from "../../actions/post.actions";
import CardComment from "./CardComment";

const Card = (props) => {
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isEmpty(usersData)) setLoading(false);
  }, [usersData]);

  function handleDelete() {
    dispatch(deletePost(props.post._id));
    props.setReload(true);
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Grid container direction={"column"}>
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
              <Grid item item position={"absolute"} top={"5%"} right={0}>
                {props.post.posterId !== userData._id ? (
                  <FollowHandler idToFollow={props.post.posterId} />
                ) : (
                  <DeleteOutlinedIcon
                    onClick={handleDelete}
                    sx={{ cursor: "pointer" }}
                  />
                )}
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              direction={"row"}
              textAlign={"center"}
              marginTop={2}
            >
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
            <Grid item>
              <Grid container direction={"row"}>
                <Grid item xs={6} textAlign={"left"}>
                  <LikeButton post={props.post} />
                </Grid>
                <Grid item xs={6}>
                  <Stack direction={"row"} spacing={0.5} marginLeft={"50%"}>
                    <TextsmsIcon
                      onClick={() => {
                        setShowComments(!showComments);
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                    <Typography marginBottom={"1%"}>
                      {props.post.comments.length}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid>{showComments && <CardComment post={props.post} />}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Card;
