import { ProductController } from "@/controllers/product.controller";
import { validateEditProduct, validateProduct } from "@/middleware/validator";
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
        this.router.post('/create', validateProduct, this.productController.create);
        this.router.post('/edit/:id', validateEditProduct, this.productController.edit);
        this.router.delete('/delete/:id', this.productController.softDelete);
        this.router.get('/list', this.productController.productList);
    }

    getRouter(): Router {
        return this.router;
    }
}