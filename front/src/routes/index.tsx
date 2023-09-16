
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';

import {
  Dashboard, Ordem, PessoasListagem, Users, OrdemListagem
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: "/pagina-inicial",
        label: 'Página inicial',
      },

      {
        icon: 'people',
        path: "/user",
        label: 'Usuário',
      },

      {
        icon: 'article',
        path: "/ordem",
        label: 'Formulário de serviço',
      },

      {
        icon: 'assignment',
        path: "/ordemListagem",
        label: 'Listagem de serviços',
      },

      {
        icon: 'assignment',
        path: "/usersListagem",
        label: 'Listagem de Usuarios',
      },
      
    ]);
  }, []);

  return (
    <Routes>
    <Route path="/pagina-inicial" element={<Dashboard />} />
    <Route path="/user" element={<Users />} />
    <Route path="/ordem" element={<Ordem />} />
    <Route path="/ordemListagem" element={<OrdemListagem />} />
    <Route path="/usersListagem" element={<PessoasListagem />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};