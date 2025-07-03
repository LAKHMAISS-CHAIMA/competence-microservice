import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import competenceRoutes from '../routes/competenceRoutes.js';
import Competence from '../models/Competence.js';

const app = express();
app.use(express.json());
app.use('/api', competenceRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/competence', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Competence.deleteMany({});
});

test('GET /competences - Should return an empty array', async () => {
  const response = await request(app).get('/api/competences');
  expect(response.status).toBe(200);
  expect(response.body).toEqual([]);
});

test('POST /competences - Should create a new competence', async () => {
  const newCompetence = {
    code: 'C1',
    nom: 'Compétence 1',
    sousCompetence: [],
  };

  const response = await request(app).post('/api/competences').send(newCompetence);
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('_id');
  expect(response.body.code).toBe(newCompetence.code);
});

test('PUT /competences/:id/evaluation - Should update sous-compétences', async () => {
  const newCompetence = {
    code: 'C2',
    nom: 'Compétence 2',
    sousCompetence: [],
  };

  const createdCompetence = await Competence.create(newCompetence);

  const updatedSousCompetences = [
    { nom: 'SousComp1', statut: 'validée' },
    { nom: 'SousComp2', statut: 'non validée' },
  ];

  const response = await request(app)
    .put(`/api/competences/${createdCompetence._id}/evaluation`)
    .send({
      sousCompetence: updatedSousCompetences,
      sousCompetenceDecisive: 'SousComp1'
    });

  expect(response.status).toBe(200);
  expect(response.body.sousCompetence).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ nom: 'SousComp1', statut: 'validée' }),
      expect.objectContaining({ nom: 'SousComp2', statut: 'non validée' }),
    ])
  );
});

test('DELETE /competences/:id - Should delete a competence', async () => {
  const newCompetence = {
    code: 'C3',
    nom: 'Compétence 3',
    sousCompetence: [],
  };

  const createdCompetence = await Competence.create(newCompetence);

  const response = await request(app).delete(`/api/competences/${createdCompetence._id}`);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Compétence supprimée avec succès');

  const getResponse = await request(app).get(`/api/competences/${createdCompetence._id}`);
  expect(getResponse.status).toBe(404);
});