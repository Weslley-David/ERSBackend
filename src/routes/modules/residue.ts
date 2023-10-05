import { Router } from "express";
import { ResidueController } from "../../controllers/residue";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from "express-validator";

const residueRoutes = Router()

const residueController = new ResidueController()
residueRoutes.post('/list',
    body('skip').isNumeric().isInt().toInt(),
    body('take').isNumeric().isInt().toInt(),
    resolver(residueController.list))

    residueRoutes.get('/list',
    query('skip'),
    query('take'),
    resolver(residueController.plist))


export default residueRoutes