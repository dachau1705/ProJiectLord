const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routers');
const cors = require('cors');
const http = require('http');

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/testdb')
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch((err) => console.error('Kết nối MongoDB thất bại', err));

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('Kết nối cơ sở dữ liệu thành công!');
});

const app = express();
const server = http.createServer(app);  // Tạo HTTP server

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route cơ bản
app.get("/", (req, res) => {
    res.json("Đố em biết anh đang nghĩ gì!");
});

// Đặt các route
router(app);

// Thiết lập Socket.IO
const io = require('./middleware/socket')(server);  // Import file socket.js và truyền vào server

// Khởi động server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
    console.log(`Domain: http://localhost:${PORT}`);
});
