
  // const express = require('express');
  // const sequelize = require('./config/database');
  // require('dotenv').config();
  // const cors = require('cors');
  // const cron = require("node-cron"); // ✅ Import node-cron
  // const deleteExpiredJobs = require('./utils/deleteExpiredJobs'); // ✅ Import job deletion function

  // // Import routes
  // const authRoutes = require('./routes/authroutes');
  // const passwordRoutes = require('./routes/passwordRoutes');
  // const eventRoutes = require('./routes/eventRoutes'); 
  // const profileRoutes = require('./routes/profileRoutes');
  // const jobRoutes = require('./routes/jobroutes'); // ✅ Job routes
  // const searchRoutes = require('./routes/searchRoutes');
  // const feedbackRoutes = require('./routes/feedbackroutes');
  // const adminRoutes = require('./routes/adminRoutes');

  // const app = express();
  
  // // Middleware
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  // app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
  
  
  // // Routes
  // app.use('/api', authRoutes);
  // app.use('/api', passwordRoutes);
  // app.use('/api/events', eventRoutes); 
  // app.use('/api', profileRoutes);
  // app.use('/api/jobs', jobRoutes); // ✅ Add job routes
  // app.use('/api' ,searchRoutes);
  // app.use('/api' ,feedbackRoutes);
  // app.use('/api' ,adminRoutes);
  
  // console.log("Backend is running...");
  
  // // Sync database and start server
  // sequelize
  //   .sync({ force: false }) 
  //   .then(() => {
  //     app.listen(5000, () => {
  //       console.log(`🚀 Server is running on port 5000`);
  
  //       // ✅ Run deletion **once on startup**
  //       deleteExpiredJobs();
  
  //       // ✅ Schedule deletion **every day at midnight**
  //       cron.schedule("0 0 * * *", async () => {
  //         console.log("⏳ Running scheduled job deletion...");
  //         await deleteExpiredJobs();
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     console.error('❌ Unable to sync database:', err);
  //   });


  const express = require('express');
  const { createServer } = require("http"); // Create HTTP server for WebSockets
  const { Server } = require("socket.io"); // Import Socket.io
  const sequelize = require('./config/database');
  require('dotenv').config();
  const cors = require('cors');
  const cron = require("node-cron"); 
  const deleteExpiredJobs = require('./utils/deleteExpiredJobs');
  const deleteOldMessages = require('./utils/deleteOldMessages'); 
  const Message = require('./models/Message'); // Import Message model
  
  // Import routes
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
  const server = createServer(app); // Create HTTP server
  const io = new Server(server, {
      cors: { origin: 'http://localhost:3000', credentials: true }
  });
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
  
  // Routes
  app.use('/api', authRoutes);
  app.use('/api', passwordRoutes);
  app.use('/api/events', eventRoutes); 
  app.use('/api', profileRoutes);
  app.use('/api/jobs', jobRoutes);
  app.use('/api', searchRoutes);
  app.use('/api', feedbackRoutes);
  app.use('/api', adminRoutes);
  app.use('/api', messageRoute);
  app.use('/api', notificationRoutes); // Add notification routes

  console.log("Backend is running...");
  
  // Store connected users
  const users = {};
  
  // ✅ Socket.io connection
  io.on("connection", (socket) => {
      
  
      // Listen for user identification
      socket.on("register", (userId) => {
          users[userId] = socket.id; // Store user socket ID
          console.log(`User ${userId} registered with socket ID: ${socket.id}`);
      });
  
      // Listen for new messages
      socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
          if (!senderId || !receiverId || !message.trim()) return;
  
          try {
              // Save message to database
              const newMessage = await Message.create({
                  senderId,
                  receiverId,
                  message
              });
  
              // Send message to the receiver if online
              const receiverSocketId = users[receiverId];
              if (receiverSocketId) {
                  io.to(receiverSocketId).emit("receiveMessage", newMessage);
              }
  
              // Emit message back to sender for confirmation
              io.to(socket.id).emit("messageSent", newMessage);
          } catch (error) {
              console.error("Error storing message:", error);
          }
      });
  
      // Handle disconnect
      socket.on("disconnect", () => {
          console.log("🔴 User disconnected:", socket.id);
          // Remove disconnected user
          Object.keys(users).forEach((key) => {
              if (users[key] === socket.id) {
                  delete users[key];
              }
          });
      });
  });
  
  // Sync database and start server
  sequelize
      .sync({ force: false })
      .then(() => {
          server.listen(5000, async () => {
              console.log(`🚀 Server is running on port 5000`);
  
              // ✅ Run cleanup on startup
              await deleteExpiredJobs();
              await deleteOldMessages();
  
              // ✅ Schedule cleanup every day at midnight
              cron.schedule("0 0 * * *", async () => {
                  console.log("⏳ Running scheduled cleanup tasks...");
                  await deleteExpiredJobs();
                  await deleteOldMessages();
                  await notifyAlumni();
              });
          });
      })
      .catch((err) => {
          console.error('❌ Unable to sync database:', err);
      });  
  