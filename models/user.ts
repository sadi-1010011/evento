import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    // values in the event model
    email: string;
    username: string;
    password: string;
    favorites: [];
    preferences: [];
    isadmin: boolean;
}

const userSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: {
        type: Array,
        required: false,
    },
    preferences: {
        type: Array,
        required: false,
    },
    isadmin: {
        type: Boolean,
        required: false,
    },
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User;