import { Box, Button, Paper, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import { PessoasService, IDetalhePessoa } from "../../services/api/users/PessoasService";

export const UserForms = () => {
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [setor, setSetor] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [turno, setTurno] = useState('');
  const [funcao, setFuncao] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData: Omit<IDetalhePessoa, 'id'> = {
      name,
      matricula,
      setor,
      supervisor,
      turno,
      funcao,
    };

    try {
      const userId = await PessoasService.create(userData);
      console.log(`User created with ID: ${userId}`);
      event.currentTarget?.reset();
    } catch (error) { 
      console.error("Erro ao criar usuário", (error as Error).message);
    }
  };
  
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(60)}
      marginX={1}
      padding={1}
      paddingX={2}
      display={"flex"}
      gap={1}
      alignItems={"center"}
      component={Paper}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="nome"
          placeholder="Nome do usuário"
          onChange={(event) => setName(event.target.value)}
          required
        />

        <TextField
          type="text"
          name="matricula"
          placeholder="Matricula do usuário"
          onChange={(event) => setMatricula(event.target.value)}
          required
        />

        <TextField
          type="text"
          name="setor"
          placeholder="Setor do usuário"
          onChange={(event) => setSetor(event.target.value)}
          required
        />

        <TextField
          type="text"
          name="supervisor"
          placeholder="Supervisor do usuário"
          onChange={(event) => setSupervisor(event.target.value)}
          required
        />

        <TextField
          type="text"
          name="turno"
          placeholder="Turno do usuário"
          onChange={(event) => setTurno(event.target.value)}
          required
        />

<TextField
          type="text"
          name="funcao"
          placeholder="Função do usuário"
          onChange={(event) => setFuncao(event.target.value)}
          required
        />

        <Button type="submit">Cadastrar usuário</Button>
      </form>
    </Box>
  );
};
