import { validationResult } from "express-validator";
import { ResidueService } from "../services/residue";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class ResidueController {
    constructor(
        private residueService: ResidueService = new ResidueService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }

        const { skip, take } = req.body
        console.log(skip, take)
        const result = await this.residueService.list(skip, take)
        return res.json(result).status(200)
    }

    plist = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const result = await this.residueService.list(parseInt(req.query.skip + ""), parseInt(req.query.take + ""))
        return res.json(result).status(200)
    }
}