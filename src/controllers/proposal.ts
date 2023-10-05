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

    plist = async (req: Request, res: Response) => {
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
        const { id } = req.body
        const result = await this.porposalService.myProposals(id)
        return res.json(result).status(200)

    }

    pmyproposals = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { id } = req.query
        const result = await this.porposalService.myProposals(String(id))
        return res.json(result).status(200)

    }

    proposalsByAnounceId = async (req: Request, res: Response) => {
        const { id } = req.body
        const result = await this.porposalService.proposalsByAnounce(id)
        return res.json(result).status(200)

    }

    updateProposalStatus = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { id, status } = req.body
        const result = await this.porposalService.updateStatus(id, status)
        return res.json(result).status(200)

    }

    updateProposalAcepted = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const { id, acepted } = req.body
        const result = await this.porposalService.updateAcepted(id, acepted)
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
            proposer_fk,
            anounce_fk } = req.body
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