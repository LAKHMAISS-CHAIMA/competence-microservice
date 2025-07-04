import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompetenceDetail from './CompetenceDetail';
import toast, { Toaster } from 'react-hot-toast';

function CompetenceList() {
  const [competences, setCompetences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompetenceId, setSelectedCompetenceId] = useState(null);

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const res = await axios.get('http://localhost:8000/competences');
        setCompetences(res.data);
      } catch (err) {
        setError('Erreur lors du chargement des compétences');
      } finally {
        setLoading(false);
      }
    };
    fetchCompetences();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette compétence ?')) return;
    try {
      await axios.delete(`http://localhost:8000/competences/${id}`);
      setCompetences(competences.filter(c => c._id !== id));
      toast.success('Compétence supprimée avec succès');
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Chargement...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!competences.length) return <div className="text-center py-8 text-gray-400">Aucune compétence trouvée.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-br from-violet-100 via-pink-50 to-rose-100 rounded-2xl p-4 sm:p-8 shadow-lg border border-violet-100">
      <Toaster position="top-center" />
      <h2 className="text-2xl md:text-3xl font-extrabold text-violet-700 mb-4 text-center">Liste des compétences</h2>
      <div className="flex flex-col gap-4">
        {competences.map((comp) => (
          <div key={comp._id || comp.code} className="bg-white/80 rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border border-violet-100">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 items-center mb-2">
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 font-mono text-sm">{comp.code}</span>
                <span className="font-semibold text-lg text-violet-900">{comp.nom}</span>
              </div>
              {comp.sousCompetence && comp.sousCompetence.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-1">
                  {comp.sousCompetence.map((sc, idx) => (
                    <li key={idx} className="px-2 py-0.5 rounded bg-fuchsia-100 text-fuchsia-700 text-xs font-mono">
                      {sc.nom}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                type="button"
                className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden tracking-tighter text-white bg-violet-700 rounded-md group text-sm md:text-base"
                title="Afficher les détails"
                onClick={() => setSelectedCompetenceId(comp._id)}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-fuchsia-200 rounded-full group-hover:w-40 group-hover:h-16"></span>
                <span className="relative flex items-center gap-2 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <span className="font-semibold">Détails</span>
                </span>
              </button>
              <button
                type="button"
                className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden tracking-tighter text-white bg-fuchsia-600 rounded-md group text-sm md:text-base"
                title="Modifier la compétence"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-fuchsia-200 rounded-full group-hover:w-40 group-hover:h-16"></span>
                <span className="relative flex items-center gap-2 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6" /></svg>
                  <span className="font-semibold">Modifier</span>
                </span>
              </button>
              <button
                type="button"
                className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden tracking-tighter text-white bg-rose-500 rounded-md group text-sm md:text-base"
                title="Supprimer la compétence"
                onClick={() => handleDelete(comp._id)}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-rose-200 rounded-full group-hover:w-40 group-hover:h-16"></span>
                <span className="relative flex items-center gap-2 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" /></svg>
                  <span className="font-semibold">Supprimer</span>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCompetenceId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-full max-w-2xl mx-auto">
            <CompetenceDetail competenceId={selectedCompetenceId} onClose={() => setSelectedCompetenceId(null)} />
            <button onClick={() => setSelectedCompetenceId(null)} className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-700 font-bold">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompetenceList;
