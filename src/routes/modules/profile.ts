import { Router } from "express";
import { ProfileController } from "../../controllers/profile";
import { resolver } from "../../utils/routeAdapters";
import { body } from "express-validator";

const profileRoutes = Router()

const profileController = new ProfileController()
profileRoutes.get('/list',
    body('skip').isInt().toInt(),
    body('take').isInt().toInt(),
    resolver(profileController.list))


export default profileRoutes