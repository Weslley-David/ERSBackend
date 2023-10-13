import { Router } from "express";
import { ProposalController } from "../../controllers/proposal";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from "express-validator";
import TokenMiddleware from "../../middlewares/tokenmiddleware";

const proposalRoutes = Router()

const proposalController = new ProposalController()
proposalRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(proposalController.list))

proposalRoutes.get('/myproposals',
    TokenMiddleware,
    resolver(proposalController.myproposals))

proposalRoutes.get('/proposalsforme',
    TokenMiddleware,
    resolver(proposalController.proposalsForMe))

proposalRoutes.get('/proposalsbyanounceid',
    query('id').isUUID(),
    resolver(proposalController.proposalsByAnounceId))

proposalRoutes.patch('/updateacepted',
    body('id').isUUID(),
    body('acepted').isBoolean(),
    TokenMiddleware,
    resolver(proposalController.updateProposalAcepted))

proposalRoutes.patch('/markasunreceived',
    body('id').isUUID(),
    TokenMiddleware,
    resolver(proposalController.markAsUnreceived))

proposalRoutes.post('/create',
    body('description').isString(),
    body('price').isNumeric().toFloat(),
    body('quantity').isNumeric().toFloat(),
    body('proposer_fk').isUUID(),
    body('anounce_fk').isUUID(),
    resolver(proposalController.create))
export default proposalRoutes