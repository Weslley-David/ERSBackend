import { anounce } from "@prisma/client"
import { AnounceRepository } from "../entities/repository/anounce"
import { DomainLogicError } from "../errors"

export class AnounceService {
    constructor(
        private anounceRepository: AnounceRepository = new AnounceRepository()
    ) { }
    list = async (skip: number, take: number) => {
        const anounce: anounce[] = await this.anounceRepository.listAnounce(skip, take)
        return (anounce)
    }

    listByResidueName = async (skip: number, take: number, name: string) => {
        const anounce: anounce[] = await this.anounceRepository.listAnounceByResidue(skip, take, name)
        return (anounce)
    }

    incrementAnounceQuantity =async (id: string, quantity: number) => {


        if(quantity < 0){
            throw new DomainLogicError("quantity not accepted");
        }


        const anounce: anounce = await this.anounceRepository.getAnounceById(id)
        const updatedAnounce = await this.anounceRepository.updateAnounceQuantityAndTotal(id, parseFloat(anounce.quantity+"") + parseFloat(quantity+""), parseFloat(anounce.total+"") + parseFloat(quantity+""))
        return (updatedAnounce)
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