import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";


const Messages = () => {
    const dispatch = useAppDispatch();


    const fetchPosts = useCallback(async () => {
    }, [dispatch]);

    useEffect(() => {
        void fetchPosts();
        setInterval(fetchPosts,5000);
    }, [fetchPosts]);


    return (
        <Container>
            <Grid container
                  spacing={5}>
                <Grid item xs={8} textAlign={'center'}>
                    <Typography>
                        All posts
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )

};

export default Messages;