
import { anounce } from "@prisma/client"
import { prisma } from "../database/index"
import { DatabaseError } from "../../errors";

export class AnounceRepository {

    listAnounce = async (skip: number, take: number): Promise<anounce[]> => {
        const anounce = await prisma.anounce.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!anounce) {
            throw new DatabaseError("Coud'not recover data");
        }

        return anounce
    }
    listAnounceByResidue = async (skip: number, take: number, name: string): Promise<anounce[]> => {
        const anounce = await prisma.anounce.findMany({
            skip: skip,
            take: take,
            where:{
                residue:{
                    name: name
                }
            }
        },
        )

        if (!anounce) {
            throw new DatabaseError("Coud'not recover data");
        }

        return anounce
    }
    listAnounceByAnouncerId = async (id: string) => {
        const anounces = await prisma.anounce.findMany({
            where: {
                anouncer_fk: id,
            },
        });

        return anounces;
    }

    getAnounceById = async (id: string): Promise<anounce> => {
        const anounce = await prisma.anounce.findUnique({ where: { id: id } })
        if (!anounce) {
            throw new DatabaseError("Coud'not recover data of anounce");
        }
        return anounce
    }

    createAnounce = async (
        title: string,
        description: string,
        unit: string,
        quantity: number,
        total: number,
        anouncer_fk: string,
        residue_fk: string
    ): Promise<anounce> => {
        const anounce = await prisma.anounce.create({
            data: {
                title: title,
                description: description,
                quantity: total,
                unit: unit,
                total: total,
                anouncer_fk: anouncer_fk,
                residue_fk: residue_fk
            }
        })

        return anounce
    }


    updateAnounce = async (anounce_info: anounce): Promise<anounce> => {
        const updateanounce = await prisma.anounce.update({
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

        return updateanounce
    }
    updateAnounceQuantity = async (id: string, quantity: number) => {
        const updatedProposal = await prisma.anounce.update({
            where: {
                id: id,
            },
            data: {
                quantity: quantity,
            },
        })

        if (!updatedProposal) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return updatedProposal

    }

    updateAnounceQuantityAndTotal = async (id: string, quantity: number, total: number) => {
        const updatedProposal = await prisma.anounce.update({
            where: {
                id: id,
            },
            data: {
                quantity: quantity,
                total: total
            },
        })

        if (!updatedProposal) {
            throw new DatabaseError("Coud'not recover data of id");
        }
        return updatedProposal

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

