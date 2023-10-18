// Function to get the sender's name based on the logged-in user and an array of users
export const getSender = (loggedUser, users) => {
    // Check if the user at index 0 in the 'users' array has the same ID as the logged-in user
    // If they do, return the name of the user at index 1; otherwise, return the name of the user at index 0
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

// Function to get the sender's name or object based on the logged-in user and an array of users
export const getSenderFull = (loggedUser, users) => {
    // Check if the user at index 0 in the 'users' array has the same ID as the logged-in user
    // If they do, return the user object at index 1; otherwise, return the name of the user at index 0
    return users[0]._id === loggedUser._id ? users[1] : users[0].name;
};

// Function to determine if a message (m) at a specific index (i) has the same sender as the next message in the array
// 'messages' while also not being from the specified 'userId'
export const isSameSender = (messages, m, i, userId) => {
    return (
        // Check if 'i' is less than the length of 'messages' minus 1
        // (ensures there is a next message to compare with)
        i < messages.length - 1 &&
        // Check if the sender of the next message (messages[i+1]) is not the same as the sender of the current message (m)
        // or if the sender of the next message is undefined
        // and if the sender of the current message (m) is not the same as the specified 'userId'
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

// Function to check if a message is the last message in a chat conversation
// and if it was not sent by the specified user (userId)
export const isLastMessage = (messages, i, userId) => {
    return (
        // Check if 'i' is equal to the index of the last message in the 'messages' array
        i == messages.length - 1 &&
        // Check if the sender of the last message is not the same as the specified 'userId'
        messages[messages.length - 1].sender._id !== userId &&
        // Check if the sender of the last message is defined (not undefined)
        messages[messages.length - 1].sender._id
    );
}
