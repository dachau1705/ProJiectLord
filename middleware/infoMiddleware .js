const infoMiddleware = (req, res, next) => {
    const infoHeader = req.headers['info'];
    req.info = {};  // Khởi tạo object info rỗng trong request

    // Kiểm tra và parse infoHeader
    if (infoHeader) {
        try {
            req.info = JSON.parse(infoHeader);  // Gán info vào req.info
        } catch (error) {
            console.error('Error parsing info header:', error);
            return res.status(400).send('Invalid info format');
        }
    }

    // Tiếp tục đi đến controller
    next();
};

module.exports = infoMiddleware
