import { createInvoice } from '@/helpers/createInvoice';
import { calculateTotal, createUniqueInvoiceId } from '@/helpers/invoice';
import { sendInvoiceMail } from '@/helpers/nodemailer';
import { findClient } from '@/helpers/prismaFind';
import prisma from '@/prisma';
import { generateInvoicePDF } from '@/utils/generatePDF';
import { Request, Response } from 'express';
import path from 'path';

export class InvoiceController {
  async create(req: Request, res: Response) {
    const { client_id, personnel_id, total, invoiceItems } = req.body;
    const client = await findClient(client_id);
    if(!client) throw new Error('Client not found');
    const uniqueId = await createUniqueInvoiceId(client_id, client?.name);
    const calculatedTotal = await calculateTotal(invoiceItems);
    let date = new Date();
    const invoice = await createInvoice(uniqueId, client_id, personnel_id, calculatedTotal, date, invoiceItems);
    const invoicePDF = await generateInvoicePDF(uniqueId);
    const invoiceFileName = path.basename(invoicePDF);
    const invoicePDFPath = `${process.env.BACKEND_URL}/api/storage/invoices/${invoiceFileName}`;

    await prisma.invoice.update({
      where: {
        id: uniqueId,
      },
      data: {
        pdfPath: invoicePDFPath,
      },
    });
    await sendInvoiceMail(client.email, uniqueId, invoicePDF)
    return res.status(201).send({
      status: 'ok',
      message: 'Invoice created',
      invoice,
    });
  }

  async getAllInvoices(req: Request, res: Response) {
    const {personnel_id} = req.params;
    const invoices = await prisma.invoice.findMany({
      where: {
        personnel_id: parseInt(personnel_id),
        isDeleted: false
      },
      orderBy:{
        createdAt: 'desc'
      }
      
    });

    return res.status(200).send({
      status: 'ok',
      message: 'Invoices retrieved',
      invoices,
    });
  }

  async payment(req: Request, res: Response) {
    const {invoice_id} = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoice_id
      },
    });
    if(!invoice) throw new Error('Invoice not found');
    await prisma.invoice.update({
      where: {
        id: invoice_id,
      },
      data: {
        status: "PAID",
      },
    });
    return res.status(200).send({
      status: 'ok',
      message: 'Invoice paid',
    });
  }

  async getInvoiceById(req: Request, res: Response) {
    const {invoice_id} = req.body;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoice_id,
        isDeleted: false
      },
    });
    if(!invoice) throw new Error('Invoice not found');
    return res.status(200).send({
      status: 'ok',
      message: 'Invoice retrieved',
      invoice,
    });
  }

  async softDelete(req: Request, res: Response) {
    const {invoice_id} = req.body;
    console.log(invoice_id);
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoice_id
      },
    });
    if(!invoice) throw new Error('Invoice not found');
    await prisma.invoice.update({
      where: {
        id: invoice_id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
    return res.status(200).send({
      status: 'ok',
      message: 'Invoice deleted',
    });
  }


}
