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
        const { skip, take } = req.body
        const result = await this.profileService.list(skip, take)
        return res.json(result).status(200)
    }

    getByUsername =async (req: Request, res: Response) => {
        const username: string = String(req.params.page)
    }
}