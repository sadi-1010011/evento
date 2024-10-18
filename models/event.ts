import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
    // values in the event model
    title: string;
    catogory: string;
    hostname: string;
    location: string;
    description: string;
    ticketprice: number;
    paid: boolean;
    ticketlink: string;
    date: string;
    time: string;
    thumbnail: string;
    images: Array<string>;
    contactnumber: string;
    additionalinfo: string;
}

const eventSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    catogory: {
        type: String,
        required: true,
    },
    hostname: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ticketprice: {
        type: Number,
        required: false,
    },
    paid: {
        type: String,
        required: true,
    },
    ticketlink: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    images: {
        type: Array,
        required: false,
    },
    contactnumber: {
        type: String,
        required: false,
    },
    additionalinfo: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema)

export default Event;