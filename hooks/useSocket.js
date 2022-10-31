import { io } from "socket.io-client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, setOnlineUsers } from "redux/socketSlice";
import {
    addNewOrderNotification,
    showErrorAlert,
    showInfoAlert,
    showSuccessAlert,
} from "redux/alertSlice";
import { addNewOrder, updateCustomerOrder } from "redux/orderSlice";
import {
    updateConversation,
    updateChatLastMessageReadBy,
    addNewMessage,
} from "redux/chatSlice";

export const useSocket = () => {
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.auth);
    const { selectedChat, chatsMessages } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    // initializing socket and registering events on it
    useEffect(() => {
        if (!user) return;
        if (socket) return;

        const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
            transports: ["websocket"],
        });

        socketInstance.on("connect", () => {
            socketInstance.emit("newConnection", {
                userId: user._id,
                userRole: user.role,
            });
        });

        socketInstance.on("onlineUsers", (onlineUsers) => {
            dispatch(setOnlineUsers(onlineUsers));
        });

        socketInstance.on(
            "newOrderNotification",
            ({ newOrder, notification }) => {
                dispatch(
                    showInfoAlert(
                        `${notification.customerName} placed a new order 😍`
                    )
                );
                dispatch(addNewOrderNotification(notification));
                dispatch(addNewOrder(newOrder));
            }
        );

        socketInstance.on("orderStatusUpdate", (updatedOrder) => {
            if (updatedOrder.status === "cancelled") {
                dispatch(
                    showErrorAlert(
                        `Your order with id:${updatedOrder._id} has been ${updatedOrder.status}`
                    )
                );
            } else {
                dispatch(
                    showSuccessAlert(
                        `Your order with id:${updatedOrder._id} ${
                            updatedOrder.status === "processing"
                                ? "is in "
                                : "has been"
                        } ${updatedOrder.status}`
                    )
                );
            }
            dispatch(updateCustomerOrder(updatedOrder));
        });

        socketInstance.on(
            "newMessage",
            ({ newMessage, updatedConversation, senderName }) => {
                dispatch(showInfoAlert(`${senderName} just messaged you`));
                dispatch(updateConversation({ updatedConversation }));
                dispatch(updateChatLastMessageReadBy(updatedConversation._id));
                dispatch(
                    addNewMessage({
                        chatId: updatedConversation._id,
                        message: newMessage,
                    })
                );
            }
        );

        dispatch(setSocket(socketInstance));
    }, [user]);
};
