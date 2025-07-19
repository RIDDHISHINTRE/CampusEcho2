


const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const sequelize = require('./config/database');
require('dotenv').config();
const cors = require('cors');
const cron = require("node-cron");
const deleteExpiredJobs = require('./utils/deleteExpiredJobs');
const deleteOldMessages = require('./utils/deleteOldMessages');
const Message = require('./models/Message');

// Routes
const authRoutes = require('./routes/authroutes');
const passwordRoutes = require('./routes/passwordRoutes');
const eventRoutes = require('./routes/eventRoutes');
const profileRoutes = require('./routes/profileRoutes');
const jobRoutes = require('./routes/jobroutes');
const searchRoutes = require('./routes/searchRoutes');
const feedbackRoutes = require('./routes/feedbackroutes');
const adminRoutes = require('./routes/adminRoutes');
const messageRoute = require('./routes/messageRoute');
const notificationRoutes = require('./routes/notificationRoutes');
const { notifyAlumni } = require('./controllers/notificationController');

const app = express();
const server = createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

const io = new Server(server, {
  cors: { origin: FRONTEND_URL, credentials: true }
});

// API Routes
app.use('/api', authRoutes);
app.use('/api', passwordRoutes);
app.use('/api/events', eventRoutes);
app.use('/api', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', searchRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', adminRoutes);
app.use('/api', messageRoute);
app.use('/api', notificationRoutes);

console.log("✅ Backend is starting...");

const users = {};

io.on("connection", (socket) => {
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`🟢 User ${userId} registered (socket ID: ${socket.id})`);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    if (!senderId || !receiverId || !message.trim()) return;

    try {
      const newMessage = await Message.create({ senderId, receiverId, message });

      const receiverSocketId = users[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMessage);
      }

      io.to(socket.id).emit("receiveMessage", newMessage); // send back to sender too
    } catch (error) {
      console.error("❌ Error storing message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

// Sync DB and start server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await deleteExpiredJobs();
    await deleteOldMessages();

    cron.schedule("0 0 * * *", async () => {
      console.log("⏳ Running scheduled cleanup...");
      await deleteExpiredJobs();
      await deleteOldMessages();
      await notifyAlumni();
    });
  });
}).catch((err) => {
  console.error('❌ Unable to sync database:', err);
});
