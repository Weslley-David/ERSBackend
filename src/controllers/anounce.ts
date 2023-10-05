import { validationResult } from "express-validator";
import { AnounceService } from "../services/anounce";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class AnounceController {
    constructor(
        private anounceService: AnounceService = new AnounceService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { skip, take } = req.body
        const result = await this.anounceService.list(skip, take)
        return res.json(result).status(200)
    }

    plist = async (req: Request, res: Response) => {
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
        const { skip, take, name } = req.body
        const result = await this.anounceService.listByResidueName(skip, take, name)
        return res.json(result).status(200)
    }

    updateAnounceQuantity = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { id, quantity } = req.body
        const result = await this.anounceService.updateAnounceQuantity(id, quantity)
        return res.json(result).status(201)
    }
    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const {
            title, description, unit, quantity, total, anouncer_fk, residue_fk } = req.body
        const result = await this.anounceService.createAnounce(
            title, description, unit, quantity, total, anouncer_fk, residue_fk
        )
        return res.json(result).status(201)
    }
}