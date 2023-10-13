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

    proposalsFromMe = async (id: string) => {
        //lista as propostas que um usuário enviou
        const proposal: proposal[] = await this.proposalRepository.listProposalsByProposerId(id)
        return (proposal)
    }

    proposalsForMe = async (id: string) => {
        //lista as propostas que um usuário enviou
        const proposal: proposal[] = await this.proposalRepository.listProposalsByAnouncerId(id)
        return (proposal)
    }

    proposalsByAnounce = async (id: string) => {
        const proposal: proposal[] = await this.proposalRepository.listProposalsByAnounceId(id)
        return (proposal)
    }


    updateAcepted = async (id: string, acepted: boolean, creator: string) => {

        if (acepted == false) {
            const updatedProposal = await this.proposalRepository.updateProposalAcepted(id, acepted)
            return updatedProposal
        }

        const proposal: proposal = await this.proposalRepository.getProposalById(id)
        const anounce: anounce = await this.anounceRepository.getAnounceById(proposal.anounce_fk)

        if (anounce.anouncer_fk != creator) {
            throw new DomainLogicError("you cant accept something that is not yours");
        }
        if (anounce.quantity < proposal.quantity) {
            throw new DomainLogicError("quantity doesnt matches");
        }

        if (acepted == true) {
            const updatedProposal = await this.proposalRepository.updateProposalAcepted(id, acepted)
            //por incrível que pareça, funciona
            await this.anounceRepository.updateAnounceQuantity(anounce.id, parseFloat(anounce.quantity + "") - parseFloat(proposal.quantity + ""))
            return (updatedProposal)
        }

    }

    markAsUnreceived = async (id: string, user_id: string) => {
        const proposal: proposal = await this.proposalRepository.getProposalById(id)
        const anounce: anounce = await this.anounceRepository.getAnounceById(proposal.anounce_fk)
        if (anounce.anouncer_fk != user_id) {
            throw new DomainLogicError("you cant unreceive something that is not yours");

        }
        if (proposal.status != false && proposal.acepted == true) {
            await this.anounceRepository.updateAnounceQuantity(anounce.id, parseFloat(anounce.quantity + "") + parseFloat(proposal.quantity + ""))
            const updatedProposal = await this.proposalRepository.updateProposalStatus(proposal.id, false)
            return updatedProposal
        }else{
            throw new DomainLogicError("you cant set something that is not accepted or is already canceled");
        }

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