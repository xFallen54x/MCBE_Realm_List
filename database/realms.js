const mongoose = require("mongoose");

const realmSchema = new mongoose.Schema({
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Votes",
        },
    ],
    realm_tags: [
        {
            type: mongoose.Schema.Types.Array,
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    realm_name: {
        type: String,
        required: true,
    },
   realm_code: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    realm_bannner: {
        type: String,
        default: "files/image/04a91922Minecraft-Banner.png",
    },
});

module.exports = mongoose.model("Realms", realmSchema);