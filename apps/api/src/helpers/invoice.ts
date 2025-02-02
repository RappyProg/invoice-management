import prisma from '@/prisma';

export async function createUniqueInvoiceId(client_id: number, client_name: string) {
    
  let counter = await prisma.invoiceCounter.upsert({
    where: { client_id: client_id },
    update: { lastInvoiceNumber: { increment: 1 } },
    create: {
      client_id: client_id,
      lastInvoiceNumber: 1,
    },
  });

  const uniqueId = `${client_name}/${counter.lastInvoiceNumber}`;

  return uniqueId;
}
