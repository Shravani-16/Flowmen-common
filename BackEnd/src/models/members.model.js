const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
        },
        role: {
            type: String,
            enum: ["Manager", "Supervisor", "Operator"],
            required: true,
        },
        workingUnder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
