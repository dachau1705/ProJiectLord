const GroupChat = require("../models/GroupChat");
const UserInfo = require("../models/UserInfor")
const User = require("../models/Users")

const addGroupChatRp = async function (list_user) {
    console.log(list_user);

    let members = []
    for (const lu of list_user) {
        const user = await User.findById(lu)
        const user_info = await UserInfo.findOne({ userId: lu })
        members.push({ userId: user._id, name: `${user_info.firstName} ${user_info.lastName}` })
    }

    const newGroupChat = new GroupChat({
        groupName: null,
        members: members,
        status: 'active',
        type: 'single',
        avatarGroup: null,
        createdBy: list_user[0]
    })

    newGroupChat.save()
    
}

module.exports = {
    addGroupChatRp
}