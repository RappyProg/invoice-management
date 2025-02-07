import { PersonnelController } from '@/controllers/personnel.controller';
import { verifyToken } from '@/middleware/token';
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
} from '@/middleware/validator';
import { Router } from 'express';

export class PersonnelRouter {
  private router: Router;
  private personnelController: PersonnelController;

  constructor() {
    this.personnelController = new PersonnelController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/register',
      validateRegister,
      this.personnelController.register,
    );
    this.router.get(
      '/verify/:token',
      verifyToken,
      this.personnelController.verify,
    );
    this.router.post('/login', validateLogin, this.personnelController.login);
    this.router.post(
      '/forgot-password',
      validateForgotPassword,
      this.personnelController.forgotPassword,
    );
    this.router.post(
      '/reset-password',
      validateResetPassword,
      this.personnelController.resetPassword,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
