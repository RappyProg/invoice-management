import prisma from '@/prisma';
import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { sendPasswordResetMail, sendVerificationMail } from '@/helpers/nodemailer';
import { createToken } from '@/middleware/token';
import { findPersonnel, findPersonnelById } from '@/helpers/prismaFind';

export class PersonnelController {
  async register(req: Request, res: Response) {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(req.body.password, salt);
      const newPersonnel = await prisma.personnel.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        },
      });
      await sendVerificationMail(newPersonnel.id, newPersonnel.email);
      return res.status(201).send({
        status: 'success',
        message: 'Personnel created',
        data: newPersonnel,
      });
    } catch (error: any) {
      return res.status(400).send({
        status: 'error',
        message: 'Registration failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const decoded = verify(req.params.token, process.env.JWT!) as {
        id: number;
        email: string;
      };
      const existingPersonnel = await findPersonnelById(decoded.id);

      if (existingPersonnel?.isVerified === false) {
        await prisma.personnel.update({
          where: { id: decoded.id },
          data: { isVerified: true },
        });
      } else throw new Error('Email already verified');

      return res.status(200).send({
        status: 'success',
        message: 'Email verified',
      });
    } catch (error: any) {
      return res.status(400).send({
        status: 'error',
        message: 'Verification failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const personnel = await findPersonnel(email);
      if (!personnel) throw new Error('Personnel not found');
      if (!personnel.isVerified) {
        await sendVerificationMail(personnel.id, personnel.email);
        throw new Error('Verification email sent');}
      const token = createToken(personnel.id, personnel.email);
      if (!personnel.password) throw new Error('Password not set');
      const isPasswordValid = await compare(password, personnel.password);
      
      if(isPasswordValid){
        return res.status(200).send({
        status: 'success',
        message: 'Login successful',
        token,
        personnel,
      });
      }
      
    } catch (error: any) {
      return res.status(400).send({
        status: 'error',
        message: 'Login failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const personnel = await findPersonnel(email);
      if (!personnel) throw new Error('Personnel not found');
      await sendPasswordResetMail(personnel.email);
      return res.status(200).send({
        status: 'success',
        message: 'Password reset email sent',
      });
    } catch (error: any) {
      return res.status(400).send({
        status: 'error',
        message: 'Password reset failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      const personnel = await findPersonnel(email);
      if (!personnel) throw new Error('Personnel not found');
      const salt = await genSalt(10);
      const hashedPassword = await hash(newPassword, salt);
      const comparePassword = await compare(newPassword, personnel.password!);
      if(comparePassword) throw new Error('Password cannot be the same');
      await prisma.personnel.update({
        where: { id: personnel.id },
        data: { password: hashedPassword },
      });
      return res.status(200).send({
        status: 'success',
        message: 'Password reset successful',
      });
    } catch (error: any) {
      return res.status(400).send({
        status: 'error',
        message: 'Password reset failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
