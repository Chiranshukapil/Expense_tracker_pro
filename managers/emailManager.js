import nodemailer from "nodemailer"

const emailManager = async (to, text, html, subject)=>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "8b26434b3c36a9",
            pass: "19d05aa5d3f8d6"
        }
    });

    await transport.sendMail({
        to: to,
        from: "info@expensetracker.com",
        text: text,
        html: html,
        subject: subject
    })
}

export default emailManager;