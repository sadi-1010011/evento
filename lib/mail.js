import nodemailer from "nodemailer";

const email = process.env.GMAIL_USER;
const toEmail = 'mishalmsldc@gmail.com';

export const feedbackTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER || email,
        pass: process.env.GMAIL_PASSWORD || "sysa vuvn hxkt irif"
    }
});

export const mailOptions = {
    from: email,
    to: toEmail
};
