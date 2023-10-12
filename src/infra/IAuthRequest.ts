import { Request } from "express";
export interface IAuthRequest extends Request {
    id: string; // Adicione a propriedade id
}