import { profile } from "@prisma/client"
import { DashboardData, ProfileRepository } from "../entities/repository/profile"

export class ProfileService {
    constructor(
        private profileRepository: ProfileRepository = new ProfileRepository()
    ) { }
    list = async (skip: number, take: number) => {
        const profile = await this.profileRepository.listProfile(skip, take)
        return (profile)
    }

    getByUsername = async (username: string) => {
        const profile = await this.profileRepository.getProfileByUsername(username)
        return (profile)
    }

    getById = async (id: string) => {
        const profile = await this.profileRepository.getProfileByIdSummary(id)
        return (profile)
    }

    updatePhone = async (id: string, phone: string) => {
        const profile: profile = await this.profileRepository.updatePhone(id, phone)
        return (profile)
    }

    generateDashboad =async (id: string) => {
        const profile: profile = await this.profileRepository.getProfileById(id)
        const dash_inputs: DashboardData[] = await this.profileRepository.generateDashboard(profile.email)
        // let insights = `
        //     <h3>${profile.trading_name}<h3>
        //         <br>
        //     <h5>${profile.city} - ${profile.uf}<h5>`
        // dash_inputs.forEach((data) => {
        //     insights = insights + `
        //     ${data.ResidueName} - Total: ${data.TotalSum} ${data.AnounceUnit} - Destinated: ${data.QuantitySum} - Remanecent: ${data.TotalSum - data.QuantitySum} <br>
        //     `
        //   });
        
        return dash_inputs
    }
}