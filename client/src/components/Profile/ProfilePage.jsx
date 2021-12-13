import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import Container from "@mui/material/Container";
import EditProfile from "./EditProfile";
import ShowProfile from "./ShowProfile";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Loading from "../Loading";

const ProfilePage = () => {
  const uid = useContext(UidContext);
  const [userInfos, setUserInfos] = useState(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserInfos = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) setUserInfos(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUserInfos();
  }, [uid]);

  if (userInfos) {
    return (
      <Container>
        <Box boxShadow={12} sx={{ p: 4, m: 2, borderRadius: 4 }}>
          {editMode ? (
            <Container>
              <EditProfile userInfos={userInfos} />
              <Button
                style={{
                  position: "relative",
                  paddingLeft: "80%",
                }}
                onClick={() => {
                  setEditMode(false);
                }}
              >
                Quit
              </Button>
            </Container>
          ) : (
            <Container>
              <ShowProfile userInfos={userInfos} />
              <Button
                style={{
                  position: "relative",
                  paddingLeft: "80%",
                }}
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </Button>
            </Container>
          )}
        </Box>
      </Container>
    );
  } else {
    return (
      <Container marginTop="50%">
        <Loading size="Large" />
      </Container>
    );
  }
};

export default ProfilePage;
