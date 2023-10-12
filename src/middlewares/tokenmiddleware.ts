const jwt = require('jsonwebtoken')

import { Request, Response, NextFunction } from 'express';

export const TokenMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const auth = request.headers.authorization
    if (!auth) {
        return response.status(401).json({ "error": "no token found" })
        //throw new AcessDeniedError("no token found")
    }

    const [authType, authValue] = auth.split(' ')

    if (authType !== 'Bearer' || !authValue) {
        return response.status(401).json({ "error": "authtype not supported" })
        //throw new AcessDeniedError("authtype not supported")
    }

    jwt.verify(authValue, process.env.SECRET_JWT, async (err: Error, decoded: any) => {
        if (err) {
            return response.status(401).json({ "error": "expired token" })
            //throw new AcessDeniedError("expired token")
        } else {

            if (String(decoded.token) == 'acetoken' && (String(decoded.type) == 'default')) {
                response.locals.id = decoded.id
                return next()
            }
            return response.status(401).json({ "error": "no privileges" })
            //throw new AcessDeniedError("no privileges")
        }
    })
    // Seu código de middleware aqui
    // Certifique-se de que req corresponda ao tipo IAuthRequest
};

export default TokenMiddleware;