
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

    getProfileByEmail = async (id: string): Promise<proposal> => {
        const proposal = await prisma.proposal.findUnique({ where: { id: id } })
        if (!proposal) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return proposal
    }

    createProposal = async (proposal_info: proposal): Promise<proposal> => {
        const proposal = await prisma.proposal.create({
            data: {
                proposer_fk: proposal_info.proposer_fk,
                anounce_fk: proposal_info.proposer_fk,
                price: proposal_info.price,
                acepted: proposal_info.acepted,
                status: proposal_info.status,
                description: proposal_info.description

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

