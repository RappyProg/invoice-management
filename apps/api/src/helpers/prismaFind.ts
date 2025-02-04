import prisma from '@/prisma';

export function findClient(id: string) {
  return prisma.client.findUnique({
    where: {
      id: parseInt(id)
    },
  });
}

export function findPersonnel(email: string) {
  return prisma.personnel.findUnique({
    where: {
      email,
    },
  });
}

export function findPersonnelById(id: number) {
  return prisma.personnel.findUnique({
    where: {
      id,
    },
  });
}

export function findProduct(id: number) {
  return prisma.product.findUnique({
    where: {
      id,
    },
  });
}

export function findInvoice(id: string) {
  return prisma.invoice.findUnique({
    where: {
      id,
    },
  });
}
