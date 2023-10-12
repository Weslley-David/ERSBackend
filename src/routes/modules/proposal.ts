import { Router } from "express";
import { ProposalController } from "../../controllers/proposal";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from "express-validator";

const proposalRoutes = Router()

const proposalController = new ProposalController()
proposalRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(proposalController.list))

proposalRoutes.get('/myproposals',
    query('id').isString(),
    resolver(proposalController.myproposals))

proposalRoutes.get('/proposalsbyanounceid',
    query('id').isUUID(),
    resolver(proposalController.proposalsByAnounceId))

proposalRoutes.patch('/updateacepted',
    body('id').isUUID(),
    body('acepted').isBoolean(),
    resolver(proposalController.updateProposalAcepted))

proposalRoutes.patch('/updatestatus',
    body('id').isUUID(),
    body('status').isBoolean(),
    resolver(proposalController.updateProposalStatus))

proposalRoutes.post('/create',
    body('description').isString(),
    body('price').isNumeric().toFloat(),
    body('quantity').isNumeric().toFloat(),
    body('proposer_fk').isUUID(),
    body('anounce_fk').isUUID(),
    resolver(proposalController.create))
export default proposalRoutes