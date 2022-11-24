import {v4 as uuidv4} from "uuid";

const createUser = (userList, userName) => {
    const isUniqueName = !userList.some(user => user.userName === userName);

    if (!isUniqueName) {
        throw new Error("Username already exists, please try again");
    }

    const userId = uuidv4();
    userList.push({userName, userId});
}

export {createUser}