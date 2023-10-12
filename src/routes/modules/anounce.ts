import { Router } from "express";
import { AnounceController } from "../../controllers/anounce";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const anounceRoutes = Router()

const residueController = new AnounceController()
anounceRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(residueController.list))
anounceRoutes.get('/listbyresiduename',
    query('skip').isInt().toInt(),
    query('take').isInt().toInt(),
    query('name').isString(),
    resolver(residueController.listByResidueName))

anounceRoutes.patch('/updateanouncequantity',
    body('id').isUUID(),
    body('quantity').isNumeric(),
    resolver(residueController.updateAnounceQuantity))

anounceRoutes.post('/create',
    body('title').isString(),
    body('description').isString(),
    body('unit').isString().custom((value) => {

        if (value == 'unit' || value == 'kg') {
            return true;
        }
        throw new Error('O valor deve ser kg ou unit.');
    }),
    body('quantity').isNumeric().toFloat(),
    body('total').isNumeric().toFloat(),
    body('anouncer_fk').isUUID(),
    body('residue_fk').isUUID(),
    resolver(residueController.create))

export default anounceRoutes