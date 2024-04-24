const mongoose = require("mongoose");
const { eventSchema } = require("./event");

const userSchema = new mongoose.Schema(
    {
        user_token: {
            type: String,
            required: true,
            unique: true,
        },
        reg_number: {
            type: String,
            trim: true,
            required: true,
        },
        username: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        // profileImage: {
        //     type: String,
        //     // You can store the image URL or path to the image file
        // },
        registeredEvents: [eventSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
