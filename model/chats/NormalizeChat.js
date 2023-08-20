const normalizeChat = (chat, senderID, recepientID) => {
  return {
    ...chat,
    roomID: chat.roomID || `${senderID}-${recepientID}`, // You can modify the format as per your application logic
    senderID: senderID,
    recepientID: recepientID,
    content: chat.content.trim(), // Trimming spaces can be useful for chat content
    author: chat.author.trim(),
    // Other fields like `time` and `timestamp` have default values in the schema and hence need not be addressed in the normalization.
  };
};

module.exports = normalizeChat;
