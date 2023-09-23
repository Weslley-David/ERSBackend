
import { profile } from "@prisma/client"
import { Profile } from "../models/profile";
import { prisma } from "../database/index"
import { DatabaseError } from "../../errors";

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

    getProfileByEmail = async (email: string): Promise<profile> => {
        const profile = await prisma.profile.findUnique({ where: { email: email } })
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

    updateProfile = async (profile_info: profile): Promise<profile> => {
        const updateprofile = await prisma.profile.update({
            where: {
                email: profile_info.email,
            },
            data: {
                email: profile_info.email,
                username: profile_info.username,
                password: profile_info.password,
                cnpj: profile_info.cnpj,
                name: profile_info.name,
                trading_name: profile_info.trading_name,
                type: profile_info.type,
                image_url: profile_info.image_url,
                uf: profile_info.uf,
                city: profile_info.city,
                phone: profile_info.phone
            }
        })

        return updateprofile
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
//     const result = await test.listProfile(0, 2)
//     console.log(result)
// }

// ftest()

