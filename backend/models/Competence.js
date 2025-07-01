import mongoose from "mongoose";

const competenceSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    sousCompetence: [{
        nom: { type: String, required: true },

        statut: {
            type: String,
            enum: ["validée", "non validée"],
            required: true,
        },
    },
    ],
});

module.exports = mongoose.model("Competence", competenceSchema); 