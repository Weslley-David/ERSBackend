import { Router } from "express";
import { InfraController } from "../../controllers/infra";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from "express-validator";

const residueRoutes = Router()

const infraController = new InfraController()
residueRoutes.get('/upload', resolver(infraController.upload))


export default residueRoutes