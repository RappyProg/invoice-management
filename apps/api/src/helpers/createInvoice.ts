import prisma from "@/prisma";

export function createInvoice (uniqueId: string, client_id: string, personnel_id: string, calculatedTotal: number, date: Date, invoiceItems: []){
    return prisma.invoice.create({
      data: {
        id: uniqueId,
        client_id: parseInt(client_id),
        personnel_id: parseInt(personnel_id),
        status: 'PENDING',
        total: calculatedTotal,
        dueDate: new Date(date.setDate(date.getDate() + 1)),
        invoiceItems: {
          create: invoiceItems.map((item: any) => ({
            product_id: parseInt(item.product_id),
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { invoiceItems: true },
    });
}

