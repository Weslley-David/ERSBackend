import { Router } from "express";
import { ProfileController } from "../../controllers/profile";
import { resolver } from "../../utils/routeAdapters";
import { body, param } from "express-validator";

const profileRoutes = Router()

const profileController = new ProfileController()
profileRoutes.post('/list',
    body('skip').isInt().toInt(),
    body('take').isInt().toInt(),
    resolver(profileController.list))

profileRoutes.get('/list',
    param('skip'),
    param('take'),
    resolver(profileController.plist))


profileRoutes.post('/generaterelatory',
    body('id').isUUID(),
    resolver(profileController.generateRelatory))

profileRoutes.post('/:name',
    param('name').isString(),
    resolver(profileController.getByUsername))



export default profileRoutes