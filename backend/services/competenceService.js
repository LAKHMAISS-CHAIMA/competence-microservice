export const compareStatutGlobal = (sousCompetence = []) => {
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

  return validée >= nonValidée ? "validée" : "non validée";
};
