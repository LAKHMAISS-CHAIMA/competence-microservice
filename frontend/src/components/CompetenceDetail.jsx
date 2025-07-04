import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function compareStatutGlobal(sousCompetence = [], sousCompetenceDecisive = null) {
    const { validée, nonValidée } = sousCompetence.reduce(
        (acc, sc) => {
            if (sc.statut === "validée") acc.validée++;
            else acc.nonValidée++;
            return acc;
        },
        { validée: 0, nonValidée: 0 }
    );
    if (validée === nonValidée && sousCompetenceDecisive) {
        const decisive = sousCompetence.find(sc => sc.nom === sousCompetenceDecisive || sc._id === sousCompetenceDecisive);
        if (decisive) {
            if (decisive.statut === "validée") return "validée";
            else return "non validée";
        }
    }
    return validée > nonValidée ? "validée" : "non validée";
}

function CompetenceDetail({ competenceId, onClose }) {
    const [competence, setCompetence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sousCompetences, setSousCompetences] = useState([]);
    const [decisive, setDecisive] = useState(null);

    useEffect(() => {
        const fetchCompetence = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/competences/${competenceId}`);
                setCompetence(res.data);
                setSousCompetences(res.data.sousCompetence.map(sc => ({ ...sc })));
                setDecisive(res.data.sousCompetenceDecisive || null);
            } catch (err) {
                setError('Erreur lors du chargement de la compétence');
            } finally {
                setLoading(false);
            }
        };
        fetchCompetence();
    }, [competenceId]);

    const updateSousCompetences = async (newSousCompetences, newDecisive) => {
        try {
            await axios.put(`http://localhost:8000/competences/${competenceId}/evaluation`, {
                sousCompetence: newSousCompetences,
                sousCompetenceDecisive: newDecisive,
              });
            toast.success('Mise à jour enregistrée !');
        } catch (err) {
            toast.error("Erreur lors de la sauvegarde !");
        }
    };

    const handleStatut = (idx, statut) => {
        const updated = sousCompetences.map((sc, i) => i === idx ? { ...sc, statut } : sc);
        setSousCompetences(updated);
        updateSousCompetences(updated, decisive);
    };

    const handleDecisive = (idx) => {
        setDecisive(sousCompetences[idx].nom);
        updateSousCompetences(sousCompetences, sousCompetences[idx].nom);
    };

    if (loading) return <div className="text-center py-8 text-gray-500">Chargement...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!competence) return null;

    const statutGlobal = compareStatutGlobal(sousCompetences, decisive);
    const nbValidees = sousCompetences.filter(sc => sc.statut === 'validée').length;
    const nbNonValidees = sousCompetences.filter(sc => sc.statut === 'non validée').length;
    const egalite = nbValidees === nbNonValidees && sousCompetences.length > 0;

    return (
        <div className="bg-gradient-to-br from-violet-100 via-pink-50 to-rose-100 rounded-xl shadow-lg p-4 sm:p-8 max-w-xl mx-auto mt-8 border border-violet-100">
            <h2 className="text-2xl md:text-3xl font-extrabold text-violet-700 mb-4 text-center">Détail de la compétence</h2>
            <div className="mb-4 flex flex-col gap-2">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 font-mono text-sm">Code : {competence.code}</span>
                    <span className="font-semibold text-lg text-violet-900">Nom : {competence.nom}</span>
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-gray-700">Sous-compétences : <b>{sousCompetences.length}</b></span>
                    <span className="text-gray-700">Validées : <b>{nbValidees}</b></span>
                    <span className="text-gray-700">Non validées : <b>{nbNonValidees}</b></span>
                    <span className={`px-3 py-1 rounded-full text-white font-semibold ${statutGlobal === 'validée' ? 'bg-green-500' : 'bg-rose-500'}`}>Résultat : {statutGlobal}</span>
                </div>
            </div>
            <ul className="flex flex-col gap-3">
                {sousCompetences.map((sc, idx) => (
                    <li key={sc._id || idx} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white/80 rounded-lg p-3 border border-violet-100">
                        <span className="flex-1 font-mono text-violet-700">{sc.nom}</span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleStatut(idx, 'validée')}
                                className={`relative inline-flex items-center justify-center px-3 py-1 overflow-hidden tracking-tighter text-white rounded-md group text-sm md:text-base ${sc.statut === 'validée' ? 'bg-green-600' : 'bg-violet-300'}`}
                                title="Valider"
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-200 rounded-full group-hover:w-32 group-hover:h-10"></span>
                                <span className="relative z-10 font-semibold">Validée</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatut(idx, 'non validée')}
                                className={`relative inline-flex items-center justify-center px-3 py-1 overflow-hidden tracking-tighter text-white rounded-md group text-sm md:text-base ${sc.statut === 'non validée' ? 'bg-rose-500' : 'bg-violet-300'}`}
                                title="Non validée"
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-rose-200 rounded-full group-hover:w-32 group-hover:h-10"></span>
                                <span className="relative z-10 font-semibold">Non validée</span>
                            </button>
                            {egalite && (
                                <button
                                    type="button"
                                    onClick={() => handleDecisive(idx)}
                                    className={`relative inline-flex items-center justify-center px-3 py-1 overflow-hidden tracking-tighter text-white rounded-md group text-sm md:text-base ${decisive === sc.nom ? 'bg-fuchsia-600' : 'bg-violet-300'}`}
                                    title="Choisir comme décisive"
                                >
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-fuchsia-200 rounded-full group-hover:w-32 group-hover:h-10"></span>
                                    <span className="relative z-10 font-semibold">Plus important</span>
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-end mt-6">
                <button onClick={onClose} className="px-4 py-2 rounded bg-violet-200 hover:bg-violet-300 text-violet-900 font-semibold transition">Fermer</button>
            </div>
        </div>
    );
}

export default CompetenceDetail; 