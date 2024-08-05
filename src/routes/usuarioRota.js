import { Router } from "express";
import { usuarioValidation } from "../utils/validations.js";
import { Usuario } from "../models/usuarioModelo.js";

export const usuarioRouter = Router();

// criação de usuário
usuarioRouter.post('/usuarios', async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ message: 'dados inválidos', error: error.details[0].message });
    return;
  }

  const { nome, email, senha } = req.body;
  try {
    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();
    res.json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', errorMessage: error.message });
  }
});