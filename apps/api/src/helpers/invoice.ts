import prisma from '@/prisma';

export async function createUniqueInvoiceId(client_id: string, client_name: string) {
    
  let counter = await prisma.invoiceCounter.upsert({
    where: { client_id: parseInt(client_id) },
    update: { lastInvoiceNumber: { increment: 1 } },
    create: {
      client_id: parseInt(client_id),
      lastInvoiceNumber: 1,
    },
  });

  const uniqueId = `${client_name.slice(0,4).toUpperCase()}/${counter.lastInvoiceNumber}`;

  return uniqueId;
}

export async function searchByUniqueInvoiceId(id: string) {
  return prisma.invoice.findUnique({
    where: {
      id,
    },
  });
}

export async function calculateTotal(invoiceItems: any) {
  let total = 0;
  invoiceItems.forEach((item: any) => {
    total += item.price * item.quantity;
  });

  return total;
}
