import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { Box, Button, TextField } from "@mui/material";

const PostForm = () => {
  const userData = useSelector((state) => state.userReducer);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const handlePost = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
      data: {
        posterId: userData._id,
        message: post,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          dispatch(getPosts());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box component="form" onSubmit={handlePost} noValidate sx={{ mt: 1 }}>
      <label htmlFor="post">Nouvelle publication</label>
      <br />
      <TextField
        margin="normal"
        required
        fullWidth
        id="post"
        label="Que voulez vous partager ?"
        name="publication"
        autoFocus
        onChange={(e) => setPost(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Publier
      </Button>
    </Box>
  );
};

export default PostForm;
