import { model, Schema } from 'mongoose';

export const Contato = model('contato', new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  sobrenome: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  telefone: {
    type: String,
    unique: true,
    trim: true,
  },
  observacoes: {
    type: String,

  },
  favorito: {
    type: Boolean,
    default: false,
  }
}));