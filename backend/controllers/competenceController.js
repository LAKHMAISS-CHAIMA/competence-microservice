import Competence from "../models/Competence.js";

export const getAllCompetences = async (req, res) => {
  try {
    const competences = await Competence.find();
    res.status(200).json(competences);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des compétences" });
  }
};

export const createCompetence = async (req, res) => {
  try {
    const newCompetence = new Competence(req.body);
    await newCompetence.save();
    res.status(201).json(newCompetence);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la création de la compétence" });
  }
};

export const updateSousCompetences = async (req, res) => {
  try {
    console.log('Body reçu pour update :', req.body);
    const { id } = req.params;
    const { sousCompetence, sousCompetenceDecisive, code, nom } = req.body;

    const competence = await Competence.findById(id);
    if (!competence) {
      return res.status(404).json({ error: "Compétence non trouvée" });
    }

    if (code) competence.code = code;
    if (nom) competence.nom = nom;
    competence.sousCompetence = sousCompetence;
    const { compareStatutGlobal } = await import("../services/competenceService.js");
    competence.statutGlobal = compareStatutGlobal(sousCompetence, sousCompetenceDecisive);
    await competence.save();

    res.status(200).json(competence);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour des sous-compétences" });
  }
};

export const deleteCompetence = async (req, res) => {
  try {
    const { id } = req.params;
    await Competence.findByIdAndDelete(id);
    res.status(200).json({ message: "Compétence supprimée avec succès" });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la suppression de la compétence" });
  }
};

export const getCompetenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const competence = await Competence.findById(id);
    if (!competence) {
      return res.status(404).json({ error: "Compétence non trouvée" });
    }
    res.status(200).json(competence);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la récupération de la compétence" });
  }
};
