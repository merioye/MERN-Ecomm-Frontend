import { createSlice } from "@reduxjs/toolkit";
import { showErrorAlert } from "./alertSlice";
import axiosInstance from "config/axios";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        showChatBox: false,
        selectedChat: null,
        conversations: { isConversationsFetched: false, conversationsList: [] },
        chatsMessages: {},
    },
    reducers: {
        toggleChatBoxVisibility(state, action) {
            state.showChatBox = action.payload;
        },
        setSelectedChat(state, action) {
            state.selectedChat = action.payload;
        },
        setConversations(state, action) {
            state.conversations = {
                isConversationsFetched: true,
                conversationsList: action.payload,
            };
        },
        updateConversation(state, action) {
            const { updatedConversation } = action.payload;
            const filteredConversations =
                state.conversations.conversationsList.filter((conversation) => {
                    return conversation._id !== updatedConversation._id;
                });
            state.conversations = {
                ...state.conversations,
                conversationsList: [
                    updatedConversation,
                    ...filteredConversations,
                ],
            };
        },
        setChatsMessages(state, action) {
            const { chatId, messages } = action.payload;
            state.chatsMessages = {
                ...state.chatsMessages,
                [chatId]: messages,
            };
        },
        addNewMessage(state, action) {
            const { chatId, message } = action.payload;
            if (!state.chatsMessages.hasOwnProperty(chatId)) return;

            state.chatsMessages = {
                ...state.chatsMessages,
                [chatId]: [...state.chatsMessages[chatId], message],
            };
        },
        updateMessage(state, action) {
            const { chatId, messageId, updatedMessage } = action.payload;
            const updatedMessages = state.chatsMessages[chatId].map(
                (message) => {
                    return message._id === messageId ? updatedMessage : message;
                }
            );
            state.chatsMessages = {
                ...state.chatsMessages,
                [chatId]: updatedMessages,
            };
        },
    },
});

export default chatSlice.reducer;
export const {
    toggleChatBoxVisibility,
    setSelectedChat,
    setConversations,
    updateConversation,
    setChatsMessages,
    addNewMessage,
    updateMessage,
} = chatSlice.actions;

// Thunks
export function fetchAllConversations() {
    return async function fetchAllConversationsThunk(dispatch) {
        try {
            const res = await axiosInstance.get("/api/chats");
            dispatch(setConversations(res.data.chats));
        } catch (e) {
            console.log(e);
        }
    };
}

export function fetchChatMessages() {
    return async function fetchChatMessagesThunk(dispatch, getState) {
        const { selectedChat, chatsMessages } = getState().chat;
        try {
            if (!selectedChat) return;
            if (chatsMessages.hasOwnProperty(selectedChat._id)) return;

            const res = await axiosInstance.get(
                `/api/chats/${selectedChat._id}`
            );
            dispatch(
                setChatsMessages({
                    chatId: selectedChat._id,
                    messages: res.data.messages,
                })
            );
        } catch (e) {
            console.log(e);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function sendMsg(chatId, msgReceiverId, message) {
    return async function sendMsgThunk(dispatch, getState) {
        const { user } = getState().auth;
        const { socket } = getState().socket;
        const { conversationsList } = getState().chat.conversations;

        // preparing data to temporarily show to message sender
        // until response from server is not received
        const previousConversations = [...conversationsList];
        const conversation = previousConversations.find(
            (con) => con._id === chatId
        );

        const tempMessage = {
            ...message,
            _id: Date.now(),
            senderId: user._id,
            status: "loading",
        };
        const tempUpdatedConversation = {
            ...conversation,
            lastMessage: tempMessage.text,
            lastMessageReadBy: [user._id],
        };

        try {
            dispatch(addNewMessage({ chatId, message: tempMessage }));
            dispatch(
                updateConversation({
                    updatedConversation: tempUpdatedConversation,
                })
            );

            const res = await axiosInstance.put(
                `/api/chats/${chatId}`,
                message
            );

            dispatch(
                updateMessage({
                    chatId,
                    messageId: tempMessage._id,
                    updatedMessage: {
                        ...res.data.newMessage,
                        status: "success",
                    },
                })
            );
            dispatch(
                updateConversation({
                    updatedConversation: res.data.updatedConversation,
                })
            );

            socket.emit("newMessage", {
                userId: msgReceiverId,
                senderName: user.name,
                ...res.data,
            });
        } catch (e) {
            console.log(e);
            dispatch(
                updateMessage({
                    chatId,
                    messageId: tempMessage._id,
                    updatedMessage: { ...tempMessage, status: "error" },
                })
            );
            dispatch(setConversations(previousConversations));
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function updateChatLastMessageReadBy(chatId) {
    return async function updateChatLastMessageReadByThunk(dispatch, getState) {
        const { selectedChat } = getState().chat;
        try {
            if (!selectedChat || selectedChat._id !== chatId) return;

            const res = await axiosInstance.patch(`/api/chats/${chatId}`);
            dispatch(
                updateConversation({
                    updatedConversation: res.data.updatedConversation,
                })
            );
        } catch (e) {
            console.log(e);
        }
    };
}
