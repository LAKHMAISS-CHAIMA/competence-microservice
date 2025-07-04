import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CompetenceForm from './components/CompetenceForm';
import CompetenceList from './components/CompetenceList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ajouter" element={<CompetenceForm />} />
        <Route path="/liste" element={<CompetenceList />} />
      </Routes>
    </Router>
  );
}

export default App;
