import prisma from "@/prisma";
import { Request, Response } from "express";

export class ProductController{
    async create(req: Request, res: Response) {
        const {name, description, price, stock} = req.body;
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock)
            }
        });
        return res.status(201).send({
            status: 'ok',
            message: 'Product created',
            data: newProduct
        })
    }

    async edit(req: Request, res: Response) {
        const {id} = req.params;
        const {name, description, price, stock} = req.body;
        const product = await prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name, description, price, stock, updatedAt: new Date()
            }
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Product updated',
            data: product
        })
    }

    async softDelete (req: Request, res: Response) {
        const {id} = req.params;
        await prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data:{
                isDeleted: true,
                deletedAt: new Date()
            }
        });
        return res.status(204).send({
            status: 'ok',
            message: 'Product deleted'
        });
    }

    async productList(req: Request, res: Response) {
        const products = await prisma.product.findMany(
            {
                where: {
                    isDeleted: false
                }
            }
        );
        return res.status(200).send({
            status: 'ok',
            message: 'Product list',
            products
        });
    }

}