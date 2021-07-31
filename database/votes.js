const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Votes", voteSchema);