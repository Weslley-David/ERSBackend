import { Router } from "express";
import { ResidueController } from "../../controllers/residue";
import { resolver } from "../../utils/routeAdapters";
import { body, param } from "express-validator";

const residueRoutes = Router()

const residueController = new ResidueController()
residueRoutes.post('/list',
    body('skip').isNumeric().isInt().toInt(),
    body('take').isNumeric().isInt().toInt(),
    resolver(residueController.list))

    residueRoutes.get('/list',
    param('skip'),
    param('take'),
    resolver(residueController.plist))


export default residueRoutes