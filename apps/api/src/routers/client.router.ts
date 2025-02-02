import { ClientController } from "@/controllers/client.controller";
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
        this.router.post('/create', this.clientController.create);
        this.router.post('/edit/:id', this.clientController.edit);
        this.router.post('/deactivate/:id', this.clientController.deactivate);
        this.router.delete('/delete/:id', this.clientController.delete);
        this.router.get('/list', this.clientController.getClients);
    }

    getRouter(): Router {
        return this.router;
    }
}