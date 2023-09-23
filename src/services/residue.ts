import { residue } from "@prisma/client"
import { ResidueRepository } from "../entities/repository/residue"

export class ResidueService {
    constructor(
        private residueRepository: ResidueRepository = new ResidueRepository()
    ) { }
    list = async (skip: number, take: number) => {
        const residue: residue[] = await this.residueRepository.listResidue(skip, take)
        return (residue)
    }
}