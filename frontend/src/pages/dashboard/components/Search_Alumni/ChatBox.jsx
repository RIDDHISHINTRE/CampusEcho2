
// import { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
// import axiosInstance from "../../../../utils/axiosInstance";

// const socket = io("http://localhost:3000"); // WebSocket connection

// const ChatBox = () => {
//     const { receiverId } = useParams();
//     const senderId = localStorage.getItem("id");
//     const location = useLocation();

//     const [senderName, setSenderName] = useState(location.state?.senderName || "Chat");
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const response = await axiosInstance.get(`/messages/${senderId}/${receiverId}`);
//                 setMessages(response.data.data);

//                 if (!location.state?.senderName) {
//                     const userResponse = await axiosInstance.get(`/users/${receiverId}`);
//                     setSenderName(userResponse.data.name);
//                 }
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         };
//         fetchMessages();

//         socket.on("receiveMessage", (message) => {
//             setMessages((prev) => [...prev, message]);
//         });

//         return () => {
//             socket.off("receiveMessage");
//         };
//     }, [receiverId]);

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         const messageData = { senderId, receiverId, message: newMessage };
//         try {
//             const response = await axiosInstance.post("/messages/send", messageData);
//             const savedMessage = response.data.data;

//             socket.emit("sendMessage", savedMessage);
//             setMessages([...messages, savedMessage]);
//             setNewMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-4 border rounded shadow-lg bg-white">
//             <h2 className="text-xl font-bold mb-4">{senderName}</h2>

//             <div className="h-96 overflow-y-auto border p-2 rounded space-y-2">
//             {messages.map((msg, index) => {
//                 const isOwnMessage = String(msg.senderId) === String(senderId);
//                 return (
//                     <div
//                         key={index}
//                         className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
//                     >
//                     <span
//                         className={`inline-block px-4 py-2 rounded-lg max-w-xs break-words ${
//                             isOwnMessage
//                                 ? "bg-green-500 text-white"
//                                 : "bg-gray-300 text-black"
//                         }`}
//                     >
//                 {msg.message}
//             </span>
//         </div>
//     );
// })}

//             </div>

//             <div className="mt-4 flex">
//                 <input
//                     type="text"
//                     className="flex-1 p-2 border rounded"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                 />
//                 <button
//                     className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
//                     onClick={sendMessage}
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatBox;
// import { useEffect, useRef, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
// import axiosInstance from "../../../../utils/axiosInstance";

// const socket = io("http://localhost:3000");

// const ChatBox = () => {
//     const { receiverId } = useParams();
//     const senderId = localStorage.getItem("id");
//     const location = useLocation();

//     const [senderName, setSenderName] = useState(location.state?.senderName || "Chat");
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const response = await axiosInstance.get(`/messages/${senderId}/${receiverId}`);
//                 setMessages(response.data.data);

//                 if (!location.state?.senderName) {
//                     const userResponse = await axiosInstance.get(`/users/${receiverId}`);
//                     setSenderName(userResponse.data.name);
//                 }
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         };

//         fetchMessages();

//         socket.on("receiveMessage", (message) => {
//             setMessages((prev) => [...prev, message]);
//         });

//         return () => {
//             socket.off("receiveMessage");
//         };
//     }, [receiverId]);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         const messageData = { senderId, receiverId, message: newMessage };
//         try {
//             const response = await axiosInstance.post("/messages/send", messageData);
//             const savedMessage = response.data.data;

//             socket.emit("sendMessage", savedMessage);
//             setMessages([...messages, savedMessage]);
//             setNewMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <div className="bg-gray-100 h-screen w-screen flex justify-center items-center">
//             <div className="w-full max-w-6xl h-[90vh] p-8 border rounded-2xl shadow-2xl bg-white flex flex-col">
//                 <h2 className="text-3xl font-semibold text-center mb-6">{senderName}</h2>

//                 <div className="flex-1 overflow-y-auto border p-6 rounded-lg space-y-4 bg-gray-50">
//                     {messages.map((msg, index) => {
//                         const isOwnMessage = String(msg.senderId) === String(senderId);
//                         return (
//                             <div
//                                 key={index}
//                                 className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
//                             >
//                                 <span
//                                     className={`inline-block px-5 py-3 rounded-xl max-w-xl break-words text-base ${
//                                         isOwnMessage
//                                             ? "bg-green-500 text-white"
//                                             : "bg-gray-300 text-black"
//                                     }`}
//                                 >
//                                     {msg.message}
//                                 </span>
//                             </div>
//                         );
//                     })}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 <div className="mt-6 flex items-center">
//                     <input
//                         type="text"
//                         className="flex-1 p-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//                         placeholder="Type a message..."
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                     />
//                     <button
//                         className="ml-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-base transition-all"
//                         onClick={sendMessage}
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatBox;

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { io } from "socket.io-client";

// Replace this with your actual deployed backend URL
const socket = io("https://campus-echo-backend.onrender.com", {
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

    socket.on("messagesSeen", (seenIds) => {
      setMessages((prev) =>
        prev.map((msg) =>
          seenIds.includes(msg.id) ? { ...msg, isRead: true } : msg
        )
      );
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messagesSeen");
    };
  }, [receiverId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = { senderId, receiverId, message: newMessage };
    try {
      const response = await axiosInstance.post("/messages/send", messageData);
      const savedMessage = response.data.data;

      socket.emit("sendMessage", savedMessage);
      setMessages((prev) => [...prev, savedMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
              <div
                className={`px-5 py-3 rounded-xl max-w-md break-words text-base ${
                  isOwnMessage ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
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
