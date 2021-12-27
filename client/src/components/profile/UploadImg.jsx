import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import { Button, Input } from "@mui/material";
import Grid from "@mui/material/Grid";

const UploadImg = () => {
  const [file, setFile] = useState({});
  const [updatePicture, setUpdatePicture] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleUpdatePicture = () => {
    setUpdatePicture(!updatePicture);
  };
  const handlePicture = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    for (var p of data) {
	console.log(p);
	}
    dispatch(uploadPicture(data, userData._id));
  };
  return (
    <Grid container direction={"column"} margin={"2%"}>
      <form action="" onSubmit={handlePicture}>
        <Grid item>
          <Button
            onClick={handleUpdatePicture}
            variant={"contained"}
            fullWidth={true}
          >
            {updatePicture ? "Retour" : "Changer d'image de profil"}
          </Button>
        </Grid>
        {updatePicture && (
          <Grid item>
            <Input
              color={"secondary"}
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Grid>
        )}
        {updatePicture && (
          <Grid item>
            <Input color={"primary"} type="submit" value="Envoyer" />
          </Grid>
        )}
      </form>
    </Grid>
  );
};

export default UploadImg;
