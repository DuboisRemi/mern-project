import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Container,
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
    <div>
      {post.comments.map((comment) => {
        return (
          <Container>
            <Stack key={comment._id} direction={"row"}>
              <Avatar
                src={usersData
                  .map((user) => {
                    if (user._id === comment.commenterId) return user.picture;
                    else return null;
                  })
                  .join("")}
                alt={usersData
                  .map((user) => {
                    if (user._id === comment.commenterId) return user.pseudo;
                    else return null;
                  })
                  .join("")}
              />
              <Typography marginLeft={"10%"} variant={"body1"}>
                {comment.commenterPseudo}
              </Typography>
              {comment.commenterId !== userData._id && (
                <FollowHandler idToFollow={comment.commenterId} />
              )}
            </Stack>
            <Typography variant={"body2"}>{comment.text}</Typography>
          </Container>
        );
      })}
      <Box component="form" onSubmit={handleComment} noValidate>
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
          sx={{ height: "30px", width: "60px", marginLeft: "60%" }}
        >
          Publier
        </Button>
      </Box>
    </div>
  );
};

export default CardComment;
