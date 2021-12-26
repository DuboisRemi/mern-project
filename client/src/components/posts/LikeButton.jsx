import React, { useContext, useEffect, useState } from "react";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import UserContext from "../../AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import { Stack, Typography } from "@mui/material";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UserContext).uid;
  const dispatch = useDispatch();
  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };
  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post, liked]);
  if (!liked) {
    return (
      <Stack
        direction={"row"}
        spacing={0.5}
        sx={{ marginBottom: "10px", marginLeft: "10px" }}
      >
        <GradeOutlinedIcon
          color={"primary"}
          onClick={like}
          alt={"like"}
          sx={{ cursor: "pointer" }}
        />
        <Typography>{post.likers.length}</Typography>
      </Stack>
    );
  } else if (liked) {
    return (
      <Stack direction={"row"} spacing={0.5} sx={{ margin: "10px" }}>
        <GradeIcon color={"primary"} onClick={unlike} alt={"unlike"} />
        <Typography marginBottom={"1%"}>{post.likers.length}</Typography>
      </Stack>
    );
  }
};

export default LikeButton;
