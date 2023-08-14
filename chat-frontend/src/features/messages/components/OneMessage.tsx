import React from 'react';
import {Grid, Typography} from "@mui/material";

interface Props {
    message: string,
    author: string
}

const OneMessage: React.FC<Props> = ({message, author}) => {
    return (
        <>
            <Grid container>
                <Grid item xs={8} margin={2} border={2}>
                    <Typography>
                        Message text: <strong>"{message}"</strong>
                    </Typography>
                    <Typography>
                        Author: <strong>{author}</strong>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default OneMessage;