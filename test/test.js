const UserInfo = require("../models/UserInfor");

const getAllUserInfos = async () => {
    try {
        // const userInfos = await UserInfo.find().populate('userId');
        const userInfos = await UserInfo.find()
        console.log(userInfos);

        return userInfos;
    } catch (error) {
        throw new Error(`Error retrieving all user infos: ${error.message}`);
    }
};
const test = async () => {
    try {
        const userInfos = await UserInfo.find();
        console.log('UserInfos:', userInfos);

        return userInfos;
    } catch (error) {
        console.error('Detailed error:', error);
        throw new Error(`Error retrieving all user infos: ${error.message}`);
    }
}



test();
