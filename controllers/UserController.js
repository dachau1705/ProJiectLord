const User = require("../models/Users");
const UserInfo = require("../models/UserInfor");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Tạo một user mới
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save().then(user => {
            const userInfo = new UserInfo({
                userId: user._id,
                firstName: 'Tên',
                lastName: 'Họ',
                phoneNumber: '1234567890',
                address: {
                    street: 'Đường',
                    city: 'Tỉnh/Thành Phố',
                    state: 'Phường/Huyện/Thị Trấn',
                    postalCode: 'Mã bưu chính',
                    country: 'Quốc gia'
                }
            });
            userInfo.save().then(() => {
                console.log('User and UserInfo saved successfully.');
            })
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// Lấy danh sách tất cả người dùng
const getUsers = async (req, res) => {
    try {
        User.find()
            .sort({ createdAt: -1 })
            .populate('userInfo')
            .exec()
            .then(response => {
                res.json({
                    data: response,
                    status: true
                })
            })
            .catch(error => {
                res.json({
                    message: "An error Occured!",
                    status: false
                })
            })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error, status: false });
    }
};

const register = (req, res, next) => {
    const { username, email, password } = req.body;
    User.findOne({ $or: [{ email: username }, { username: username }] })
        .then(user => {
            if (user) {
                res.json({
                    message: "Username or Email existed!",
                    status: false
                })
            } else {
                bcryptjs.hash(password, 10, function (err, hashedPass) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    let user = new User({
                        username: username,
                        email: email,
                        password: hashedPass
                    })
                    user.save().then(user => {
                        res.json({
                            message: "Register Successfully!",
                            status: true
                        })
                    }).catch(error => {
                        res.json({
                            message: "An error Occured!",
                            status: false
                        })
                    })
                })
            }
        })

}

const login = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ $or: [{ email: username }, { username: username }] })
        .then(user => {
            if (user) {
                bcryptjs.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ username: user.username }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            message: "Login Successfully!",
                            status: true,
                            token: token
                        })
                    } else {
                        res.json({
                            message: "Password does not matched!",
                            status: false
                        })
                    }
                })
            } else {
                res.json({
                    message: "No user found!",
                    status: false
                })
            }
        })
}
const getDetailUser = (req, res, next) => {
    try {
        const userId = req.body._id
        User.findById(userId)
            .populate('userInfo')
            .exec()
            .then(response => {
                res.json({
                    data: response,
                    status: true
                })
            })
            .catch(error => {
                res.json({
                    message: "An error Occured!",
                    status: false
                })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching users', error, status: false });
    }
};
module.exports = {
    createUser,
    getUsers,
    register,
    login,
    getDetailUser
};
