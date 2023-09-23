
import { anounce } from "@prisma/client"
import { prisma } from "../database/index"
import { DatabaseError } from "../../errors";

export class AnounceRepository {
    listAnounce = async (skip: number, take: number): Promise<anounce[]> => {
        const anounce = await prisma.anounce.findMany({
            skip: skip,
            take: take,
        })

        if (!anounce) {
            throw new DatabaseError("Coud'not recover data");
        }

        return anounce
    }

    getAnounceById = async (id: string): Promise<anounce> => {
        const anounce = await prisma.anounce.findUnique({ where: { id: id } })
        if (!anounce) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return anounce
    }

    createAnounce = async (anounce_info: anounce): Promise<anounce> => {
        const anounce = await prisma.anounce.create({
            data: {
                title: anounce_info.title,
                description: anounce_info.description,
                quantity: anounce_info.quantity,
                unit: anounce_info.unit,
                total: anounce_info.total,
                anouncer_fk: anounce_info.anouncer_fk,
                residue_fk: anounce_info.residue_fk
            }
        })

        return anounce
    }

    updateProfile = async (anounce_info: anounce): Promise<anounce> => {
        const updateprofile = await prisma.anounce.update({
            where: {
                id: anounce_info.id,
            },
            data: {
                title: anounce_info.title,
                description: anounce_info.description,
                quantity: anounce_info.quantity,
                unit: anounce_info.unit,
                total: anounce_info.total,
                anouncer_fk: anounce_info.anouncer_fk,
                residue_fk: anounce_info.residue_fk
            }
        })

        return updateprofile
    }
    deleteAnounce = async (id: string) => {
        const deletedAnounce = await prisma.anounce.deleteMany({
            where: {
                id: id
            },
        });
        return deletedAnounce
    }
}

// async function ftest() {
//     const test: AnounceRepository = new AnounceRepository
//     const result = await test.listAnounce(0, 2)
//     console.log(result)
// }

// ftest()

