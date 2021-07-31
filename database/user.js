const   mongoose  = require("mongoose");

 const userSchema = new mongoose.Schema({
    realms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Realms",
    }],
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Votes",
        },
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
