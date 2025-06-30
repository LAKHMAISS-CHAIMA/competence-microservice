const express = require('express');
const mongoose = require('mongoose');

const app = express();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/competence';

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connecté avec succès à MongoDB via Mongoose !');
    } catch (error) {
        console.error('Erreur de conexion Mongoose:', error);
        process.exit(1);
    }
}

app.listen(8000, () => {
    console.log("Server listening on port 8000")
});

