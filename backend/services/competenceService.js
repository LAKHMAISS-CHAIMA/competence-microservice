export const compareStatutGlobal = (sousCompetence = [], sousCompetenceDecisive = null) => {
  const { validée, nonValidée } = sousCompetence.reduce(
    (acc, sc) => {
      if (sc.statut === "validée") {
        acc.validée++;
      } else {
        acc.nonValidée++;
      }
      return acc;
    },
    { validée: 0, nonValidée: 0 }
  );

  if (validée === nonValidée && sousCompetenceDecisive) {
    const decisive = sousCompetence.find(sc => sc.nom === sousCompetenceDecisive || sc._id == sousCompetenceDecisive);
    if (decisive) {
      if (decisive.statut === "validée") return "validée";
      else return "non validée";
    }
  }

  return validée > nonValidée ? "validée" : "non validée";
};
