import { Router } from "express";
import { getAllCompetences, createCompetence, updateSousCompetences, deleteCompetence } from "../controllers/competenceController.js";

const router = Router();

router.get("/competences", getAllCompetences);
router.post("/competences", createCompetence);
router.put("/competences/:id/evaluation", updateSousCompetences);
router.delete("/competences/:id", deleteCompetence);

export default router;
