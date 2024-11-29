const express = require("express");
const router = express.Router();
const Message = require("../modal/message");
const protect = require("../utils/protect");

// Send Message
// router.post("/", protect, async (req, res) => {
//   const { content } = req.body;

//   if (!content) {
//     return res.status(400).json({ message: "Message content is required" });
//   }

//   try {
//     const message = await Message.create({
//       sender: req.user.id,
//       content,
//     });

//     res.status(201).json({ success: true, message });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get Messages
// router.get("/", protect, async (req, res) => {
//   try {
//     const messages = await Message.find().populate("sender", "username"); // Populate the sender's username
//     res.status(200).json({ success: true, messages });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// Send a new message
router.post("/", protect, async (req, res) => {
    const { conversationId, sender, content } = req.body;

    // Validate input
    if (!conversationId || !sender || !content) {
        return res.status(400).json({ message: "conversationId, sender, and content are required." });
    }

    const newMessage = new Message({
        conversationId,
        sender,
        content,
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all messages
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find().populate("sender", "username"); // Replace "username" with the field you'd like to populate
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get messages by sender
router.get("/sender/:userId", async (req, res) => {
    try {
        const messages = await Message.find({ sender: req.params.userId });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get messages by conversationId
router.get("/conversation/:conversationId", protect, async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId })
            .populate("sender", "username");
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


