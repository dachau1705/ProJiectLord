const User = require("../models/Users");
const UserInfo = require("../models/UserInfor");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Tạo một user mới
const createUser = async (req, res, next) => {
    const password = "123456";
    const infos = req.body;
    const username = infos.email;
    const email = infos.email;

    let newData = {
        firstName: infos.firstName,
        phoneNumber: infos.phoneNumber,
        lastName: infos.lastName,
        desc: infos.desc,
        dob: infos?.dob ? new Date(infos.dob) : undefined,
        address: {
            city: infos.city,
            country: infos.country,
            postalCode: infos.postalCode,
            state: infos.state,
            street: infos.street,
        }
    };

    if (req.file) {
        newData.avatar = req.file.firebaseUrl;
    }

    // Loại bỏ các trường undefined trong newData và address
    newData = Object.keys(newData).reduce((acc, key) => {
        if (newData[key] !== undefined) {
            acc[key] = newData[key];
        }
        return acc;
    }, {});

    newData.address = Object.keys(newData.address).reduce((acc, key) => {
        if (newData.address[key] !== undefined) {
            acc[key] = newData.address[key];
        }
        return acc;
    }, {});

    try {
        const existingUser = await User.findOne({ $or: [{ email: username }, { username: username }] });

        if (existingUser) {
            return res.json({
                message: "Username or Email existed!",
                status: false
            });
        }

        const hashedPass = await bcryptjs.hash(password, 10);

        // Tạo mới user
        const user = new User({
            username: username,
            email: email,
            role: infos.role,
            password: hashedPass,
            isVerified: false
        });

        const savedUser = await user.save();

        // Tạo mới userInfo
        const userInfo = new UserInfo({
            ...newData,
            userId: savedUser._id.toString(),
        });

        await userInfo.save();

        res.json({ message: 'Create new user successfully!', status: true });

    } catch (error) {
        console.log(error);
        res.json({
            message: "An error occurred!",
            status: false,
            error: error
        });
    }
};

// Lấy danh sách tất cả người dùng
const getUsers = async (req, res) => {
    try {
        User.find()
            .sort({ createdAt: -1 })
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
                            message: "User registration failed!",
                            status: false,
                            error: err
                        })
                    } else {
                        let user = new User({
                            username: username,
                            email: email,
                            password: hashedPass,
                            isVerified: false
                        })
                        // Tạo một token xác thực duy nhất
                        const token = crypto.randomBytes(32).toString('hex');
                        user.emailVerificationToken = token;
                        user.save().then(user => {
                            // Gửi email xác thực
                            const transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'hausubasa1705@gmail.com',
                                    pass: 'uuin bpxk sjgj zhxd'
                                }
                            });

                            const mailOptions = {
                                to: user.email,
                                from: 'hausubasa1705@gmail.com',
                                subject: 'Email Verification',
                                text: `Please verify your email by clicking the link: \n${req.headers.origin}/users/verify-email?token=${token}`
                            };

                            transporter.sendMail(mailOptions, (err) => {
                                if (err) {
                                    return res.status(500).json({ message: 'Error sending email', err, status: false });
                                } else {
                                    const userInfo = new UserInfo({
                                        userId: user._id.toString(),
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
                                    res.json({ message: 'Register Successfully! Verification email sent!', status: true });
                                }
                            });
                        }).catch(error => {
                            console.log(error);

                            res.json({
                                message: "An error Occured!",
                                status: false
                            })
                        })
                    }
                })
            }
        })

}

const verifyEmail = async (req, res) => {
    try {
        const { token, _id } = req.body;

        // Tìm người dùng dựa trên token xác thực
        const user = await User.findOne({ emailVerificationToken: token, _id: _id });

        if (!user) {
            return res.status(200).json({ message: 'Token is invalid or expired!', status: false });
        } else {
            // Đánh dấu người dùng đã được xác thực
            user.isVerified = true;
            user.emailVerificationToken = undefined; // Xóa token
            await user.save();
            res.json({ message: 'Email verification successful!', status: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error while verifying email!', error, status: false });
    }
};

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
                            token: token,
                            user_id: user._id,
                            detail: user
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

const getDetailUser = async (req, res, next) => {
    try {
        const userId = req.body._id;
        // Perform both queries concurrently
        const [userInfo, user] = await Promise.all([
            UserInfo.findOne({ userId: userId }).exec(),
            User.findOne({ _id: userId }).exec()
        ]);

        // Check if user and userInfo are found
        if (!user) {
            return res.status(404).json({
                message: "User or UserInfo not found!",
                status: false
            });
        }

        // Send combined response
        res.json({
            data: { user: user || {}, userInfo: userInfo || {} },
            status: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching users', error, status: false });
    }
};

const updateUser = async (req, res, next) => {
    const infos = req.body
    let updateData = {
        userId: infos._id,
        firstName: infos.firstName,
        phoneNumber: infos.phoneNumber,
        lastName: infos.lastName,
        // role: infos.role,
        desc: infos.desc,
        dob: infos?.dob ? new Date(infos.dob) : undefined,
        address: {
            city: infos.city,
            country: infos.country,
            postalCode: infos.postalCode,
            state: infos.state,
            street: infos.street,
        }
    }
    if (req.file) {
        updateData.avatar = req.file.firebaseUrl
    }
    // Loại bỏ các trường có giá trị là `undefined` hoặc `null`
    updateData = Object.keys(updateData).reduce((acc, key) => {
        if (updateData[key] !== undefined) {
            acc[key] = updateData[key];
        }
        return acc;
    }, {});

    // Cũng cần loại bỏ các trường `undefined` bên trong đối tượng address nếu cần
    updateData.address = Object.keys(updateData.address).reduce((acc, key) => {
        if (updateData.address[key] !== undefined) {
            acc[key] = updateData.address[key];
        }
        return acc;
    }, {});
    console.log(updateData);

    try {
        const [userInfoUpdate, userUpdate] = await Promise.all([
            UserInfo.findOneAndUpdate({ userId: infos._id }, { $set: updateData }, { new: true, upsert: true }),
            User.findByIdAndUpdate(infos._id, { $set: { role: infos.role } }, { new: true })
        ]);

        if (userInfoUpdate && userUpdate) {
            res.json({
                message: "Updated Successfully!",
                status: true,
            });
        } else {
            res.json({
                message: "User not found!",
                status: false,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "An error occurred!",
            status: false,
        });
    }
}

const forgotPassword = async (req, res, next) => {
    const { email } = req.body
    if (email) {
        const account = await User.findOne({ email: email })
        if (account._id) {
            bcryptjs.hash('123456', 10, function (err, hashedPass) {
                if (err) {
                    res.json({
                        message: "Reset password failed!",
                        status: false,
                        error: err
                    })
                } else {
                    User.findByIdAndUpdate(account._id, {
                        password: hashedPass,
                    }).then(() => {
                        res.json({
                            message: "Change password successfully!",
                            status: true
                        })
                    })
                }
            })
        } else {
            res.json({
                message: "No user found!",
                status: false
            })
        }
    } else {
        res.json({
            message: "You have not entered an email!",
            status: false
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    register,
    login,
    getDetailUser,
    verifyEmail,
    updateUser,
    forgotPassword
};
