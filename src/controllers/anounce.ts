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
}