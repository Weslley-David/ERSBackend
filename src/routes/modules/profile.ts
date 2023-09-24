import { Router } from "express";
import { ProfileController } from "../../controllers/profile";
import { resolver } from "../../utils/routeAdapters";
import { body, param } from "express-validator";

const profileRoutes = Router()

const profileController = new ProfileController()
profileRoutes.get('/list',
    body('skip').isInt().toInt(),
    body('take').isInt().toInt(),
    resolver(profileController.list))

profileRoutes.get('/generaterelatory',
    body('id').isUUID(),
    resolver(profileController.generateRelatory))

profileRoutes.get('/:name',
    param('name').isString(),
    resolver(profileController.getByUsername))



export default profileRoutes