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
}