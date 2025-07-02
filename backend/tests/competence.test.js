import { compareStatutGlobal } from "../services/competenceService.js";

describe("compareStatutGlobal", () => {
    it("devrait retourner 'validée' si la majorité est validée", () => {
        const sousCompetences = [
            { nom: "SC1", statut: "validée" },
            { nom: "SC2", statut: "validée" },
            { nom: "SC3", statut: "non validée" },
        ];
        const competence = compareStatutGlobal(sousCompetences);
        expect(competence).toBe("validée");
    })

    it("devrait retourner 'non Validée' si la majorité est non validée", () => {
        const sousCompetences = [
            { nom: "SC1", statut: "validée" },
            { nom: "SC2", statut: "non validée" },
            { nom: "SC3", statut: "non validée" },
        ];
        const competence = compareStatutGlobal(sousCompetences);
        expect(competence).toBe("non validée");
    })
})