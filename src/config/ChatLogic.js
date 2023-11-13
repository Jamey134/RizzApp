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
        i === messages.length - 1 &&
        // Check if the sender of the last message is not the same as the specified 'userId'
        messages[messages.length - 1].sender._id !== userId &&
        // Check if the sender of the last message is defined (not undefined)
        messages[messages.length - 1].sender._id
    );
};

// Function to determine the margin value for a message based on its position in the chat
export const isSameSenderMargin = (messages, m, i, userId) => {
    // Check if the message is not the last in the chat and the next message is not from the same user or if the current message is not from the same user
    if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== userId) ||
        messages[i].sender._id !== userId
    ) {
        // Return a margin value of 33 (I can adjust this value)
        return 33;
    }
    // Check if the message is not the last in the chat, the next message is from a different sender, and the current message is not from the specified user
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender_id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    ) {
        // Return a margin value of 0
        return 0;
    }
    // If none of the above conditions are met, return "auto" as the margin value
    else {
        return "auto";
    }
};

// This function checks if the sender of the current message 'm' is the same as the sender of the previous message in the 'messages' array.
export const isSameUser = (messages, m, i) => {
    // Here, 1 > 0 is a constant expression that's always true, so it doesn't affect the logic.
    // We're mainly interested in the next part of the condition.

    // Check if 'i' is greater than 0 (ensuring there is a previous message in the array) and
    // if the sender of the previous message (messages[i - 1].sender._id) is the same as the sender of the current message (m.sender._id).
    // If both conditions are met, the function returns true; otherwise, it returns false.
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
