export const getSender = (loggedUser, users) => {
    // if the user of 0 id is equal to the logged in user's id, then return user of 1 id. Otherwise, return user 0
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderFull = (loggedUser, users) => {
    
    return users[0]._id === loggedUser._id ? users[1] : users[0].name;
};