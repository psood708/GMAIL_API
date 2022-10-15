import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
// const { oauth2 } = require('googleapis/build/src/apis/oauth2');
// const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '390188066164-qullqr07vvhhjap06di18p1p3s7s6e7o.apps.googleusercontent.com';
const CLIENT_SECRET ='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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//041rVEl27T0F1CgYIARAAGAQSNwF-L9IrMNoXxy5-YSMXv0UskzYuMyWbWm5oKBR-pnUGW1qKKmSq1161Hv29nUqWg_d11yqMcp4';
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
async function sendMail(){
    try{
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'parthsood100@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken,
                
            }
        })
        const mailOptions = {
            from: 'The Company <parthsood100@gmail.com>',
            to:'parthsood99@gmail.com',
            subject:"Hello from gmail using API",
            text:'Hello from gmail using API',
            html:'<h1>Hello from gmail using api</h1>',
        };
        const result = await transport.sendMail(mailOptions)
        return result
    } catch(error){
        return error;
    }
}
sendMail()
.then(result => console.log('Email Delivered...',result))
.catch((error)=>console.log(error.message));