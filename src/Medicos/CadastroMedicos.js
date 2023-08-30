import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoints } from '../Config/apiConfig';
import '../Medicos/Medicos.css';
import medico from '../icons/medico.png'
import listarMedicos from '../icons/listaMedicos.png'

const CriarMedico = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [medicos, setMedicos]= useState([]);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    fetchMedicos();
  }, []);

  const criarMedicos = async (e) => {

    e.preventDefault();
    
    const dadosMedico = {
      nome: nome,
      email: email,
      crm: crm,
      especialidade: especialidade,
      telefone: telefone
    };

    try {
      
      await axios.post(apiEndPoints.medicos, dadosMedico);
      
      setNome('');
      setEmail('');
      setCrm('');
      setEspecialidade('');
      setTelefone('');

    } catch (error) {
      
      console.error('Error submitting data:', error);
    }
  };

  const fetchMedicos = async () => {
  
    const response = await axios.get(apiEndPoints.medicos);
    setMedicos(response.data.content);
  
  }

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible); 
  };

  return (
  
    <div className='medicos'>
    <h1>Médicos</h1>
      <h2>Cadastrar Médico</h2>
      <form onSubmit={criarMedicos}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CRM:</label>
          <input
            type="text"
            id="crm"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Especialidade:</label>
          <input
            type="text"
            id="especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cadastrar-medico-button">
            <img src={medico} alt="Medico Icon" className="icon" /> CADASTRAR MÉDICO
        </button>
      </form>

      <h2>Médicos Cadastrados</h2>
      <button onClick={toggleListVisibility}>
      <img src={listarMedicos} alt='Lista Medicos Icon' className='icon'/>
        {isListVisible ? 'Esconder Listagem' : 'LISTAR MÉDICOS'}
      </button>
      {isListVisible && (
        <ul>
          {medicos.map((medico) => (
            <li key={medico.id}>
              {medico.id + '-' + medico.nome + '-' + medico.especialidade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default CriarMedico;
