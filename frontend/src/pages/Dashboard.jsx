import React from 'react';
import BlurText from '../components/BlurText';
import { Link } from 'react-router-dom';

const handleAnimationComplete = () => {
};

function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-200 via-pink-100 to-rose-200 relative overflow-hidden">
      <svg className="absolute left-0 top-0 w-1/3 opacity-30 -z-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c084fc" d="M44.8,-67.2C56.6,-59.2,62.7,-42.2,68.2,-25.7C73.7,-9.2,78.6,6.8,74.2,20.2C69.8,33.6,56.1,44.4,41.2,54.2C26.3,64,10.1,72.8,-6.7,76.1C-23.5,79.4,-41,77.2,-54.2,66.7C-67.4,56.2,-76.3,37.4,-77.2,19.2C-78.1,1,-71.1,-16.6,-61.2,-29.7C-51.3,-42.8,-38.5,-51.4,-25.1,-59.1C-11.7,-66.8,2.3,-73.6,17.2,-74.2C32.1,-74.8,48.1,-69.2,44.8,-67.2Z" transform="translate(100 100)" />
      </svg>
      <BlurText
        text="Bienvenue sur la plateforme de gestion des compétences !"
        delay={100}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-4xl md:text-5xl font-extrabold text-fuchsia-700 text-center mb-4 ml-15 drop-shadow-lg"
      />
      <p className="text-lg md:text-2xl text-fuchsia-900 text-center mb-8 max-w-2xl">Gérez, ajoutez et suivez vos compétences et sous-compétences facilement, avec une interface moderne et intuitive.</p>
      <div className="flex gap-6 mt-2">
        <Link to="/ajouter" className="px-8 py-3 rounded-full bg-fuchsia-600 text-white font-bold text-lg shadow-lg hover:bg-fuchsia-700 transition">Ajouter une compétence</Link>
        <Link to="/liste" className="px-8 py-3 rounded-full bg-white text-fuchsia-700 font-bold text-lg shadow-lg border-2 border-fuchsia-300 hover:bg-fuchsia-50 transition">Voir la liste</Link>
      </div>
      <svg className="absolute right-0 bottom-0 w-1/4 opacity-20 -z-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f472b6" d="M44.8,-67.2C56.6,-59.2,62.7,-42.2,68.2,-25.7C73.7,-9.2,78.6,6.8,74.2,20.2C69.8,33.6,56.1,44.4,41.2,54.2C26.3,64,10.1,72.8,-6.7,76.1C-23.5,79.4,-41,77.2,-54.2,66.7C-67.4,56.2,-76.3,37.4,-77.2,19.2C-78.1,1,-71.1,-16.6,-61.2,-29.7C-51.3,-42.8,-38.5,-51.4,-25.1,-59.1C-11.7,-66.8,2.3,-73.6,17.2,-74.2C32.1,-74.8,48.1,-69.2,44.8,-67.2Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
}

export default Dashboard;
