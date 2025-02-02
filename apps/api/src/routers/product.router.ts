import { ProductController } from "@/controllers/product.controller";
import { Router } from "express";

export class ProductRouter{
    private router: Router;
    private productController: ProductController;

    constructor(){
        this.productController = new ProductController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/create', this.productController.create);
        this.router.post('/edit/:id', this.productController.edit);
        this.router.delete('/delete/:id', this.productController.delete);
        this.router.get('/list', this.productController.productList);
    }

    getRouter(): Router {
        return this.router;
    }
}