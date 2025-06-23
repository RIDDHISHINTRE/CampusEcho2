

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const Notifications = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = localStorage.getItem("id");

    const [newMessages, setNewMessages] = useState([]);
    const [unrepliedMessages, setUnrepliedMessages] = useState([]);

    const updateUnreadCount = location.state?.updateUnreadCount;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // 1️⃣ Fetch unseen messages
                const unseenRes = await axiosInstance.get(`/notifications/${userId}`);
                const uniqueSenders = new Map();

                unseenRes.data.data.forEach(notif => {
                    if (!uniqueSenders.has(notif.senderId)) {
                        uniqueSenders.set(notif.senderId, notif);
                    }
                });

                setNewMessages([...uniqueSenders.values()]);

                // 2️⃣ Fetch recent unreplied messages
                const unrepliedRes = await axiosInstance.get(`/notifications/unreplied/${userId}`);
                setUnrepliedMessages(unrepliedRes.data.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [userId]);

    const handleNotificationClick = async (senderId, senderName) => {
        try {
            // ✅ Mark messages from that sender as read
            await axiosInstance.put(`/notifications/mark-as-read/${userId}`);

            // ✅ Update notification count badge
            if (updateUnreadCount) updateUnreadCount();

            // ✅ Navigate to chat
            navigate(`/chat/${senderId}`, { state: { senderName } });
        } catch (err) {
            console.error("Error marking messages as read:", err);
        }
    };

    return (
        <div className="h-screen w-screen p-8 bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-10">

                {/* ✅ Section 1: New Unread Messages */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">📬 New Messages</h2>
                    {newMessages.length === 0 ? (
                        <p className="text-gray-500">No new messages</p>
                    ) : (
                        <ul className="space-y-4">
                            {newMessages.map((notif) => (
                                <li
                                    key={`new-${notif.senderId}`}
                                    className="flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm cursor-pointer transition-all"
                                    onClick={() => handleNotificationClick(notif.senderId, notif.senderName)}
                                >
                                    <div>
                                        <p className="text-lg font-semibold">{notif.senderName}</p>
                                    </div>
                                    <span className="text-xs text-blue-500 font-medium">Click to view chat</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* ✅ Section 2: Messages from last 2 days but unreplied */}
                <div>
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">🕓 Pending Reply</h2>
                    {unrepliedMessages.length === 0 ? (
                        <p className="text-gray-500">No pending replies</p>
                    ) : (
                        <ul className="space-y-4">
                            {unrepliedMessages.map((notif) => (
                                <li
                                    key={`old-${notif.senderId}`}
                                    className="flex justify-between items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg shadow-sm cursor-pointer transition-all"
                                    onClick={() => handleNotificationClick(notif.senderId, notif.senderName)}
                                >
                                    <div>
                                        <p className="text-lg font-semibold">{notif.senderName}</p>
                                        <p className="text-sm text-gray-500">{notif.message}</p>
                                    </div>
                                    <span className="text-xs text-yellow-500 font-medium">Click to follow up</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;



