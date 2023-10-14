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
        const result = await this.porposalService.list(parseInt(req.query.skip + ""), parseInt(req.query.take + ""))
        return res.json(result).status(200)
    }

    myproposals = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const id = res.locals.id;
        const result = await this.porposalService.proposalsFromMe(id)
        return res.json(result).status(200)

    }

    proposalsForMe = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const id = res.locals.id;
        const result = await this.porposalService.proposalsForMe(id)
        return res.json(result).status(200)

    }

    proposalsByAnounceId = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { id } = req.query
        const result = await this.porposalService.proposalsByAnounce(id + "")
        return res.json(result).status(200)

    }

    markAsUnreceived = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { id } = req.body
        const user_id = res.locals.id
        const result = await this.porposalService.markAsUnreceived(id, user_id)
        return res.json(result).status(200)

    }

    updateProposalAcepted = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { id, acepted } = req.body
        const user_id = res.locals.id;
        const result = await this.porposalService.updateAcepted(id, acepted, user_id)
        return res.json(result).status(200)

    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const {
            description,
            price,
            quantity,
            anounce_fk } = req.body

        const proposer_fk = res.locals.id
        const result = await this.porposalService.createProposal(
            description,
            price,
            quantity,
            proposer_fk,
            anounce_fk
        )
        return res.json(result).status(200)
    }
}