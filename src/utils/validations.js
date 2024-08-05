import Joi from "joi";

//validação para a inserção/atualização de um contato
export const contatoValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  sobrenome: Joi.string().max(150),
  email: Joi.string().email(), // bom manter o required no model para garantir a unicidade do email
  telefone: Joi.string().max(20).required(),
  observacoes: Joi.string().max(200),
  favorito: Joi.boolean().default(false),
});

//validação para a inserção de um usuário
export const usuarioValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});
