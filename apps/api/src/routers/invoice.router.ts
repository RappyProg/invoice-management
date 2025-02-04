import { InvoiceController } from "@/controllers/invoice.controller";
import { Router } from "express";

export class InvoiceRouter{
    private router: Router;
    private invoiceController: InvoiceController;

    constructor(){
        this.invoiceController = new InvoiceController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/create', this.invoiceController.create);
        this.router.get('/list/:personnel_id', this.invoiceController.getAllInvoices);
    }

    getRouter(): Router {
        return this.router;
    }
}