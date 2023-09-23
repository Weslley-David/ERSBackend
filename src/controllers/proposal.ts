import { validationResult } from "express-validator";
import { ProposalService } from "../services/proposal";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class ProposalController {
    constructor(
        private porposalService: ProposalService = new ProposalService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { skip, take } = req.body
        const result = await this.porposalService.list(skip, take)
        return res.json(result).status(200)
    }
}