
import { proposal } from "@prisma/client"
import { prisma } from "../database/index"
import { DatabaseError } from "../../errors";

export class ProposalRepository {
    listProposal = async (skip: number, take: number): Promise<proposal[]> => {
        const proposal = await prisma.proposal.findMany({
            skip: skip,
            take: take,
        })

        if (!proposal) {
            throw new DatabaseError("Coud'not recover data");
        }

        return proposal
    }

    listProposalsByAnounceId = async (id: string): Promise<proposal[]> => {
        const proposal = await prisma.proposal.findMany({
            where: {
                anounce_fk: id,
            },
        });

        if (!proposal) {
            throw new DatabaseError("Coud'not recover data of email");
        }

        return proposal;
    }


    listProposalsByProposerId = async (id: string): Promise<proposal[]> => {
        const proposal = await prisma.proposal.findMany({
            where: {
                proposer_fk: id
            },
        });

        if (!proposal) {
            throw new DatabaseError("Coud'not recover data of user");
        }

        return proposal;
    }

    getProposalById = async (id: string): Promise<proposal> => {
        const proposal = await prisma.proposal.findUnique({ where: { id: id } })
        if (!proposal) {
            throw new DatabaseError("Coud'not recover data of user");
        }
        return proposal
    }


    updateProposalAcepted = async (id: string, acepted: boolean): Promise<proposal> => {
        const updatedProposal = await prisma.proposal.update({
            where: {
                id: id,
            },
            data: {
                acepted: acepted,
            },
        })

        if (!updatedProposal) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return updatedProposal
    }

    updateProposalStatus = async (id: string, status: boolean): Promise<proposal> => {
        const updatedProposal = await prisma.proposal.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        })

        if (!updatedProposal) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return updatedProposal
    }

    createProposal = async (
        description: string,
        price: number,
        quantity: number,
        proposer_fk: string,
        anounce_fk: string
    ): Promise<proposal> => {
        const proposal = await prisma.proposal.create({
            data: {
                proposer_fk: proposer_fk,
                anounce_fk: anounce_fk,
                price: price,
                quantity: quantity,
                description: description

            }
        })

        return proposal
    }

    updateProposal = async (proposal_info: proposal): Promise<proposal> => {
        const updatedinfo = await prisma.proposal.update({
            where: {
                id: proposal_info.id,
            },
            data: {
                proposer_fk: proposal_info.proposer_fk,
                anounce_fk: proposal_info.anounce_fk,
                price: proposal_info.price,
                acepted: proposal_info.acepted,
                status: proposal_info.status,
                description: proposal_info.description
            }
        })

        return updatedinfo
    }

    deleteProposal = async (id: string) => {
        const deletedProposal = await prisma.proposal.deleteMany({
            where: {
                id: id
            },
        });
        return deletedProposal
    }

}

// async function ftest() {
//     const test: ProposalRepository = new ProposalRepository
//     const result = await test.listProposal(0, 2)
//     console.log(result)
// }

// ftest()

