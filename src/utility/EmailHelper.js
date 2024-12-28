const nodemailer = require('nodemailer');
const config = require('../config/config');


const EmailSend= async (EmailTo,EmailText,EmailSubject)=>{
let transport =nodemailer.createTransport({
    service: 'gmail',
    host:config.EMAIL_HOST,
    port:25,
    secure:config.EMAIL_SECURITY,
    auth:{user:config.EMAIL_USER,
        pass:config.EMAIL_PASSWORD,},
    tls:{rejectUnauthorized:config.EMAIL_UN_AUTH}
})
    let mailOption={
    from:'Mern Ecommerce solution <learningcell555@gmail.com',
        to:EmailTo,
        subject:EmailSubject,
        // text:EmailText,
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Template</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .header {
                  background-color: #4CAF50;
                  padding: 20px;
                  text-align: center;
                  color: #ffffff;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                }
                .header h1 {
                  margin: 0;
                }
                .content {
                  padding: 20px;
                  text-align: left;
                  color: #333333;
                }
                .content h2 {
                  color: #4CAF50;
                }
                .content p {
                  line-height: 1.6;
                }
                .button {
                  display: block;
                  width: 100%;
                  text-align: center;
                  margin: 20px 0;
                }
                .button a {
                  background-color: #4CAF50;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                }
                .footer {
                  background-color: #f4f4f4;
                  padding: 10px;
                  text-align: center;
                  font-size: 12px;
                  color: #777777;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
                }
              </style>
            </head>
            <body>

              <div class="container">
                <div class="header">
                  <h1>Mern Ecommerce solution 🛍️ </h1>
                </div>

                <div class="content">
                  <h2>Hi there, ${EmailText}</h2>
                  <p>Thank you for signing up for our service. We're excited to have you on board!</p>
                  <p>If you have any questions, feel free to reach out to our support team.</p>

                  <div class="button">
                    <a href="http://localhost:5173/">Get Started</a>
                  </div>
                </div>

                <div class="footer">
                  <p>&copy; 2024 Your Company. All rights reserved.</p>
                  <p>1234 Main St, Anytown, USA</p>
                </div>
              </div>

            </body>
            </html>
      `, // html body
    }
return await transport.sendMail(mailOption)








}
module.exports=EmailSend