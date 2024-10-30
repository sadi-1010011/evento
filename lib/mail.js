import nodemailer from "nodemailer";

const email = process.env.GMAIL_USER;
const toEmail = 'mishalmsldc@gmail.com';

console.log("EMAIL_USER:", email);

export const feedbackTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export const mailOptions = {
    from: email,
    to: toEmail
};
