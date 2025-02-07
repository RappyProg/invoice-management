import { ClientController } from "@/controllers/client.controller";
import { validateClient, validateEditClient } from "@/middleware/validator";
import { Router } from "express";

export class ClientRouter{
    private router: Router;
    private clientController: ClientController;

    constructor(){
        this.clientController = new ClientController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/create', validateClient, this.clientController.create);
        this.router.post('/edit/:id', validateEditClient, this.clientController.edit);
        this.router.delete('/delete/:id', this.clientController.softDelete);
        this.router.get('/list', this.clientController.getClients);
        this.router.get('/dashboard-list', this.clientController.dashboardClients);
    }

    getRouter(): Router {
        return this.router;
    }
}