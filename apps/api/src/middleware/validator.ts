import { ClientSchema, EditClientSchema, EditProductSchema, ForgotPasswordSchema, InvoiceSchema, LoginSchema, ProductSchema, RegisterSchema, ResetPasswordSchema } from "@/zod/schemas";
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body, req.params);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
              message: `${issue.path.join('.')} is ${issue.message}`,
          }))
          res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
        } else {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
      }
    };
  }

export const validateRegister = validateData(RegisterSchema);
export const validateLogin = validateData(LoginSchema);
export const validateProduct = validateData(ProductSchema);
export const validateClient = validateData(ClientSchema);
export const validateInvoice = validateData(InvoiceSchema);
export const validateResetPassword = validateData(ResetPasswordSchema);
export const validateForgotPassword = validateData(ForgotPasswordSchema);
export const validateEditClient = validateData(EditClientSchema);
export const validateEditProduct = validateData(EditProductSchema);

