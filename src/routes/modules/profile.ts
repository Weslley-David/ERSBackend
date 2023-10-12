import { Router } from "express";
import { ProfileController } from "../../controllers/profile";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from "express-validator";

const profileRoutes = Router()

const profileController = new ProfileController()
profileRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(profileController.list))


profileRoutes.get('/generaterelatory/:id',
    param('id').isUUID(),
    resolver(profileController.generateRelatory))

profileRoutes.get('/:name',
    param('name').isString(),
    resolver(profileController.getByUsername))



export default profileRoutes