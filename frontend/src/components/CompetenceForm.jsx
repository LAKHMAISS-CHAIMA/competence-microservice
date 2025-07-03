import React, { useState } from 'react';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function CompetenceForm() {
  const [code, setCode] = useState("");
  const [nom, setNom] = useState("");
  const [sousCompetences, setSousCompetences] = useState([{ nom: "" }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:27017/competence", {
        code,
        nom,
        sousCompetences,
      });
      toast.success("Compétence créée avec succès");
      setCode("");
      setNom("");
      setSousCompetences([{ nom: "" }]);
    } catch (error) {
      console.error("Erreur pendant la création de la compétence", error);
      toast.error('Erreur pendant la création de la compétence');
    }
  };

  const handleSousCompetenceChange = (index, value) => {
    const newSousCompetences = sousCompetences.map((sousCompetence, i) =>
      i === index ? { nom: value } : sousCompetence
    );
    setSousCompetences(newSousCompetences);
  };

  const removeSousCompetence = (index) => {
    if (sousCompetences.length === 1) return; 
    setSousCompetences(sousCompetences.filter((_, i) => i !== index));
  };

  const addSousCompetence = () => {
    setSousCompetences([...sousCompetences, { nom: "" }]);
  };

  return (
    <div className="bg-gray-200 shadow-lg p-6 sm:p-8 max-w-2xl mx-auto rounded-2xl mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Toaster position="top-center" />
        <h2 className="text-2xl font-bold text-orange-600 mb-2 text-center">Créer une compétence</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-indigo-600 font-medium">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-zinc-200 text-indigo-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-orange-600 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-orange-400" placeholder="Code de la compétence"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-indigo-600 font-medium">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="bg-zinc-200 text-indigo-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-orange-600 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-orange-400" placeholder="Nom de la compétence"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-indigo-600 font-medium">Sous-Compétences</label>
          <div className="flex flex-col gap-2">
            {sousCompetences.map((sousCompetence, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={sousCompetence.nom}
                  onChange={(e) => handleSousCompetenceChange(index, e.target.value)}
                  placeholder="Nom de la sous-compétence"
                  className="flex-1 bg-zinc-200 text-indigo-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-orange-600 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-orange-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSousCompetence(index)}
                  className="p-2 rounded-full hover:bg-red-100 group transition disabled:opacity-50"
                  disabled={sousCompetences.length === 1}
                  title="Supprimer cette sous-compétence"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-red-500 group-hover:stroke-red-700 transition">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSousCompetence}
            className="flex items-center gap-2 self-center mt-2 group cursor-pointer outline-none"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 shadow-md group-hover:bg-purple-700 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                className="stroke-white fill-none group-hover:scale-110 transition duration-300"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  strokeWidth="1.5"
                ></path>
                <path d="M8 12H16" strokeWidth="1.5"></path>
                <path d="M12 16V8" strokeWidth="1.5"></path>
              </svg>
            </span>
            <span className="text-purple-700 font-semibold group-hover:text-purple-900 transition duration-300">Ajouter une sous-compétence</span>
          </button>
        </div>
        <button
          class="relative inline-flex items-center justify-center px-3 py-2 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group min-w-[60px] self-center"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-56 group-hover:h-56"
          ></span>
          <span class="absolute bottom-0 left-0 h-full -ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-auto h-full opacity-100 object-stretch"
              viewBox="0 0 487 487"
            >
              <path
                fill-opacity=".1"
                fill-rule="nonzero"
                fill="#FFF"
                d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
              ></path>
            </svg>
          </span>
          <span class="absolute top-0 right-0 w-12 h-full -mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="object-cover w-full h-full"
              viewBox="0 0 487 487"
            >
              <path
                fill-opacity=".1"
                fill-rule="nonzero"
                fill="#FFF"
                d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
              ></path>
            </svg>
          </span>
          <span
            class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"
          ></span>
          <span class="relative text-base font-semibold">Ajouter</span>
        </button>
      </form>
    </div>
  );
}

export default CompetenceForm;