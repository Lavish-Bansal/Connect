const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        event_id: {
            type: String,
            requird: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        reg_number: {
            type: String,
            trim: true,
            required: true,
        },
        image:{
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = {
    Attendance,
    attendanceSchema,
};