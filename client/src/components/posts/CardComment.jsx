import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isEmpty } from "../../utils";
import FollowHandler from "../profile/FollowHandler";
import { addComment, getPosts } from "../../actions/post.actions";

const CardComment = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container
      style={{
        border: "0.5px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "20px",
      }}
    >
      <List>
        {post.comments.map((comment) => {
          return (
            <ListItem key={comment._id} divider={true}>
              <Container
                sx={{
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <Stack key={comment._id} direction={"row"} spacing={2}>
                  <Avatar
                    src={usersData
                      .map((user) => {
                        if (user._id === comment.commenterId)
                          return user.picture;
                        else return null;
                      })
                      .join("")}
                    alt={usersData
                      .map((user) => {
                        if (user._id === comment.commenterId)
                          return user.pseudo;
                        else return null;
                      })
                      .join("")}
                  />
                  <Typography variant={"body1"}>
                    {comment.commenterPseudo}
                  </Typography>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler idToFollow={comment.commenterId} />
                  )}
                </Stack>
                <Typography variant={"body2"}>{comment.text}</Typography>
              </Container>
            </ListItem>
          );
        })}
      </List>
      <Box
        component="form"
        onSubmit={handleComment}
        noValidate
        textAlign={"center"}
      >
        <TextField
          margin="normal"
          required
          id="text"
          label="Laisser un commentaire"
          name="text"
          autoFocus
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ height: "30px", width: "60px" }}
        >
          Publier
        </Button>
      </Box>
    </Container>
  );
};

export default CardComment;
