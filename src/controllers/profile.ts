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

    plist = async (req: Request, res: Response) => {
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
        const { id } = req.body
        
        const result = await this.profileService.generateDashboad(id)
        // const browser = await puppeteer.launch({ headless: "new" });
        // const page = await browser.newPage();
        // await page.setContent(result);

        // const pdfBuffer = await page.pdf({ format: 'A4', landscape: false });

        // await browser.close();

        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
        // res.send(pdfBuffer);
        return res.json(result).status(200)
    }
    getByUsername = async (req: Request, res: Response) => {
        const username: string = String(req.params.name)
        const result = await this.profileService.getByUsername(username)
        return res.json(result).status(200)
    }


}