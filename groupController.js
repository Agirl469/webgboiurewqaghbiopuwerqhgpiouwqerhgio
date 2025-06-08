// ==== server/controllers/groupController.js ====
import Group from '../models/Group.js';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const group = new Group({ name, members: [userId] });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create group', error: err.message });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: 'Failed to join group', error: err.message });
  }
};

export const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;
    const groups = await Group.find({ members: userId });
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get groups', error: err.message });
  }
};
