import express from 'express';
import mongoose from 'mongoose';
import competenceRoutes from "./routes/competenceRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", competenceRoutes);

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

connectDB();

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

