import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import { resolver } from "../../utils/routeAdapters";
import { body } from 'express-validator';
import { TokenMiddleware } from "../../middlewares/tokenmiddleware";


const authRoutes = Router()

const authController = new AuthController()
authRoutes.post('/signin',
    body('email').isEmail(),
    body('password').isString(),
    resolver(authController.signin))

authRoutes.post('/signup',
    body('username').isString(),
    body('email').isEmail(),
    body('password').isString(),
    body('name').isString(),
    body('trading_name').isString(),
    body('type').isString(),
    body('uf').isString(),
    body('city').isString(),
    body('phone').custom((value) => {
        if (typeof value !== 'string' && value !== null) {
            throw new Error('O valor deve ser uma string ou null.');
        }
        return true;
    }),
    body('image_url').custom((value) => {
        if (typeof value !== 'string' && value !== null) {
            throw new Error('O valor deve ser uma string ou null.');
        }
        return true;
    }),

    resolver(authController.signup))

authRoutes.get('/verifytoken', TokenMiddleware, resolver(authController.verifytoken))

export default authRoutes