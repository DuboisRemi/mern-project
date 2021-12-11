import axios from "axios";
import React, {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./components/Routes";
import {AppBar, Link, Toolbar} from "@mui/material";
import {UidContext} from "./components/AppContext";

require("dotenv").config();

const App = () => {
    const [uid, setUid] = useState(undefined);

    useEffect(() => {
        const fetchId = async () => {
            await axios.get(
                `${process.env.REACT_APP_API_URL}jwtid`,
                {withCredentials: true}
                ).then((res)=> {
                    setUid(res.data);
            }).catch((err)=> console.error(err));
        };
        fetchId();
    }, []);

    return (
        <UidContext.Provider value={uid}>
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <Link underline="none" variant="h3" href='/' color={"ContrastText.primary"}>MERN</Link>
                    </Toolbar>
                </AppBar>
                <Routes/>
            </React.Fragment>
        </UidContext.Provider>
    );
};

export default App;
