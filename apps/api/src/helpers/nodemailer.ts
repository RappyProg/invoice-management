import { sign } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import prisma from '@/prisma';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendVerificationMail = async (userId: number, userEmail: string) => {
    const payload = {id: userId, email: userEmail};
    const token = sign(payload, process.env.JWT!, {expiresIn: '1h'});

    const templatePath = path.join(__dirname, '../templates/verificationMail.hbs');
    const source = fs.readFileSync(templatePath, 'utf-8');
    const compiled = handlebars.compile(source);
    const html = compiled({link: `${process.env.CLIENT_URL}/personnel/${token}`});

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Email Verification',
        html: html,
    });
};