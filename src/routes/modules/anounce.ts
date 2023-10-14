import { Router } from "express";
import { AnounceController } from "../../controllers/anounce";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';
import TokenMiddleware from "../../middlewares/tokenmiddleware";

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

anounceRoutes.get('/listbyanouncerid',
    query('skip').isInt().toInt(),
    query('take').isInt().toInt(),
    query('id').isUUID(),
    resolver(residueController.listByAnouncerId))
anounceRoutes.patch('/updateanouncequantity',
    body('id').isUUID(),
    body('quantity').isNumeric(),
    TokenMiddleware,
    resolver(residueController.updateAnounceQuantity))

anounceRoutes.get('/:id',
    param('id').isUUID(),
    resolver(residueController.detailResidue))
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
    body('residue_fk').isUUID(),
    TokenMiddleware,
    resolver(residueController.create))

export default anounceRoutes