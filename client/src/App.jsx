import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./components/Routes";
import { AppBar, Toolbar, Typography } from "@mui/material";
require("dotenv").config();

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h3">MERN</Typography>
        </Toolbar>
      </AppBar>
      <Routes />
    </React.Fragment>
  );
};

export default App;
