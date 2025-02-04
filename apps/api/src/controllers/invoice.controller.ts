import { calculateTotal, createUniqueInvoiceId } from '@/helpers/invoice';
import { findClient, findPersonnel } from '@/helpers/prismaFind';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class InvoiceController {
  async create(req: Request, res: Response) {
    const { client_id, personnel_id, total, invoiceItems } = req.body;
    const client = await findClient(client_id);
    if(!client) throw new Error('Client not found');
    const personnel = await findPersonnel(personnel_id);
    const uniqueId = await createUniqueInvoiceId(client_id, client?.name);
    const calculatedTotal = await calculateTotal(invoiceItems);
    let date = new Date();

    const invoice = await prisma.invoice.create({
      data: {
        id: uniqueId,
        client_id: parseInt(client_id),
        personnel_id: parseInt(personnel_id),
        status: 'PENDING',
        total: calculatedTotal,
        dueDate: new Date(date.setDate(date.getDate() + 1)),
        invoiceItems: {
          create: invoiceItems.map((item: any) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { invoiceItems: true },
    });

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
      },
    });

    return res.status(200).send({
      status: 'ok',
      message: 'Invoices retrieved',
      invoices,
    });
  }

  async getInvoiceById(req: Request, res: Response) {
    const { invoice_id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoice_id,
      },
      include: { invoiceItems: true },
    });

    return res.status(200).send({
      status: 'ok',
      message: 'Invoice retrieved',
      invoice,
    });
  }

  async send(req: Request, res: Response) {
    const { invoice_id } = req.params;
    

    return res.status(200).send({
      status: 'ok',
      message: 'Invoice sent',
      
    });
  }
}
