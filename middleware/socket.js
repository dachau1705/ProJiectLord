const { Server } = require('socket.io');
const Message = require('../models/Message');

module.exports = function (server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Có khách hàng mới kết nối:', socket.id);

        // Lắng nghe sự kiện 'join_room' từ client
        socket.on('join_room', ({ user1_id, user2_id }) => {
            const roomId = [user1_id, user2_id].sort().join('_');
            socket.join(roomId);
            console.log(`Người dùng ${socket.id} đã tham gia phòng: ${roomId}`);
        });

        // Lắng nghe sự kiện 'message' từ client
        socket.on('message', async ({ roomId, data }) => {
            try {
                const newMessage = new Message(data);
                await newMessage.save();
                // Gửi tin nhắn cho tất cả người dùng trong phòng
                io.to(roomId).emit('message', data);
            } catch (err) {
                console.error('Lỗi khi lưu tin nhắn:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client đã ngắt kết nối:', socket.id);
        });
    });

    return io;
};
