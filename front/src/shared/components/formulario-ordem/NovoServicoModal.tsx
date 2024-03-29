import React, { useState, useRef } from 'react';
import { OrdemService, IOrdemServiceData } from '../../services/api/Ordem/OrdemService';
import { EquipeService, IDetalheEquipe, IDetalhePessoa, IDetalheSetor, PessoasService, SetorService } from '../../services/api';
import { ILogWithTimestamp } from './OrdemForms';
import { LogService } from '../../services/api/Log/LogService';

const NovoServicoPopup = ({ ordemData, onClose }: { ordemData: any; onClose: () => void }) => {
  const [novoServico, setNovoServico] = useState('');
  const [novoServicoDescricao, setNovoServicoDescricao] = useState('');
  const [novoServicoStatus, setNovoServicoStatus] = useState('Pendente');
  const servicoInputRef = useRef<HTMLInputElement | null>(null);
  const statusInputRef = useRef<HTMLInputElement | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const [userId, setUserId] = useState('');
  const [setorName, setSetorName] = useState<string | null>(null);
  const [equipeName, setEquipeName] = useState<string | null>(null);

  const userIdFromStorage = localStorage.getItem('APP_ACCESS_USER_ID');
  const setorFromLocalStorage = localStorage.getItem('APP_ACCESS_SETOR');
  const equipeIdFromStorage = localStorage.getItem('APP_ACCESS_EQUIPE')


  if (userIdFromStorage) {
    const userId = JSON.parse(userIdFromStorage);

    PessoasService.getById(userId).then((soliciante: IDetalhePessoa | Error) => {
      if (!(soliciante instanceof Error)) {
      
        setUserName(soliciante.name);
        setUserId(soliciante._id);
      } else {
        console.error("Erro ao buscar detalhes do setor:", soliciante.message);
      }
    });
  }

  if (setorFromLocalStorage) {
    const setorId = JSON.parse(setorFromLocalStorage);

    SetorService.getById(setorId).then((setor: IDetalheSetor | Error) => {
      if (!(setor instanceof Error)) {
        setSetorName(setor.name);
      } else {
        console.error("Erro ao buscar detalhes do setor:", setor.message);
      }
    });
  }

  if (equipeIdFromStorage) {
    const equipeID = JSON.parse(equipeIdFromStorage);

    EquipeService.getById(equipeID).then((equipe: IDetalheEquipe | Error) => {
      if (!(equipe instanceof Error)) {
        setEquipeName(equipe.equipeName);
      } else {
        console.error("Erro ao buscar detalhes do equipe:", equipe.message);
      }
    });
  }

  const adicionarNovoServicoHandler = async () => {
    try {
      const idOrdem = ordemData?._id || '';
  
      const novoServiceData = {
        name: novoServico,
        description: novoServicoDescricao,
        status: novoServicoStatus,
        solicitante: userName,
      };
  
      const servicesAtuais = ordemData?.services || [];
      const servicesAtualizados = [...servicesAtuais, novoServiceData];
  
      const dadosAtualizados: Partial<IOrdemServiceData> = {
        services: servicesAtualizados,
      };
  
      const resposta = await OrdemService.updateById(
        idOrdem,
        dadosAtualizados as IOrdemServiceData
      );
  
      alert('Novo serviço cadastrado com sucesso');
  
      // Criar log após adicionar novo serviço
      const logData: Omit<ILogWithTimestamp, '_id'> = {
        timestamp: new Date(),
        userId: userId || '',
        userName: userName || '',
        userEquipe: equipeName || '',
        userSetor: setorName || '',
        action: 'create',
        entity: 'Ordem',
        entityId: ordemData._id, 
        details: `Novo serviço criado na ordem: ${ordemData.ordemId} - Nome: ${novoServico}`, 
      };
  
      await LogService.createLog(logData);
      console.log('Log de adicionar novo serviço criado com sucesso!');
  
      setNovoServico('');
      setNovoServicoDescricao('');
      setNovoServicoStatus('');
      ordemData((prevData: any) => {
        if (prevData) {
          return { ...prevData, services: servicesAtualizados };
        }
        return prevData;
      });
    } catch (error) {
      console.error('Erro ao adicionar o comentário:', error);
    }
  };
  

  return (
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h2>Adicionar Novo Serviço</h2>
      <form>
        <label htmlFor="servico">Serviço:</label>
        <input
          className='input1'
          id="servico"
          type="text"
          value={novoServico}
          onChange={(e) => setNovoServico(e.target.value)}
          ref={servicoInputRef}
        />
        <label htmlFor="descricao">Descrição do Serviço:</label>
        <input
          className='input1'
          id="descricao"
          type="text"
          value={novoServicoDescricao}
          onChange={(e) => setNovoServicoDescricao(e.target.value)}
          ref={servicoInputRef}
        />
        <label htmlFor="status">Status do Serviço:</label>
        <input
          className='input1'
          id="status"
          type="text"
          value={novoServicoStatus}
          onChange={(e) => setNovoServicoStatus(e.target.value)}
          ref={statusInputRef}
          disabled
        />
          <input
          className='input1'
          id="status"
          type="text"
          value={novoServicoStatus}
          onChange={(e) => setNovoServicoStatus(e.target.value)}
          ref={statusInputRef}
          disabled
        />
        <button 
          type="button"
          className='botao-detalhes-os'
          onClick={adicionarNovoServicoHandler}
        >
          Adicionar Serviço
        </button>
      </form>
    </div>
  );
};

export default NovoServicoPopup;
