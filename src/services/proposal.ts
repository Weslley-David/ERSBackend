import { anounce, proposal } from "@prisma/client"
import { ProposalRepository } from "../entities/repository/proposal"
import { AnounceRepository } from "../entities/repository/anounce"
import { DomainLogicError } from "../errors"
export class ProposalService {
    constructor(
        private proposalRepository: ProposalRepository = new ProposalRepository(),
        private anounceRepository: AnounceRepository = new AnounceRepository()
    ) { }
    list = async (skip: number, take: number) => {
        const proposal: proposal[] = await this.proposalRepository.listProposal(skip, take)
        return (proposal)
    }

    myProposals = async (id: string) => {
        const proposal: proposal[] = await this.proposalRepository.listProposalsByProposerId(id)
        return (proposal)
    }

    proposalsByAnounce =async (id: string) => {
        const proposal: proposal[] = await this.proposalRepository.listProposalsByAnounceId(id)
        return (proposal)
    }

    updateAcepted =async (id: string, acepted: boolean) => {

        if(acepted == false){
            const updatedProposal = await this.proposalRepository.updateProposalAcepted(id, acepted)
            return updatedProposal
        }

        const proposal: proposal = await this.proposalRepository.getProposalById(id)
        const anounce: anounce = await this.anounceRepository.getAnounceById(proposal.anounce_fk)

        

        if(anounce.quantity < proposal.quantity){
            throw new DomainLogicError("quantity doesnt matches");
        }

        if(acepted == true){
            const updatedProposal = await this.proposalRepository.updateProposalAcepted(id, acepted)
            //por incrível que pareça, funciona
            await this.anounceRepository.updateAnounceQuantity(anounce.id, parseFloat(anounce.quantity+"") - parseFloat(proposal.quantity+""))
            return (updatedProposal)
        }
        
    }

    updateStatus =async (id: string, status: boolean) => {
        const updatedProposal = await this.proposalRepository.updateProposalStatus(id, status)
        return updatedProposal
    }

    createProposal = async (
        description: string,
        price: number,
        quantity: number,
        proposer_fk: string,
        anounce_fk: string) => {
        const proposal: proposal = await this.proposalRepository.createProposal(
            description,
            price,
            quantity,
            proposer_fk,
            anounce_fk)
        return (proposal)
    }
}