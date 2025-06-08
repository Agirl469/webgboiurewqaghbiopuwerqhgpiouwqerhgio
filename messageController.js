// ==== server/controllers/messageController.js ====
import Message from '../models/Message.js';
import User from '../models/User.js';
import Group from '../models/Group.js';

export const sendMessage = async (req, res) => {
  try {
    const { groupId, sender, content } = req.body;
    const message = new Message({ groupId, sender, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ groupId }).sort({ timestamp: 1 }).populate('sender', 'username');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get messages', error: err.message });
  }
};