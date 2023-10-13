import { validationResult } from "express-validator";
import { AnounceService } from "../services/anounce";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class AnounceController {
    constructor(
        private anounceService: AnounceService = new AnounceService()
    ) { }

    detailResidue = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const result = await this.anounceService.detailResidue(req.params.id)
        return res.json(result).status(200)
    }

    list = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const result = await this.anounceService.list(parseInt(req.query.skip + ""), parseInt(req.query.take + ""))
        return res.json(result).status(200)
    }

    listByResidueName = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { skip, take, name } = req.query
        const result = await this.anounceService.listByResidueName(parseInt(req.query.skip + ""), parseInt(req.query.take + ""), name + "")
        return res.json(result).status(200)
    }

    updateAnounceQuantity = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { quantity, id } = req.body
        const user_id = res.locals.id;
        const result = await this.anounceService.incrementAnounceQuantity(id, quantity, user_id)
        return res.json(result).status(201)
    }
    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const {
            title, description, unit, quantity, total, residue_fk } = req.body
        const anouncer_fk = res.locals.id;
        const result = await this.anounceService.createAnounce(
            title, description, unit, quantity, total, anouncer_fk, residue_fk
        )
        return res.json(result).status(201)
    }
}