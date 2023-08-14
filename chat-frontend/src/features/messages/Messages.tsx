import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import MessagesForm from "./components/MessagesForm";
import OneMessage from "./components/OneMessage";
import {selectFetching, selectMessages} from "./messagesSlice";
import Spinner from '../../components/UI/Spinner/Spinner';


const Messages = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages);
    const loading = useAppSelector(selectFetching);

    const fetchMessages = useCallback(async () => {
    }, [dispatch]);


    useEffect(() => {
        void fetchMessages();
        setInterval(fetchMessages,5000);
    }, [fetchMessages]);

    const oneMessage = messages.map(message => (
        <OneMessage message={message.message}
                 author={message.author}
                 key={message.id}
        />
    ));
    return (
        <Container>
            <Grid container
                  spacing={5}>
                <Grid item xs={4}>
                    <MessagesForm/>
                </Grid>
                <Grid item xs={8} textAlign={'center'}>
                    <Typography>
                        All posts
                    </Typography>
                    {loading && <Spinner/>}
                    {oneMessage}
                </Grid>
            </Grid>
        </Container>
    )

};

export default Messages;