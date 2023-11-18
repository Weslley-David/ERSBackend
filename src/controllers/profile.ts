import { validationResult } from "express-validator";
import { ProfileService } from "../services/profile";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class ProfileController {
    constructor(
        private profileService: ProfileService = new ProfileService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const result = await this.profileService.list(parseInt(req.query.skip + ""), parseInt(req.query.take + ""))
        return res.json(result).status(200)
    }

    generateRelatory = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const id = res.locals.id;
        
        const result = await this.profileService.generateDashboad(id)
        return res.json(result).status(200)
    }
    getByUsername = async (req: Request, res: Response) => {
        const username: string = req.params.name
        const result = await this.profileService.getByUsername(username)
        return res.json(result).status(200)
    }

    getById = async (req: Request, res: Response) => {
        const id: string = req.params.id
        const result = await this.profileService.getById(id)
        return res.json(result).status(200)
    }


}