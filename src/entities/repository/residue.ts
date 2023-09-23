
import { residue } from "@prisma/client"
import { prisma } from "../database/index"
import { DatabaseError } from "../../errors";

export class ResidueRepository {
    listResidue = async (skip: number, take: number): Promise<residue[]> => {
        const residue = await prisma.residue.findMany({
            skip: skip,
            take: take,
        })

        if (!residue) {
            throw new DatabaseError("Coud'not recover data");
        }

        return residue
    }

    getProfileByEmail = async (id: string): Promise<residue> => {
        const residue = await prisma.residue.findUnique({ where: { id: id } })
        if (!residue) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return residue
    }

    createResidue = async (residue_info: residue): Promise<residue> => {
        const residue = await prisma.residue.create({
            data: {
                name: residue_info.name,
                description: residue_info.description,
                nature: residue_info.nature

            }
        })

        return residue
    }

    updateResidue = async (residue_info: residue): Promise<residue> => {
        const updatedinfo = await prisma.residue.update({
            where: {
                id: residue_info.id,
            },
            data: {
                name: residue_info.name,
                description: residue_info.description,
                nature: residue_info.nature

            }
        })

        return updatedinfo
    }

    deleteResidue = async (id: string) => {
        const deletedResidue = await prisma.residue.deleteMany({
            where: {
                id: id
            },
        });
        return deletedResidue
    }
}

// async function ftest() {
//     const test: ResidueRepository = new ResidueRepository
//     const result = await test.listResidue(0, 2)
//     console.log(result)
// }

// ftest()

