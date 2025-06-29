import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { io } from "socket.io-client";

// 🔁 Use your deployed backend URL
const SOCKET_SERVER_URL = "https://campus-echo-backend.onrender.com";

const socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"],
});

const ChatBox = () => {
    const { receiverId } = useParams();
    const senderId = localStorage.getItem("id");
    const location = useLocation();

    const [senderName, setSenderName] = useState(location.state?.senderName || "Chat");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        socket.emit("register", senderId);

        const fetchMessages = async () => {
            try {
                const response = await axiosInstance.get(`/messages/${senderId}/${receiverId}`);
                setMessages(response.data.data);

                if (!location.state?.senderName) {
                    const userResponse = await axiosInstance.get(`/users/${receiverId}`);
                    setSenderName(userResponse.data.name);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();

        socket.emit("seenMessages", { senderId, receiverId });

        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on("messagesSeen", (seenIds) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    seenIds.includes(msg.id) ? { ...msg, isRead: true } : msg
                )
            );
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("messagesSeen");
        };
    }, [receiverId, senderId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const messageData = { senderId, receiverId, message: newMessage };
        socket.emit("sendMessage", messageData);
        setNewMessage("");
    };

    const lastSentIndex = [...messages]
        .reverse()
        .findIndex((msg) => String(msg.senderId) === String(senderId));
    const lastSentMessageId =
        lastSentIndex !== -1 ? messages[messages.length - 1 - lastSentIndex].id : null;

    return (
        <div className="max-w-4xl h-[90vh] mx-auto p-6 border rounded-xl shadow-xl bg-white flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-center">{senderName}</h2>

            <div className="flex-1 overflow-y-auto border p-4 rounded space-y-4 bg-gray-50">
                {messages.map((msg) => {
                    const isOwnMessage = String(msg.senderId) === String(senderId);
                    const isLastSent = msg.id === lastSentMessageId;

                    return (
                        <div key={msg.id} className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
                            <div className={`px-5 py-3 rounded-xl max-w-md break-words text-base ${
                                isOwnMessage ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                            }`}>
                                {msg.message}
                            </div>
                            {isOwnMessage && isLastSent && (
                                <div className="text-xs text-gray-500 mt-1 pr-2">
                                    {msg.isRead ? (
                                        <span className="text-blue-500">✔✔ Seen</span>
                                    ) : (
                                        <span className="text-gray-400">✔ Sent</span>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex">
                <input
                    type="text"
                    className="flex-1 p-3 border rounded-xl text-base"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className="ml-3 bg-green-500 text-white px-6 py-3 rounded-xl"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
