import mongoose from "mongoose";
import { compareStatutGlobal } from "../services/competenceService.js";

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



competenceSchema.pre("save", function (next) {
  if (!this.isModified('statutGlobal')) {
    this.statutGlobal = compareStatutGlobal(this.sousCompetence);
  }
  next();
});

export default mongoose.model("Competence", competenceSchema);
