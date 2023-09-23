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
}