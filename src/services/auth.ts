import { profile } from "@prisma/client"
import { Profile } from "../entities/models/profile"
import { ProfileRepository } from "../entities/repository/profile"
import { AcessDeniedError } from "../errors"
import { generateTokens } from "../utils/generateTokens/generatePairOfTokens"
// import { generateRandomCode } from "../suporters/utils/generateRandomCode"
// import { AcessDeniedError } from "../Errors/error"
// import { generateTokens } from "../suporters/utils/generateTokens"

export class AuthService {
    constructor(
        private profileRepository: ProfileRepository = new ProfileRepository()
    ) { }
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
        image_url: string | null) => {
        return await this.profileRepository.createProfile(
            email,
            username,
            password,
            cnpj,
            name,
            trading_name,
            type,
            uf,
            city,
            phone,
            image_url)
    }

    login = async (email: string, password: string) => {
        const profile: profile = await this.profileRepository.getProfileByEmail(email)
        if (profile.password !== password) {
            throw new AcessDeniedError("password doesn't matches")
        }

        //função para criar os tokens

        let [acetoken, reftoken] = generateTokens(profile.id, profile.username, profile.type)

        return ({ "signin": true, "id": profile.id, "username": profile.username, "type": profile.type , "acetoken": acetoken, "reftoken": reftoken}) //"acetoken": acetoken, "reftoken": reftoken,
    }
}