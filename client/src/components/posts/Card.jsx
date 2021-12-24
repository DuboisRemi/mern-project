import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils";
import FollowHandler from "../profile/FollowHandler";
import { Avatar, Box, List, ListItem, Stack, Typography } from "@mui/material";
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
        <Stack direction={"column"}>
          <Stack direction={"row"}>
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
            <Typography
              variant={"h5"}
              sx={{ position: "relative", left: "40%" }}
            >
              {usersData
                .map((user) => {
                  if (user._id === props.post.posterId) return user.pseudo;
                })
                .join("")}
            </Typography>
            {props.post.posterId !== userData._id ? (
              <Container sx={{ position: "relative", left: "30%" }}>
                <FollowHandler idToFollow={props.post.posterId} />
              </Container>
            ) : (
              <DeleteOutlinedIcon
                onClick={handleDelete}
                sx={{ cursor: "pointer", position: "relative", left: "70%" }}
              />
            )}
          </Stack>
          <Typography variant={"body2"}>{props.post.message}</Typography>
          {props.post.picture && (
            <Box boxShadow={12} width={250} height={250} margin={"auto"}>
              <Image
                src={props.post.picture}
                aspectRatio={1 / 1}
                animationDuration={300}
              />
            </Box>
          )}
          {props.post.video && (
            <Box boxShadow={12} width={500} height={300} margin={"auto"}>
              <iframe
                width="500"
                height="300"
                src={props.post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={props.post._id}
              />
            </Box>
          )}

          <Stack
            direction={"rom"}
            sx={{
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            <Container>
              <LikeButton post={props.post} />
            </Container>
            <TextsmsIcon
              onClick={() => {
                setShowComments(!showComments);
              }}
              sx={{ cursor: "pointer" }}
            />
            <Typography>{props.post.comments.length}</Typography>
          </Stack>
          <Container
            sx={{
              position: "static",
              top: 10,
              marginTop: "20px",
              bottom: 0,
            }}
          >
            {showComments && <CardComment post={props.post} />}
          </Container>
        </Stack>
      )}
    </div>
  );
};

export default Card;
