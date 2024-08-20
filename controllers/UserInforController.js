const UserInfo = require("../models/UserInfor");

const createUserInfo = async (data) => {
    try {
        const userInfo = new UserInfo(data);
        const savedUserInfo = await userInfo.save();
        return savedUserInfo;
    } catch (error) {
        throw new Error(`Error creating user info: ${error.message}`);
    }
};

const getUserInfoByUserId = async (userId) => {
    try {
        const userInfo = await UserInfo.findOne({ userId }).populate('userId');
        if (!userInfo) {
            throw new Error('User info not found');
        }
        return userInfo;
    } catch (error) {
        throw new Error(`Error retrieving user info: ${error.message}`);
    }
};

const getAllUserInfos = async () => {
    try {
        const userInfos = await UserInfo.find().populate('userId');
        return userInfos;
    } catch (error) {
        throw new Error(`Error retrieving all user infos: ${error.message}`);
    }
};

const updateUserInfo = async (userId, updateData) => {
    try {
        const updatedUserInfo = await UserInfo.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true }  // Trả về bản ghi đã cập nhật
        );
        if (!updatedUserInfo) {
            throw new Error('User info not found');
        }
        return updatedUserInfo;
    } catch (error) {
        throw new Error(`Error updating user info: ${error.message}`);
    }
};

const deleteUserInfo = async (userId) => {
    try {
        const deletedUserInfo = await UserInfo.findOneAndDelete({ userId });
        if (!deletedUserInfo) {
            throw new Error('User info not found');
        }
        return deletedUserInfo;
    } catch (error) {
        throw new Error(`Error deleting user info: ${error.message}`);
    }
};

