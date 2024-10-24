import nodemailer from "nodemailer";

const email = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASSWORD;
const toEmail = 'mishalmsldc@gmail.com';

export const feedbackTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: pass
    }
});

export const mailOptions = {
    from: email,
    to: toEmail
};
