// ==== server/utils/sendEmail.js ====
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: 'Whispr <noreply@whispr.app>',
      to,
      subject,
      html,
    });
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Email send error:', error);
  }
};
