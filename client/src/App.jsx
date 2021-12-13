import axios from "axios";
import React, {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./components/Routes";
import {AppBar, Link, Toolbar} from "@mui/material";
import {UidContext} from "./components/AppContext";
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Grid";

require("dotenv").config();

const App = () => {
    const [uid, setUid] = useState(undefined);

    useEffect(() => {
        const fetchId = async () => {
            await axios.get(
                `${process.env.REACT_APP_API_URL}jwtid`,
                {withCredentials: true}
            ).then((res) => {
                if (res.data) setUid(res.data);
            }).catch((err) => {
                setUid("default");
            });
        };
        fetchId();
    }, []);

    return (
        <UidContext.Provider value={uid}>
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={4} style={{textAlign: "center", marginTop: "1.5%"}}>
                                <Link href='/'>
                                    <HomeIcon color="secondary" fontSize="large"/>
                                </Link>
                            </Grid>
                            <Grid item xs={4} style={{textAlign: "center", marginTop: "1.5%"}}>
                                <Link href='/trending'>
                                    <TrendingUpIcon color="secondary" fontSize="large" horizontalAlign="middle"/>
                                </Link>
                            </Grid>
                            <Grid item xs={4} style={{textAlign: "center", marginTop: "1.5%"}}>
                                <Link href='/profile'>
                                    <PersonIcon color="secondary" fontSize="large"/>
                                </Link>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Routes/>
            </React.Fragment>
        </UidContext.Provider>
    );
};

export default App;
