const { Server } = require('socket.io');
const Message = require('../models/Message');
const { addGroupChatRp } = require('../repository/GroupChatRp');

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
        socket.on('join_room', async ({ room_id }) => {
            socket.join(room_id);
            console.log(`Người dùng ${socket.id} đã tham gia phòng: ${room_id}`);
        });

        // Lắng nghe sự kiện 'message' từ client
        socket.on('message', async ({ roomId, data }) => {
            try {
                const receiver = data.receiver_id
                let receiver_id = []
                for (const rc of receiver) {
                    receiver_id.push(rc.userId)
                }
                const newMessage = new Message({
                    sender_id: data.sender_id,
                    receiver_id: JSON.stringify(receiver_id),
                    text: data.text,
                    room_id: roomId,
                    timestamp: data.timestamp,
                    is_read: data.is_read
                });
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
