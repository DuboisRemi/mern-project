import React, {useContext} from "react";
import Box from "@mui/material/Box";
import Log from "../components/Log/index";
import {UidContext} from "../components/AppContext";

const Profile = () => {
    const uid = useContext(UidContext);
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
                {uid ? (<h1>uid</h1>) : <Log signin={false} signup={true}/>}
            </Box>
        </main>
    );
};

export default Profile;
