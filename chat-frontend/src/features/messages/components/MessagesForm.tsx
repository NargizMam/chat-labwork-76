import React, {useState} from 'react';
import {Grid, TextareaAutosize, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectCreating} from "../messagesSlice";
import {createMessages, fetchAllMessages} from "../messagesThunk";


const MessagesForm = () => {
    const dispatch = useAppDispatch();
    const initialPost = {author:'', message:''};
    const [postState, setPostState] = useState(initialPost);
    const creating = useAppSelector(selectCreating);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setPostState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setPostState(initialPost);
        await dispatch(createMessages(postState));
        dispatch(fetchAllMessages());
    };
    return (
        <>
            <Typography>Add new message</Typography>
            <form onSubmit={submitFormHandler}>
                <Grid container
                      direction="column"
                      maxWidth="md"
                      textAlign="center"
                      margin={3}
                      rowSpacing={2}>
                    <TextField
                        fullWidth
                        sx={{ marginBottom: 3 }}
                        name="author"
                        label="Messages author"
                        value={postState.author}
                        onChange={inputChangeHandler}
                        required

                    />
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Messages text"
                        name="message"
                        minRows={8}
                        value={postState.message}
                        onChange={inputChangeHandler}
                        required
                    />
                </Grid>
                <LoadingButton
                    type="submit"
                    loading={creating}
                    disabled={postState.author === '' || postState.message === ''}
                    style={{marginLeft: '35px'}}
                    variant="outlined">
                    Add new post
                </LoadingButton>
            </form>
        </>
    );
};

export default MessagesForm;