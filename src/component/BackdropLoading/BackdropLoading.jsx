import React from "react";

import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const BackdropLoading = () => {
    return(
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress size="5rem" />
            </Backdrop>
        </div>
    )
}

export default BackdropLoading