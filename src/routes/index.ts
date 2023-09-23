import { Router } from "express";
import authRoutes from "./modules/auth";
import residueRoutes from "./modules/residue";
import profileRoutes from "./modules/profile";
import anounceRoutes from "./modules/anounce";
import proposalRoutes from "./modules/proposal";

const router = Router()

router.use('/auth', authRoutes)
router.use('/residue', residueRoutes)
router.use('/profile', profileRoutes)
router.use('/anounce', anounceRoutes)
router.use('/proposal', proposalRoutes)

export default router