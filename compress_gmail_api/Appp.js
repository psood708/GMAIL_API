import { createTransport } from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID='372777736006-e2e4q3fq1727h1mpebqmb2n7q0bik2tg.apps.googleusercontent.com';
const CLIENT_SECRET='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';
const CLIENT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04EaKVu-ds2xYCgYIARAAGAQSNwF-L9Ir0yFh7A0dXsjKyJS5kZ99JGV8VGwzHfKaQhKH-q74XE_J4LMr5_kkflePHt85gqr_02c';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, CLIENT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendmail = async (req, res)=>{
    try {
        const accessToken = await oauth2Client.getAccessToken();
        const mailList=['parthsood99@gmail.com','patelmurli15@gmail.com','patelaniket1207@gmail.com' ]
        const transport = createTransport({
            service: 'gmail',
            auth : {
                type: 'OAuth2',
                user: 'priyankvaidya09@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }

        });
        const mailOptions = {
            from: '✉️ Manage It ✉️<parthsood100@gmail.com>',
            to: [mailList],
            subject: "Expiring Items",
            text: "The Items are going to expire",
            html: {path:'C:/Users/parth/OneDrive/Desktop/DESKTOP/Gmail_API/new.html'}

        };

        const result =
            await transport.sendMail(mailOptions);

            return (result);


    }
    catch (err){
        return (err.message);
    }
}
sendmail().then(result=> console.log("Email Sent to parthsood100@gmail.com", result))
.catch((err)=>console.log(err.message));