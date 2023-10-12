import { Router } from "express";
import { ResidueController } from "../../controllers/residue";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from "express-validator";

const residueRoutes = Router()

const residueController = new ResidueController()
residueRoutes.get('/list',
    query('skip'),
    query('take'),
    resolver(residueController.list))


export default residueRoutes