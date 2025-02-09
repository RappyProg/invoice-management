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
    const html = compiled({link: `${process.env.CLIENT_URL}/personnel/verify/${token}`});

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Email Verification',
        html: html,
    });
};

export const sendInvoiceMail = async (clientEmail: string, invoiceId: string, pdfPath: string) => {
    const client = await prisma.client.findUnique({
        where: {
            email: clientEmail,
        },
    });
    const clientName = client?.name;
    const templatePath = path.join(__dirname, '../templates/invoiceMail.hbs');
    const source = fs.readFileSync(templatePath, 'utf-8');
    const compiled = handlebars.compile(source);
    
    const html = compiled({
        invoiceId,
        clientUrl: process.env.CLIENT_URL, 
        clientName,
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: clientEmail,
        cc: process.env.EMAIL,
        subject: `Invoice #${invoiceId}`,
        html,
        attachments: [
            {
                filename: `invoice-${invoiceId}.pdf`,
                path: pdfPath,
                contentType: "application/pdf",
            },
        ],
    });
};

export const sendPasswordResetMail = async (userEmail: string) => {
    const templatePath = path.join(__dirname, '../templates/resetPasswordMail.hbs');
    const source = fs.readFileSync(templatePath, 'utf-8');
    const compiled = handlebars.compile(source);
    const html = compiled({link: `${process.env.CLIENT_URL}/personnel/reset-password`});

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Password Reset',
        html: html,
    });
}