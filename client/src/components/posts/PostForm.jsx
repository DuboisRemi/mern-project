import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isEmpty } from "../../utils";
import Loading from "../Loading";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Image from "material-ui-image";

const PostForm = () => {
  const userData = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  function handleVideo() {
    let findLink = post.split(" ");
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");
        setVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setPost(findLink.join(" "));
      }
    }
  }

  useEffect(() => {
    if (!isEmpty(userData)) {
      setLoading(false);
    }
    handleVideo();
  }, [userData, post, video]);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handlePost = async (e) => {
    if (post || postPicture || video) {
      e.preventDefault();
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", post);
      data.append("video", video);
      if (file) {
        data.append("file", file);
      }
      await dispatch(addPost(data));
      dispatch(getPosts());
    } else {
      alert("Impossible de faire une publication vide");
    }
  };

  if (loading) return <Loading />;
  else {
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
        {post || postPicture || video.length > 5 ? (
          <Stack>
            <Avatar src={userData.picture} />
            <Typography variant={"h6"}>{userData.pseudo}</Typography>
            <Typography variant={"body1"}>{post}</Typography>
            {postPicture && (
              <Box boxShadow={12} width={250} height={250} margin={"auto"}>
                <Image
                  src={postPicture}
                  alt={"preview"}
                  aspectRatio={1 / 1}
                  animationDuration={300}
                />
              </Box>
            )}
            {video && (
              <iframe
                width="500"
                height="300"
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video}
              />
            )}
          </Stack>
        ) : null}
        <div className={"footer"}>
          {isEmpty(video) && (
            <>
              <input
                type={"file"}
                id={"file-upload"}
                name={"file"}
                accept={".jpg, .jpeg, .png"}
                onChange={(e) => handlePicture(e)}
                style={{
                  display: "none",
                }}
              />
              <label htmlFor={"file-upload"}>
                <span>
                  <InsertPhotoOutlinedIcon color={"primary"} />
                </span>
              </label>
            </>
          )}
          {video && (
            <button onClick={() => setVideo("")}>Supprimer video</button>
          )}
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Publier
        </Button>
      </Box>
    );
  }
};

export default PostForm;
