import nodemailer from 'nodemailer';

export const sendPassswordResetEmail = (token, email, name) => {
    const html = `
        <html>
            <body>
                <h3>
                Dear ${name}
                </h3>
                <p>Please click on the link below to reset your password.</p>
                <a href="http://localhost:3000/password-reset/${token}">Click here!</a>
            </body>
        </html>`;
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sworldorigins@gmail.com',
                pass: 'uvri jtyd lijc osvm',
            },
        });
    
        const mailOptions = {
            from: 'sworldorigins@gmail.com',
            to: email,
            subject: 'Telehealth: Reset your password request.',
            html: html,
        };
    
        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
            } else {
                console.log(`Email sent to ${email}`);
                console.log(info.response);
            }
        });
}