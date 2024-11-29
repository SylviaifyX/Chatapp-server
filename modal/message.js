const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Ensure this
        ref: "Conversation",
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
         required: true, 
         ref: "User" },
    content: {
        type: String,
        required: true, // Ensure this field is required
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", MessageSchema);
