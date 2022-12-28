import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active',
        enum: ['inactive','active', 'locked']
    },
    password_attempts : {
        type: String,
        default: 0
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
