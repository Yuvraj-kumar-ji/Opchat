import { Resend } from "resend";
import { ENV } from '../lib/env.js';
import { sender } from '../lib/resend.js';
import { welcomeTemplate } from './emailTemplate.js';

const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sendWelcomeEmail = async (email, name, mainURL) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: `Welcome to Opchat!`,
        html: welcomeTemplate({username:name, applicationUrl:mainURL, appName:'Opchat'})
    })
    if(error){
        console.error('Error sending welcome email:', error);
    } else {
        console.log('Welcome email sent successfully:', data);
    }
};
