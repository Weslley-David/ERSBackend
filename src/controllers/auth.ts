import { validationResult } from "express-validator";
import { AuthService } from "../services/auth"
import { Request, Response } from "express"
import { RequestError } from "../errors/index";
// import { IAuthRequest } from "../infra/IAuthRequest";
interface IAuthRequest extends Request {
    id: string; // Adicione outros campos necessários
}
export class AuthController {
    constructor(
        private authService: AuthService = new AuthService()
    ) { }


    signin = async (req: Request, res: Response) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new RequestError('wrong form fields', result)
        }
        const { email, password } = req.body
        const login_result = await this.authService.login(email, password)
        return res.json(login_result).status(201)
    }

    verifytoken = async (req: Request, res: Response) => {
        const id = res.locals.id;
        console.log(id);
        return res.json({ "token": "valid" }).status(200);
    }

    signup = async (req: Request, res: Response) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new RequestError('wrong form fields', result)
        }
        const {
            email,
            username,
            password,
            cnpj,
            name,
            trading_name,
            type,
            uf,
            city,
            phone,
            image_url
        } = req.body


        const created_profile = await this.authService.createProfile(
            email,
            username,
            password,
            cnpj,
            name,
            trading_name,
            type,
            uf,
            city,
            phone,
            image_url)
        return res.status(201).json({ "profile": created_profile })
    }
}