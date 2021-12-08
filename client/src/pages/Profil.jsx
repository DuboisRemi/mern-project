import React from "react";
import Box from "@mui/material/Box";
import Log from "../components/Log/index";

const Profil = () => {
  return (
    <main>
      <Box
        boxShadow={12}
        sx={{
          p: 4,
          m: 2,
          borderRadius: 4,
        }}
      >
        <Log signin={false} signup={true} />
      </Box>
    </main>
  );
};

export default Profil;
