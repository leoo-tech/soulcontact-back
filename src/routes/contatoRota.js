import { Router } from "express";
import { contatoValidation } from "../utils/validations.js";
import { Contato } from "../models/contatoModelo.js";

export const contatoRouter = Router();

// criação de contato
contatoRouter.post('/contatos', async (req, res) => {
  // error é um objeto que contém o erro de validação, value é o objeto validado (req.body)
  const { error, value } = contatoValidation.validate(req.body, { abortEarly: false });
  // o abortEarly false faz com que o Joi retorne todos os erros de uma vez, e não apenas o primeiro
  if (error) {
    // http 400 - bad request - a requisição não pode ser processada por conta de um erro de sintaxe ou dados invalidos
    res.status(400).json({ message: 'dados inválidos', error: error.details[0].message });
    return;
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = req.body;
  try {
    const novoContato = new Contato({ nome, sobrenome, email, telefone, observacoes, favorito });
    await novoContato.save();
    res.json({ message: 'Contato criado com sucesso', contato: novoContato });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar contato', errorMessage: error.message });
  }
});

// listagem geral
contatoRouter.get('/contatos', async (req, res) => {
  const lista = await Contato.find({}).select('-__v -favorito');
  res.json(lista);
});

// listagem por id
contatoRouter.get('/contatos/:id', async (req, res) => {
  const contato = await Contato.findById(req.params.id).select('-__v -favorito');
  if (!contato) {
    return res.status(404).json({ message: 'Contato não encontrado' });
  } else {
    res.json(contato);
  }
});

// atualização de contato
contatoRouter.put('/contatos/:id', async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({ message: 'dados inválidos', error: error.details[0].message });
    return;
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = req.body;
  const { id } = req.params;
  try {
    // procura pelo contato indicado pelo ID, se existir, e atualiza
    const contato = await Contato.findByIdAndUpdate(id, { nome, sobrenome, email, telefone, observacoes, favorito });
    if (!contato) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    } else {
      res.json({ message: 'Contato atualizado com sucesso' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar contato', errorMessage: error.message });
  }
});

// deletar contato

contatoRouter.delete('/contatos/:id', async (req, res) => {
  try {
    const contato = await Contato.findByIdAndDelete(req.params.id);

    if (contato) {
      res.json({ message: 'Contato deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Contato não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar contato', errorMessage: error.message });
  }
});