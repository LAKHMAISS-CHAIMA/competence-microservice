import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  code: Yup.string().required('Le code est requis'),
  nom: Yup.string().required('Le nom est requis'),
  sousCompetence: Yup.array().of(
    Yup.object({
      nom: Yup.string().required('Le nom de la sous-compétence est requis')
    })
  ).min(1, 'Au moins une sous-compétence')
});

function CompetenceForm({ initialValues, editMode = false, onSuccess, onClose }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues ? {
      code: initialValues.code || "",
      nom: initialValues.nom || "",
      sousCompetence: initialValues.sousCompetence ? initialValues.sousCompetence.map(sc => ({ nom: sc.nom })) : [{ nom: "" }],
      _id: initialValues._id || undefined,
    } : {
      code: "",
      nom: "",
      sousCompetence: [{ nom: "" }],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let res;
        if (editMode && values._id) {
          console.log('Body envoyé PUT :', {
            code: values.code,
            nom: values.nom,
            sousCompetence: values.sousCompetence.map(sc => ({
              nom: sc.nom,
              statut: "non validée"
            })),
          });
          res = await axios.put(`http://localhost:8000/competences/${values._id}/evaluation`, {
            code: values.code,
            nom: values.nom,
            sousCompetence: values.sousCompetence.map(sc => ({
              nom: sc.nom,
              statut: "non validée"
            })),
          });
          toast.success("Compétence modifiée avec succès");
          if (onSuccess) onSuccess(res.data);
        } else {
          res = await axios.post("http://localhost:8000/competences", {
            code: values.code,
            nom: values.nom,
            sousCompetence: values.sousCompetence.map(sc => ({
              nom: sc.nom,
              statut: "non validée"
            })),
          });
          toast.success("Compétence créée avec succès");
        }
        resetForm();
        setEditingIndex(null);
        setEditingValue("");
        if (onClose) onClose();
      } catch (error) {
        console.error("Erreur pendant la création ou la modification de la compétence", error);
        toast.error('Erreur pendant la création ou la modification de la compétence');
      }
    },
  });

  return (
    <div className="bg-gradient-to-br from-violet-100 via-pink-50 to-rose-100 shadow-lg p-4 sm:p-8 max-w-2xl mx-auto rounded-2xl mt-8 border border-violet-100">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <Toaster position="top-center" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-violet-700 mb-2 text-center">{editMode ? 'Modifier la compétence' : 'Ajouter une compétence'}</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-violet-700 font-medium">Code</label>
              <input
                type="text"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white text-violet-700 font-mono ring-1 ring-violet-300 focus:ring-2 focus:ring-fuchsia-400 outline-none duration-300 placeholder:text-violet-400 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-fuchsia-200"
                placeholder="Code de la compétence"
                required
              />
              {formik.touched.code && formik.errors.code && (
                <span className="text-rose-500 text-sm mt-1">{formik.errors.code}</span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-violet-700 font-medium">Nom</label>
              <input
                type="text"
                name="nom"
                value={formik.values.nom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white text-violet-700 font-mono ring-1 ring-violet-300 focus:ring-2 focus:ring-fuchsia-400 outline-none duration-300 placeholder:text-violet-400 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-fuchsia-200"
                placeholder="Nom de la compétence"
                required
              />
              {formik.touched.nom && formik.errors.nom && (
                <span className="text-rose-500 text-sm mt-1">{formik.errors.nom}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-violet-700 font-medium">Sous-Compétences</label>
            <FieldArray
              name="sousCompetence"
              render={arrayHelpers => (
                <div className="flex flex-col gap-2">
                  {formik.values.sousCompetence.map((sousCompetence, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {editingIndex === index ? (
                        <>
                          <input
                            type="text"
                            value={editingValue}
                            onChange={e => setEditingValue(e.target.value)}
                            className="flex-1 bg-white text-violet-700 font-mono ring-1 ring-violet-300 focus:ring-2 focus:ring-fuchsia-400 outline-none duration-300 placeholder:text-violet-400 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-fuchsia-200"
                            required
                            autoFocus
                          />
                          <button type="button" onClick={() => {
                            arrayHelpers.replace(index, { nom: editingValue });
                            setEditingIndex(null);
                            setEditingValue("");
                          }} className="p-2 rounded-full hover:bg-green-100 group transition" title="Valider">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-green-600 group-hover:stroke-green-800 transition"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          </button>
                          <button type="button" onClick={() => {
                            setEditingIndex(null);
                            setEditingValue("");
                          }} className="p-2 rounded-full hover:bg-gray-100 group transition" title="Annuler">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-gray-500 group-hover:stroke-gray-700 transition"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 px-4 py-2 rounded-full bg-violet-50 text-violet-700 font-mono shadow-inner">{sousCompetence.nom || <span className="opacity-50">(Nom de la sous-compétence)</span>}</span>
                          <button type="button" onClick={() => {
                            setEditingIndex(index);
                            setEditingValue(sousCompetence.nom);
                          }} className="p-2 rounded-full hover:bg-fuchsia-100 group transition" title="Éditer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-fuchsia-500 group-hover:stroke-fuchsia-700 transition"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6" /></svg>
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        className="p-2 rounded-full hover:bg-rose-100 group transition disabled:opacity-50"
                        disabled={formik.values.sousCompetence.length === 1}
                        title="Supprimer cette sous-compétence"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-rose-500 group-hover:stroke-rose-700 transition">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                        </svg>
                      </button>
                      {formik.touched.sousCompetence && formik.touched.sousCompetence[index] && formik.errors.sousCompetence && formik.errors.sousCompetence[index] && formik.errors.sousCompetence[index].nom && (
                        <span className="text-rose-500 text-sm ml-2">{formik.errors.sousCompetence[index].nom}</span>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ nom: "" })}
                    className="flex items-center gap-2 self-center mt-2 group cursor-pointer outline-none"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-fuchsia-400 shadow-md group-hover:bg-fuchsia-600 transition duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28px"
                        height="28px"
                        viewBox="0 0 24 24"
                        className="stroke-white fill-none group-hover:scale-110 transition duration-300"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        <path d="M8 12H16" strokeWidth="1.5"></path>
                        <path d="M12 16V8" strokeWidth="1.5"></path>
                        </svg>
                    </span>
                    <span className="text-fuchsia-700 font-semibold group-hover:text-fuchsia-900 transition duration-300">Ajouter une sous-compétence</span>
          </button>
                  {typeof formik.errors.sousCompetence === 'string' && (
                    <span className="text-rose-500 text-sm mt-1">{formik.errors.sousCompetence}</span>
                  )}
                </div>
              )}
            />
        </div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center w-full py-2.5 overflow-hidden tracking-tighter text-white bg-violet-700 rounded-md group mt-4 shadow-lg hover:bg-fuchsia-600 transition text-lg font-bold"
          >
            <span
              className="absolute w-0 h-0 transition-all duration-500 ease-out bg-fuchsia-400 rounded-full group-hover:w-full group-hover:h-56"
            ></span>
            <span className="relative text-base font-semibold">{editMode ? 'Enregistrer les modifications' : 'Ajouter la compétence'}</span>
          </button>
        </form>
      </FormikProvider>
    </div>
  );
}

export default CompetenceForm;