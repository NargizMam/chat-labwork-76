import {createSlice} from "@reduxjs/toolkit";

import {RootState} from "../../app/store";
import {createMessages, fetchAllMessages} from "./messagesThunk";
import {Message} from "../../types";

interface MessageState {
    messages: Message[],
    fetchLoading: boolean,
    createLoading: boolean
}

const initialState: MessageState = {
    messages: [],
    fetchLoading: false,
    createLoading: false
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllMessages.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchAllMessages.fulfilled, (state, {payload: posts}) => {
            state.fetchLoading = false;
            state.messages.push(...posts);
        });
        builder.addCase(fetchAllMessages.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createMessages.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createMessages.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createMessages.rejected, (state) => {
            state.createLoading = false;
        });
    }
});

export const messagesReducer = messagesSlice.reducer;
export const selectMessages = (state: RootState) => state.messages.messages;
export const selectFetching = (state: RootState) => state.messages.fetchLoading;
export const selectCreating = (state: RootState) => state.messages.createLoading;