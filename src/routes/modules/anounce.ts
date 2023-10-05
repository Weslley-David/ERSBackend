import { Router } from "express";
import { AnounceController } from "../../controllers/anounce";
import { resolver } from "../../utils/routeAdapters";
import { body, param } from 'express-validator';

const anounceRoutes = Router()

const residueController = new AnounceController()
anounceRoutes.post('/list',
    body('skip').isInt().toInt(),
    body('take').isInt().toInt(),
    resolver(residueController.list))

anounceRoutes.get('/list',
    param('skip'),
    param('take'),
    resolver(residueController.plist))
anounceRoutes.post('/listbyresiduename',
    body('skip').isInt().toInt(),
    body('take').isInt().toInt(),
    body('name').isString(),
    resolver(residueController.listByResidueName))

anounceRoutes.patch('/updateanouncequantity',
    body('id').isBoolean(),
    body('acepted').isBoolean(),
    residueController.updateAnounceQuantity)

anounceRoutes.post('/create',
    body('title').isString(),
    body('description').isString(),
    body('unit').isString().custom((value) => {

        if (value == 'unit' || value == 'kg') {
            return true;
        }
        throw new Error('O valor deve ser kg ou unit.');
        // Se a validação passar, retorne true
    }),
    body('quantity').isNumeric().toFloat(),
    body('total').isNumeric().toFloat(),
    body('anouncer_fk').isUUID(),
    body('residue_fk').isUUID(),
    resolver(residueController.create))

export default anounceRoutes