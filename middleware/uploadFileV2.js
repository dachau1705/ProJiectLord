const multer = require('multer');
const path = require('path');
const bucket = require('../configs/firebaseConfig');
const { v4: uuidv4 } = require('uuid');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn kích thước tệp là 5MB
    },
});

const uploadFileToFirebase = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Không có tệp nào được tải lên.' });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype,
            // Cấu hình quyền truy cập công khai cho tệp
            metadata: {
                firebaseStorageDownloadTokens: uuidv4(), // Tạo một UUID để truy cập tệp bằng cách sử dụng token nếu cần
            },
        },
        public: true, // Đặt quyền công khai cho tệp
    });

    blobStream.on('error', (err) => {
        console.error('Tải lên Firebase Storage thất bại:', err);
        return res.status(500).json({ message: 'Tải lên thất bại.' });
    });

    blobStream.on('finish', async () => {
        try {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            req.file.firebaseUrl = publicUrl;
            next(); // Chuyển sang middleware hoặc route handler tiếp theo
        } catch (error) {
            console.error('Lỗi khi lấy URL của tệp:', error);
            res.status(500).json({ message: 'Không thể lấy URL của tệp.' });
        }
    });

    blobStream.end(file.buffer);
};

module.exports = {
    upload,
    uploadFileToFirebase,
};
