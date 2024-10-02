const GroupChat = require("../models/GroupChat")
const UserInfo = require("../models/UserInfor")
const User = require("../models/Users")
const mongoose = require('mongoose');

const addGroupChat = async (req, res, next) => {
    const info = req.info
    const { list_user } = req.body
    let members = []
    const create_user = await User.findById(info.userId)
    const userInfo = await UserInfo.findOne({ userId: info.userId })
    members.push({ userId: create_user._id, name: `${userInfo.firstName} ${userInfo.lastName}` })

    for (const lu of list_user) {
        const user = await User.findById(lu.userId)
        const user_info = await UserInfo.findOne({ userId: lu.userId })
        members.push({ userId: user._id, name: `${user_info.firstName} ${user_info.lastName}` })
    }

    const newGroupChat = new GroupChat({
        groupName: null,
        members: members,
        status: 'active',
        type: list_user.length === 1 ? 'single' : 'multiple',
        avatarGroup: null,
        createdBy: create_user._id
    })

    newGroupChat.save()
        .then(group => {
            res.json({
                data: group,
                status: true
            });
        })
        .catch(error => {
            res.json({
                error: error,
                status: false
            });
        });
}

const getListGroupChatByUserId = async (req, res, next) => {
    const info = req.info
    const userId = info.userId
    GroupChat.find({ 'members.userId': new mongoose.Types.ObjectId(userId) })
        .then(response => {
            res.json({
                data: response,
                status: true
            });
        })
        .catch(error => {
            res.json({
                error: error,
                status: false,
                message: "An error Occured!"
            });
        });
}

module.exports = {
    addGroupChat, getListGroupChatByUserId
}