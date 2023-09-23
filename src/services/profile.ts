import { profile } from "@prisma/client"
import { ProfileRepository } from "../entities/repository/profile"

export class ProfileService {
    constructor(
        private profileRepository: ProfileRepository = new ProfileRepository()
    ) { }
    list = async (skip: number, take: number) => {
        const profile: profile[] = await this.profileRepository.listProfile(skip, take)
        return (profile)
    }

    getByUsername = async (username: string) => {
        const profile: profile = await this.profileRepository.getProfileByUsername(username)
        return (profile)
    }

    updatePhone = async (id: string, phone: string) => {
        const profile: profile = await this.profileRepository.updatePhone(id, phone)
        return (profile)
    }
}