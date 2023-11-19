import { validationResult } from "express-validator";
import { ResidueService } from "../services/residue";
import { Request, Response } from "express";
import { RequestError } from "../errors";
import { supabase } from "../entities/database";
export class InfraController {
    constructor(
        private residueService: ResidueService = new ResidueService()
    ) { }

    upload = async (req: Request, res: Response) => {
        const multer = require('multer');
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });



        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('wrong form fields', validation_result)
        }
        const result = await this.residueService.list(parseInt(req.query.skip + ""), parseInt(req.query.take + ""))
        return res.json(result).status(200)
    }
}