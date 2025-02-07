import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Cannot be empty'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Required'),
});

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  description: z.string().optional(),
  price: z.number({ invalid_type_error: 'Price needs to be defined' }),
  stock: z.number().optional(),
});

export const ClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone number is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
});

export const InvoiceItemSchema = z.object({
  product_id: z.number({ invalid_type_error: 'Product is required' }),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price cannot be negative'),
});

export const InvoiceSchema = z.object({
  client_id: z.number(),
  personnel_id: z.number(),
  status: z.enum(['PENDING', 'PAID', 'CANCELLED'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
  total: z.number().min(0, 'Total cannot be negative'),
  invoiceItems: z
    .array(InvoiceItemSchema)
    .min(1, 'At least one invoice item is required'),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
  newPassword: z.string().min(1, 'Password is required'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
});

export const EditClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email'),
  phone: z.number({ invalid_type_error: 'Phone number is required' }),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  status: z.string().min(1, 'Status is required'),
});

export const EditProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
});
