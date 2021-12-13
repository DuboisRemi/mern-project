import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Log from "../components/Log/index";
import { UidContext } from "../components/AppContext";
import Loading from "../components/Loading";

const Profile = () => {
  const uid = useContext(UidContext);
  if (uid) {
    if (uid === "default")
      return (
        <main>
          <Box boxShadow={12} sx={{ p: 4, m: 2, borderRadius: 4 }}>
            <Log signin={false} signup={true} />
          </Box>
        </main>
      );
    else if (uid.length > 1) {
      window.location = `profile/${uid}`;
      return <Loading />;
    }
  } else {
    return <Loading />;
  }
};
export default Profile;
