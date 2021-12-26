import React from "react";
import { AppBar, Link, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";

const NavBar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container>
          <Grid item xs={4} style={{ textAlign: "center", marginTop: "1.5%" }}>
            <Link href="/">
              <HomeIcon color="secondary" fontSize="large" />
            </Link>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center", marginTop: "1.5%" }}>
            <Link href="/trending">
              <TrendingUpIcon color="secondary" fontSize="large" />
            </Link>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center", marginTop: "1.5%" }}>
            <Link href="/profile">
              <PersonIcon color="secondary" fontSize="large" />
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
