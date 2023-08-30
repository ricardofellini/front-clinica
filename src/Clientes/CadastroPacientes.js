import React, { useState } from 'react';
import axios from 'axios';
import { apiEndPoints } from '../Config/apiConfig';
import '../Clientes/Pacientes.css'

const CadastrarPaciente = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');

  const cadastrarPaciente = async (e) => {
    e.preventDefault();

    const dadosPaciente = {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf
    };

    try {

      await axios.post(apiEndPoints.pacientes, dadosPaciente);
      
      setNome('');
      setEmail('');
      setTelefone('');
      setCpf('');
    } catch (error) {
    
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className='pacientes'>
      <h1>Pacientes</h1>
      <h2>Cadastrar Paciente</h2>
      <form onSubmit={cadastrarPaciente}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar Paciente</button>
      </form>
    </div>
  );
};

export default CadastrarPaciente;
