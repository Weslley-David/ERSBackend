import { Router } from "express";
import { ResidueController } from "../../controllers/residue";
import { resolver } from "../../utils/routeAdapters";
import { body } from "express-validator";

const residueRoutes = Router()

const residueController = new ResidueController()
residueRoutes.get('/list',
    body('skip').isNumeric().isInt().toInt(),
    body('take').isNumeric().isInt().toInt(),
    resolver(residueController.list))


export default residueRoutes