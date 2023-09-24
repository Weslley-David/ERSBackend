
import { Prisma, profile } from "@prisma/client"
import { Profile } from "../models/profile";
import { prisma } from "../database/index"
import { DatabaseError } from "../../errors";
import { query } from "express";

export interface DashboardData {
    ResidueName: string;
    ResidueDescription: string;
    AnounceUnit: string;
    TotalSum: number;
    QuantitySum: number;
}

export class ProfileRepository {
    listProfile = async (skip: number, take: number): Promise<profile[]> => {
        const profile = await prisma.profile.findMany({
            skip: skip,
            take: take,
        })

        if (!profile) {
            throw new DatabaseError("Coud'not recover data");
        }

        return profile
    }

    generateDashboard = async (email: string): Promise<DashboardData[]> => {
        //const result = await prisma.$queryRaw`SELECT * FROM profile where email = ${email}`
        const result: DashboardData[] = await prisma.$queryRaw`SELECT
        r.name AS "ResidueName",
        r.description AS "ResidueDescription",
        a.unit AS "AnounceUnit",
        SUM(a.total) AS "TotalSum",
        SUM(a.quantity) AS "QuantitySum"
    FROM
        anounce a
    INNER JOIN
        residue r ON a.residue_fk = r.id
    INNER JOIN
        profile p ON a.anouncer_fk = p.id
    WHERE
        p.email = ${email}
    GROUP BY
        r.name, r.description, a.unit
    ORDER BY
        r.name;
    `
    if (!result) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return result;
    }
    getProfileByEmail = async (email: string): Promise<profile> => {
        const profile = await prisma.profile.findUnique({ where: { email: email } })
        if (!profile) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return profile
    }

    getProfileById = async (id: string): Promise<profile> => {
        const profile = await prisma.profile.findUnique({ where: { id: id } })
        if (!profile) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return profile
    }

    getProfileByUsername = async (username: string): Promise<profile> => {
        const profile = await prisma.profile.findUnique({ where: { username: username } })
        if (!profile) {
            throw new DatabaseError("Coud'not find the informed username");
        }
        return profile
    }

    updatePhone = async (id: string, phone: string): Promise<profile> => {

        const updatedProfile = await prisma.profile.update({
            where: {
                id: id,
            },
            data: {
                phone: phone,
            },
        })

        return updatedProfile

    }

    createProfile = async (email: string,
        username: string,
        password: string,
        cnpj: string,
        name: string,
        trading_name: string,
        type: string,
        uf: string,
        city: string,
        phone: string | null,
        image_url: string | null): Promise<profile> => {
        const profile = await prisma.profile.create({
            data: {
                email: email,
                username: username,
                password: password,
                cnpj: cnpj,
                name: name,
                trading_name: trading_name,
                type: type,
                image_url: image_url,
                uf: uf,
                city: city,
                phone: phone
            }
        })

        return profile
    }

    deleteProfile = async (id: string) => {
        const deletedProfile = await prisma.profile.deleteMany({
            where: {
                id: id
            },
        });
        return deletedProfile
    }
}

// async function ftest() {
//     const test: ProfileRepository = new ProfileRepository
//     const result = await test.generateDashboard('empresaverde@vermelha.com')
//     console.log(result)
// }

// ftest()

