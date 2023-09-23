import { Router } from "express";
import { ProposalController } from "../../controllers/proposal";
import { resolver } from "../../utils/routeAdapters";
import { body } from "express-validator";

const proposalRoutes = Router()

const proposalController = new ProposalController()
proposalRoutes.get('/list',
    body('skip').isInt().toInt(),
    body('take').isInt().toInt(),
    resolver(proposalController.list))


export default proposalRoutes