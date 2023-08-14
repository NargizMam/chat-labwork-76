import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import axiosApi from "../../AxiosApi";
import {Message, MessageMutation} from "../../types";

export const fetchAllMessages = createAsyncThunk<Message[], undefined, {state: RootState}>(
    'messages/fetchAll',
    async (_, thunkAPI) => {
        let url = '/messages';
        const apiMessages = thunkAPI.getState().messages.messages;
        const lastMessage = apiMessages[apiMessages.length - 1];
        if(lastMessage) {
            url += `?datetime=${lastMessage.dateTime}`;
        }
        const postsResponse = await axiosApi.get<Message[]>(url);
        return postsResponse.data;
    }
);

export const createMessages = createAsyncThunk<void, MessageMutation>(
    'messages/create',
    async (productMutation) => {
        await axiosApi.post('messages', productMutation);
    }
);