import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'new'
    },
    due: {
        type: Date
    }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
