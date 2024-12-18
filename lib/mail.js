import nodemailer from "nodemailer";

const email = process.env.GMAIL_USER;
const toEmail = 'theplutoenterprises@gmail.com';


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
