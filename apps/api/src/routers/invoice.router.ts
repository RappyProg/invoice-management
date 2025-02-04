import { InvoiceController } from "@/controllers/invoice.controller";
import upload from "@/middleware/uploader";
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
        this.router.post('/create', upload.single('invoicePDF'), this.invoiceController.create);
        this.router.get('/list/:personnel_id', this.invoiceController.getAllInvoices);
        this.router.post('/payment/:invoice_id', this.invoiceController.payment);
    }

    getRouter(): Router {
        return this.router;
    }
}