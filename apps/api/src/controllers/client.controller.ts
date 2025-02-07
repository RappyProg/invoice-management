import prisma from "@/prisma";
import { Request, Response } from "express";
import { startOfDay, endOfDay } from 'date-fns';

export class ClientController{
    async create(req: Request, res: Response) {
        const {name, address, email, phone, paymentMethod} = req.body;
        const newClient = await prisma.client.create({
            data: {
                name,
                address,
                email,
                phone,
                paymentMethod
            }
        });
        return res.status(201).send({
            status: 'ok',
            message: 'Client created',
            data: newClient
        })
    }

    async edit(req: Request, res: Response) {
        const {id} = req.params;
        const {name, address, email, phone, paymentMethod, status} = req.body;
        const client = await prisma.client.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                address,
                email,
                phone,
                paymentMethod,
                updatedAt: new Date(),
            }
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Client updated',
            data: client
        })
    }

    async softDelete(req: Request, res: Response) {
        const {id} = req.params;
        const client = await prisma.client.update({
            where: {
                id: parseInt(id)
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Client deactivated',
            data: client
        })
    }


    async getClients(req: Request, res: Response) {
        const clients = await prisma.client.findMany(
            {
                where: {
                    isDeleted: false
                }
            }
        );
        return res.status(200).send({
            status: 'ok',
            clients
        });
    }

    async dashboardClients(req: Request, res: Response) {
        const todayStart = startOfDay(new Date()); 
        const todayEnd = endOfDay(new Date()); 
    
        const clients = await prisma.client.findMany({
            where: {
                createdAt: {
                    gte: todayStart,
                    lt: todayEnd
                },
                isDeleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    
        return res.status(200).send({
            status: 'ok',
            message: 'Clients retrieved',
            clients,
        });
    }

}