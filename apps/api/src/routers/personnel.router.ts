import { PersonnelController } from "@/controllers/personnel.controller";
import { verifyToken } from "@/middleware/token";
import { Router } from "express";

export class PersonnelRouter{
    private router: Router;
    private personnelController: PersonnelController;

    constructor(){
        this.personnelController = new PersonnelController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.personnelController.register);
        this.router.get('/verify/:token', verifyToken, this.personnelController.verify);
        this.router.post('/login', this.personnelController.login);
        this.router.post('/forgot-password', this.personnelController.forgotPassword);
        this.router.post('/reset-password', this.personnelController.resetPassword);
    }

    getRouter(): Router {
        return this.router;
    }
}