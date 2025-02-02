import prisma from "@/prisma";
import { Request, Response } from "express";

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
                status
            }
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Client updated',
            data: client
        })
    }

    async deactivate(req: Request, res: Response) {
        const {id} = req.params;
        const client = await prisma.client.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: "INACTIVE"
            }
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Client deactivated',
            data: client
        })
    }


    async delete (req: Request, res: Response) {
        const {id} = req.params;
        await prisma.client.delete({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(204).send({
            status: 'ok',
            message: 'Client deleted'
        });
    }

    async getClients(req: Request, res: Response) {
        const clients = await prisma.client.findMany();
        return res.status(200).send({
            status: 'ok',
            clients
        });
    }

}