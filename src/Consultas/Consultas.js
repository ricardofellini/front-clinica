import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoints } from '../Config/apiConfig';
import '../Consultas/Consultas.css';

const CriarConsulta = () => {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [consultas, setConsultas] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    fetchPacientes();
    fetchMedicos();
    fetchConsultas();
  }, []);

  const fetchPacientes = async () => {
    const response = await axios.get(apiEndPoints.pacientes);
    setPacientes(response.data.content);
  };

  const fetchMedicos = async () => {
    const response = await axios.get(apiEndPoints.medicos);
    setMedicos(response.data.content);
  };

  const fetchConsultas = async () => {
    const response = await  axios.get(apiEndPoints.consultas);
    setConsultas(response.data.content);
  }

  const handleConsulta = async (e) => {
    e.preventDefault();

    const fetchPacientesPromise = fetchPacientes();
    const fetchMedicosPromise = fetchMedicos();

    await Promise.all([fetchPacientesPromise, fetchMedicosPromise]);

    const selectedPaciente = pacientes.find((paciente) => paciente.id === parseInt(pacienteSelecionado));
    const selectedMedico = medicos.find((medico) => medico.id === parseInt(medicoSelecionado));

    const dadosConsulta = {
      medicoId: medicoSelecionado,
      pacienteId: pacienteSelecionado,
      medicoNome: selectedMedico ? selectedMedico.nome : '',
      pacienteNome: selectedPaciente ? selectedPaciente.nome : '',
      dataConsulta: dataConsulta
    };

    await axios.post(apiEndPoints.consultas, dadosConsulta);

    setMedicoSelecionado('');
    setPacienteSelecionado('');
    setDataConsulta('');
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible); 
  };

  return (
    <div className='consultas'>
      <h2>Agendar uma Consulta</h2>
      <form onSubmit={handleConsulta}>
        <div>
          <label>Selecione o Cliente:</label>
          <select
            value={pacienteSelecionado}
            onChange={(e) => setPacienteSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione o Cliente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.id + '-' + paciente.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Selecione o Médico:</label>
          <select
            value={medicoSelecionado}
            onChange={(e) => setMedicoSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione o Médico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.id + '-' + medico.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Selecione a Data da Consulta:</label>
          <input
            type="date"
            value={dataConsulta}
            onChange={(e) => setDataConsulta(e.target.value)}
            required
          />
        </div>
        <button type="submit">AGENDAR CONSULTA</button>
      </form>

      <h2>Listar Consultas</h2>
      <button onClick={toggleListVisibility}>
      {isListVisible ? 'Esconder Listagem' : 'LISTAR CONSULTAS'}
      </button>
      {isListVisible && (
        <ul>
        {consultas.map((consulta) => (
          <li key={consulta.id}>
          {consulta.id + '-' + 'Paciente: ' + consulta.nomePaciente + ' Médico: ' + consulta.nomeMedico + ' Data: ' + consulta.dataConsulta}
          </li>
        ))}
        </ul>
      )}
    </div>
  );
};

export default CriarConsulta;
