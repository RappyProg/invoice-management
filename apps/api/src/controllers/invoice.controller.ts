import { createUniqueInvoiceId } from '@/helpers/invoice';
import { findClient, findPersonnel } from '@/helpers/prismaFind';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class InvoiceController {
  async create(req: Request, res: Response) {
    const { client_id, personnel_id, total, dueDate } = req.body;
    const client = await findClient(client_id);
    const personnel = await findPersonnel(personnel_id);
    const uniqueId = await createUniqueInvoiceId(client_id, client?.name!);

    const invoice = await prisma.invoice.create({
      data: {
        id: uniqueId,
        client_id,
        personnel_id,
        status: 'PENDING',
        total,
        dueDate,
      },
    });

    return res.status(201).send({
      status: 'ok',
      message: 'Invoice created',
      invoice,
    });
  }

  async getAllInvoices(req: Request, res: Response) {
    const { personnel_id } = req.body;
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

  async send(req: Request, res: Response) {
    const { invoice_id } = req.params;
    

    return res.status(200).send({
      status: 'ok',
      message: 'Invoice sent',
      
    });
  }
}
