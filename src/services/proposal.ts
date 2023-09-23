import { proposal } from "@prisma/client"
import { ProposalRepository } from "../entities/repository/proposal"
export class ProposalService {
    constructor(
        private proposalRepository: ProposalRepository = new ProposalRepository()
    ) { }
    list = async (skip: number, take: number) => {
        const proposal: proposal[] = await this.proposalRepository.listProposal(skip, take)
        return (proposal)
    }
}