import nodemailer from 'nodemailer';


const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // DEV ONLY
        },
    })
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    })

}

export default sendEmail;