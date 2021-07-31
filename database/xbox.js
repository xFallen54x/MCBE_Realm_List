const mongoose = require("mongoose");

const xboxSchema = new mongoose.Schema({
    discorduserid: {
        type: Number
    },
    expriredate: {
        type: Number
    },
    refreshtoken: {
        type: String
    },
    XSTS: {
        type: String
    },
});

module.exports = mongoose.model("Xbox", xboxSchema);