import mongoose from "mongoose";

const competenceSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  sousCompetence: [
    {
      nom: { type: String, required: true, trim: true },
      statut: {
        type: String,
        enum: ["validée", "non validée"],
        required: true,
      },
    },
  ],
  statutGlobal: {
    type: String,
    enum: ["validée", "non validée"],
    default: "non validée",
  },
});

competenceSchema.methods.compareStatutGlobal = function () {
  const total = this.sousCompetence.length;
  const validees = this.sousCompetence.filter(
    (sc) => sc.statut === "validée"
  ).length;

const nonValidees = total - validees;
return validees >= nonValidees ? "validée" : "non validée";
};

competenceSchema.pre("save", function (next) {
  this.statutGlobal = this.compareStatutGlobal(); 
  next();
});

export default mongoose.model("Competence", competenceSchema);
