import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CriarMedico from './Medicos/CadastroMedicos';
import CadastrarPaciente from './Clientes/CadastroPacientes';
import Consultas from './Consultas/Consultas';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Início
            </Link>
          </li>
          <li>
            <Link to="/medicos" className="nav-link">
              Médicos
            </Link>
          </li>
          <li>
            <Link to="/pacientes" className="nav-link">
              Pacientes
            </Link>
          </li>
          <li>
            <Link to="/consultas" className="nav-link">
              Consultas
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicos" element={<CriarMedico />} />
        <Route path="/pacientes" element={<CadastrarPaciente />} />
        <Route path="/consultas" element={<Consultas />} />
      </Routes>
    </Router>
  );
}

export default App;
