import { Result } from "express-validator"
export class InteralServerError extends Error {
    statusCode: number
    constructor(msg: string) {
        super(msg)
        this.name = 'InteralServerError'
        this.statusCode = 500
    }
}

export class AcessDeniedError extends Error {
    statusCode: number
    constructor(msg: string) {
        super(msg)
        this.name = 'Request Error'
        this.statusCode = 403
    }
}

export class DatabaseError extends Error {
    statusCode: number
    constructor(msg: string) {
        super(msg)
        this.name = 'InteralServerError'
        this.statusCode = 500
    }
}

export class RequestError extends Error{
    statusCode: number
    errors: Result
    constructor(msg: string, errors: Result) {
        super(msg)
        this.errors = errors
        this.name = 'Request Error'
        this.statusCode = 404
    }
}
