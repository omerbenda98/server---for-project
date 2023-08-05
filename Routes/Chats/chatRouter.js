const express = require('express');
const Chat = require('./chatModel');
const router = express.Router();

// POST route to send a message
router.post('/message', async (req, res) => {
  const { senderID, recepientID, content,roomID,time,author } = req.body;
  console.log(req.body);
  console.log(senderID)
  console.log(recepientID)
  console.log(content)
  console.log(roomID)
  console.log(time)
  console.log(author)
  try {
    const message = new Chat({ senderID, recepientID, content,roomID,time,author });
    await message.save();
    
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// GET route to retrieve chat history between two users
router.get('/history', async (req, res) => {
  const { userID, otherUserID } = req.query;
  
  try {
    const messages = await Chat.find({
      $or: [
        { senderID: userID, recipientID: otherUserID },
        { senderID: otherUserID, recipientID: userID }
      ]
    }).sort('time');
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving chat history' });
  }
});
router.get('/activeChats', async (req, res) => {
  const userID = req.query.userID; // Assuming userID is passed as a query parameter

  try {
    // Fetch all the chats where the connected user is a participant
    const chats = await Chat.find({
      $or: [{ senderID: userID }, { recepientID: userID }]
    }).sort({ 'time': -1 }); // Sort by time in descending order to get the last messages

    // Transform the chats into the desired format
    const activeChats = [];
    const seenChats = new Set();
    chats.forEach(chat => {
      const otherUser = chat.senderID === userID ? chat.recepientID : chat.senderID;
      if (!seenChats.has(otherUser)) {
        activeChats.push({
          chatID: chat.roomID,
          otherUserID: otherUser,
          otherUserName: "Example Name", // You'll have to fetch this from your User model
          lastMessage: {
            content: chat.content,
            time: chat.time
          }
        });
        seenChats.add(otherUser);
      }
    });

    res.json(activeChats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
