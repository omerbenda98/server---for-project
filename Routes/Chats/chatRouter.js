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
  const { roomID } = req.query;
  console.log(roomID);
  try {
    const messages = await Chat.find({ roomID }).sort('time');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving chat history' });
  }
});


router.get('/activeChats', async (req, res) => {
  const userID = req.query.userID;

  try {
    // Fetch all the chats where the connected user is a participant
    const chats = await Chat.find({
      $or: [{ senderID: userID }, { recepientID: userID }]
    }).sort({ 'timestamp': -1 }); 

    // Group chats by the other user and keep only the most recent chat
    const activeChats = {};
    for (const chat of chats) {
      const otherUser = String(chat.senderID) === String(userID) ? chat.recepientID : chat.senderID;

      if (!(String(otherUser) in activeChats)) {
        // TODO: Fetch user details from User model if necessary
        activeChats[String(otherUser)] = {
          otherUserID: otherUser,
          otherUserName: chat.author, // You'll have to fetch this from your User model
          lastMessage: {
            content: chat.content,
            time: chat.time
          }
        };
      }
    }

    res.json(Object.values(activeChats));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
module.exports = router;
