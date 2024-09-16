import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [], // Initialize as an empty array to avoid "undefined" issues
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload; // Replace the entire array
    },
    appendMessage: (state, action) => {
      if (!Array.isArray(state.messages)) {
        state.messages = []; // Ensure it's an array before pushing
      }
      state.messages.push(action.payload); // Append new message
    },
  },
});

export const { setMessages, appendMessage } = messageSlice.actions;
export default messageSlice.reducer;
