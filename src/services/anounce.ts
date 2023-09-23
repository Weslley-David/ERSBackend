import { anounce } from "@prisma/client"
import { AnounceRepository } from "../entities/repository/anounce"

export class AnounceService {
    constructor(
        private anounceRepository: AnounceRepository = new AnounceRepository()
    ) { }
    list = async (skip: number, take: number) => {
        const anounce: anounce[] = await this.anounceRepository.listAnounce(skip, take)
        return (anounce)
    }

    createAnounce = async (
        title: string,
        description: string,
        unit: string,
        quantity: number,
        total: number,
        anouncer_fk: string,
        residue_fk: string
    ) => {
        const anounce: anounce = await this.anounceRepository.createAnounce(title, description, unit, quantity, total, anouncer_fk, residue_fk)
        return (anounce)
    }


}