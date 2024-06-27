const Group = require("../models/Group");
const Message = require("../models/Message");

// Create a new group
exports.createGroup = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId;

  try {
    const group = new Group({
      name,
      description,
      admin: userId,
      members: [userId],
    });

    await group.save();

    res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    await Group.findByIdAndDelete(groupId);

    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Search groups
exports.searchGroups = async (req, res) => {
  const { query } = req.query;

  try {
    const groups = await Group.find({
      name: { $regex: query, $options: "i" },
    });

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add members to a group
exports.addMembers = async (req, res) => {
  const { userIds } = req.body;
  const groupId = req.params.groupId;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    group.members.push(...userIds);
    await group.save();

    res.json({ message: "Members added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Send a message in a group
exports.sendMessage = async (req, res) => {
  const { content } = req.body;
  const groupId = req.params.groupId;
  const userId = req.user.userId;

  try {
    const message = new Message({
      content,
      sender: userId,
      group: groupId,
    });

    await message.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Like a message
exports.likeMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const userId = req.user.userId;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.likes.includes(userId)) {
      return res.status(400).json({ message: "Message already liked" });
    }

    message.likes.push(userId);
    await message.save();

    res.json({ message: "Message liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
