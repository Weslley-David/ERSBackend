import { Router } from "express";
import { AnounceController } from "../../controllers/anounce";
import { resolver } from "../../utils/routeAdapters";
import { body } from 'express-validator';

const anounceRoutes = Router()

const residueController = new AnounceController()
anounceRoutes.get('/list',
    body('skip').isInt().toInt(),
    body('take').isInt().toInt(),
    resolver(residueController.list))


export default anounceRoutes